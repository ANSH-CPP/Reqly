
import { useEffect, useState } from "react";
import webhookService from "../Services/WebhookService";

function WebhookAnalytics() {

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await webhookService.getAnalytics();

                setAnalytics(data);

            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load webhook analytics"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-500">
                    Loading webhook analytics...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const cards = [
        {
            title: "Total Events",
            value: analytics.totalEvents,
            color: "text-blue-600"
        },
        {
            title: "Successful Events",
            value: analytics.successfulEvents,
            color: "text-green-600"
        },
        {
            title: "Failed Events",
            value: analytics.failedEvents,
            color: "text-red-600"
        },
        {
            title: "Pending Events",
            value: analytics.pendingEvents,
            color: "text-yellow-600"
        },
        {
            title: "Retrying Events",
            value: analytics.retryingEvents,
            color: "text-orange-600"
        },
        {
            title: "Dead Letter Events",
            value: analytics.deadLetteredEvents,
            color: "text-purple-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Webhook Analytics
                </h1>

                <p className="text-gray-500 mb-8">
                    Monitor your webhook processing performance.
                </p>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className="bg-white rounded-xl shadow-sm p-6"
                        >
                            <p className="text-gray-500 text-sm">
                                {card.title}
                            </p>

                            <h2 className={`text-3xl font-bold mt-3 ${card.color}`}>
                                {card.value}
                            </h2>
                        </div>
                    ))}

                </div>

                {/* Performance Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <p className="text-gray-500 text-sm">
                            Success Rate
                        </p>

                        <h2 className="text-3xl font-bold text-green-600 mt-3">
                            {analytics.successRate.toFixed(2)}%
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <p className="text-gray-500 text-sm">
                            Total Attempts
                        </p>

                        <h2 className="text-3xl font-bold text-blue-600 mt-3">
                            {analytics.totalAttempts}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <p className="text-gray-500 text-sm">
                            Average Processing Time
                        </p>

                        <h2 className="text-3xl font-bold text-purple-600 mt-3">
                            {analytics.averageProcessingTime === null
                                ? "N/A"
                                : `${analytics.averageProcessingTime.toFixed(2)} ms`}
                        </h2>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default WebhookAnalytics;
