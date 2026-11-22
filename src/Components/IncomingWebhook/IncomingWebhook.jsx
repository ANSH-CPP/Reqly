
import { useEffect, useState } from "react";
import webhookService from "../Services/WebhookService";

function IncomingWebhook() {

    const [webhook, setWebhook] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);

    const fetchEvents = async () => {
        try {
            const data = await webhookService.getEvents();
            setEvents(data.events || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch webhook events"
            );
        }
    };

    useEffect(() => {
        const loadPage = async () => {
            try {
                setLoading(true);
                await fetchEvents();
            } finally {
                setLoading(false);
            }
        };

        loadPage();
    }, []);

    const handleGenerateWebhook = async () => {
        try {
            setGenerating(true);
            setError("");
            setMessage("");

            const data = await webhookService.generateWebhook();

            setWebhook(data);
            setMessage("Webhook generated successfully!");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to generate webhook"
            );
        } finally {
            setGenerating(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(webhook.webhookUrl);
            setMessage("Webhook URL copied successfully!");
        } catch {
            setError("Unable to copy webhook URL");
        }
    };

    const getStatusStyle = (status) => {
        const styles = {
            completed: "bg-green-100 text-green-700",
            failed: "bg-red-100 text-red-700",
            pending: "bg-yellow-100 text-yellow-700",
            processing: "bg-blue-100 text-blue-700",
            retrying: "bg-orange-100 text-orange-700",
            "dead-lettered": "bg-purple-100 text-purple-700"
        };

        return styles[status] || "bg-gray-100 text-gray-700";
    };

    const fetchMyWebhook = async () => {
        try {
            const data = await webhookService.getMyWebhook();
            setWebhook(data);
        } catch (error) {
            console.error("Failed to load webhook:", error);
            setError("Unable to load your webhook URL");
        }
    };

    useEffect(() => {
        const loadWebhookData = async () => {
            setLoading(true);

            try {
                await Promise.all([
                    fetchMyWebhook(),
                    fetchEvents()
                ]);
            } finally {
                setLoading(false);
            }
        };
        loadWebhookData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading incoming webhooks...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page Heading */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Incoming Webhooks
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Generate webhook endpoints and monitor incoming events.
                    </p>
                </div>

                {/* Messages */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-100 text-green-700 p-3 rounded-lg">
                        {message}
                    </div>
                )}

                {/* Generate Webhook */}
                <div className="bg-white rounded-xl shadow-sm border p-6">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Webhook Endpoint
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Generate a unique URL to receive external events.
                            </p>
                        </div>

                        <button
                            onClick={handleGenerateWebhook}
                            disabled={generating}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium"
                        >
                            {generating ? "Generating..." : "Generate Webhook"}
                        </button>

                    </div>

                    {webhook && (
                        <div className="mt-6 border-t pt-5">

                            <div className="flex items-center gap-2 mb-3">
                                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

                                <span className="text-sm font-medium text-green-700">
                                    Webhook Active
                                </span>
                            </div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Webhook URL
                            </label>

                            <div className="flex flex-col sm:flex-row gap-2">

                                <input
                                    type="text"
                                    readOnly
                                    value={webhook.webhookUrl}
                                    className="flex-1 min-w-0 border rounded-lg px-3 py-2.5 bg-gray-50 text-sm"
                                />

                                <button
                                    onClick={handleCopy}
                                    className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2.5 rounded-lg"
                                >
                                    Copy URL
                                </button>

                            </div>

                            <p className="text-xs text-gray-500 mt-3">
                                Keep this URL private. Anyone with this URL can send events to your endpoint.
                            </p>

                        </div>
                    )}

                    {!webhook && (
                        <p className="text-sm text-gray-500 mt-5">
                            No webhook URL generated in this session. Click Generate Webhook to create one.
                        </p>
                    )}

                </div>

                {/* Events Section */}
                <div className="bg-white rounded-xl shadow-sm border">

                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b">

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Recent Webhook Events
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Showing the latest {events.length} events.
                            </p>
                        </div>

                        <button
                            onClick={fetchEvents}
                            className="border px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                        >
                            Refresh Events
                        </button>

                    </div>

                    {events.length === 0 ? (

                        <div className="p-10 text-center text-gray-500">
                            No webhook events received yet.
                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm text-left">

                                <thead className="bg-gray-50 text-gray-600">
                                    <tr>
                                        <th className="px-6 py-4">Event Type</th>
                                        <th className="px-6 py-4">Event ID</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Attempts</th>
                                        <th className="px-6 py-4">Received At</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">

                                    {events.map((event) => (

                                        <tr key={event._id} className="hover:bg-gray-50">

                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {event.eventType}
                                            </td>

                                            <td className="px-6 py-4 text-gray-500">
                                                {event.providerEventId || event._id}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(event.processingStatus)}`}>
                                                    {event.processingStatus}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                {event.attemptCount ?? 0}
                                            </td>

                                            <td className="px-6 py-4 text-gray-500">
                                                {event.receivedAt
                                                    ? new Date(event.receivedAt).toLocaleString()
                                                    : "N/A"}
                                            </td>

                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedEvent(event)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View Details
                                                </button>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

                {/* Event Details */}
                {selectedEvent && (

                    <div className="bg-white rounded-xl shadow-sm border p-6">

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-xl font-semibold">
                                Event Details
                            </h2>

                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="text-gray-500 hover:text-red-600"
                            >
                                Close
                            </button>

                        </div>

                        <div className="space-y-3 text-sm">

                            <p>
                                <strong>Event Type:</strong>{" "}
                                {selectedEvent.eventType}
                            </p>

                            <p>
                                <strong>Processing Status:</strong>{" "}
                                {selectedEvent.processingStatus}
                            </p>

                            <p>
                                <strong>Event ID:</strong>{" "}
                                {selectedEvent.providerEventId || selectedEvent._id}
                            </p>

                            <p>
                                <strong>Last Error:</strong>{" "}
                                {selectedEvent.lastError || "None"}
                            </p>

                            <div>
                                <strong>Payload:</strong>

                                <pre className="mt-2 bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto text-xs">
                                    {JSON.stringify(selectedEvent.body, null, 2)}
                                </pre>
                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default IncomingWebhook;
