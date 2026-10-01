import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../../Appwrite/AuthService";

import {
    getHistory,
    deleteHistory,
    clearHistory as clearHistoryService
} from "../../Appwrite/HistoryService";

import {
    setHistory,
    removeHistory,
    clearHistory,
    setSelectedRequest
} from "../../Store/historySlice";


function History() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const history = useSelector(
        (state) => state.history.history
    );

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedHistory, setSelectedHistory] = useState(null);


    // FETCH HISTORY
    useEffect(() => {

        const fetchHistory = async () => {

            try {

                setLoading(true);
                setError("");

                const user = await getCurrentUser();

                if (!user) {
                    setError("User is not logged in");
                    return;
                }

                const data = await getHistory(user.$id);

                console.log(
                    "User History:",
                    data
                );

                dispatch(
                    setHistory(data)
                );

            } catch (error) {

                console.error(
                    "History Error:",
                    error
                );

                setError(
                    "Failed to load history"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchHistory();

    }, [dispatch]);


    // DELETE ONE HISTORY
    const handleDelete = async (rowId) => {

        try {

            await deleteHistory(rowId);

            dispatch(
                removeHistory(rowId)
            );

            if (
                selectedHistory?.$id === rowId
            ) {
                setSelectedHistory(null);
            }

        } catch (error) {

            console.error(
                "Delete History Error:",
                error
            );

        }
    };


    // CLEAR ALL HISTORY
    const handleClearHistory = async () => {

        try {

            const user = await getCurrentUser();

            if (!user) {

                setError(
                    "User is not logged in"
                );

                return;
            }

            await clearHistoryService(
                user.$id
            );

            dispatch(
                clearHistory()
            );

            setSelectedHistory(null);

        } catch (error) {

            console.error(
                "Clear History Error:",
                error
            );

        }
    };


    // RUN AGAIN
    const handleRunAgain = (item) => {

        console.log(
            "Running saved request:",
            item
        );

        // STORE REQUEST IN REDUX
        dispatch(
            setSelectedRequest(item)
        );

        // NAVIGATE WITHOUT RELOADING APP
        navigate("/");
    };


    // LOADING
    if (loading) {

        return (

            <div className="min-h-screen bg-gray-50">

                <div className="mx-auto max-w-7xl px-4 py-8">

                    <h1 className="text-2xl font-bold text-gray-900">
                        Request History
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Loading history...
                    </p>

                </div>

            </div>

        );
    }


    // ERROR
    if (error) {

        return (

            <div className="min-h-screen bg-gray-50">

                <div className="mx-auto max-w-7xl px-4 py-8">

                    <h1 className="text-2xl font-bold text-gray-900">
                        Request History
                    </h1>

                    <p className="mt-4 text-red-600">
                        {error}
                    </p>

                </div>

            </div>

        );
    }


    return (

        <div className="min-h-screen bg-gray-50">

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">


                {/* HEADER */}

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Request History
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Your previous API requests
                        </p>

                    </div>


                    {history.length > 0 && (

                        <button
                            onClick={handleClearHistory}
                            className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                            Clear All
                        </button>

                    )}

                </div>


                {/* EMPTY HISTORY */}

                {history.length === 0 ? (

                    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">

                        <h2 className="text-lg font-semibold text-gray-800">
                            No history found
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Your API requests will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {history.map((item) => (

                            <div
                                key={item.$id}
                                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                            >

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">


                                    {/* METHOD + URL */}

                                    <div className="flex min-w-0 items-center gap-3">

                                        <span className="shrink-0 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                                            {item.method}
                                        </span>

                                        <span className="break-all text-sm font-medium text-gray-800">
                                            {item.url}
                                        </span>

                                    </div>


                                    {/* ACTIONS */}

                                    <div className="flex shrink-0 flex-wrap items-center gap-2">

                                        <span
                                            className={
                                                item.status >= 200 &&
                                                item.status < 300
                                                    ? "text-sm font-semibold text-green-600"
                                                    : "text-sm font-semibold text-red-600"
                                            }
                                        >
                                            {item.status}{" "}
                                            {item.statusText}
                                        </span>


                                        <button
                                            onClick={() =>
                                                setSelectedHistory(item)
                                            }
                                            className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-600"
                                        >
                                            View Details
                                        </button>


                                        <button
                                            onClick={() =>
                                                handleDelete(item.$id)
                                            }
                                            className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>


                                {/* HISTORY INFO */}

                                <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">

                                    <div>

                                        <p className="text-gray-500">
                                            Response Time
                                        </p>

                                        <p className="font-medium text-gray-800">
                                            {item.responseTime} ms
                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-gray-500">
                                            Method
                                        </p>

                                        <p className="font-medium text-gray-800">
                                            {item.method}
                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-gray-500">
                                            Created
                                        </p>

                                        <p className="font-medium text-gray-800">

                                            {new Date(
                                                item.createdAt
                                            ).toLocaleString()}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>


            {/* DETAILS MODAL */}

            {selectedHistory && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">


                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between">

                            <h2 className="text-xl font-bold text-gray-900">
                                Request Details
                            </h2>

                            <button
                                onClick={() =>
                                    setSelectedHistory(null)
                                }
                                className="text-2xl text-gray-500 hover:text-gray-800"
                            >
                                ×
                            </button>

                        </div>


                        {/* REQUEST */}

                        <div className="mt-6">

                            <p className="text-sm font-medium text-gray-500">
                                Request
                            </p>

                            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">

                                <span className="w-fit rounded-md bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                                    {selectedHistory.method}
                                </span>

                                <p className="break-all text-sm font-medium text-gray-800">
                                    {selectedHistory.url}
                                </p>

                            </div>

                        </div>


                        {/* STATUS + RESPONSE TIME */}

                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">


                            <div className="rounded-lg bg-gray-50 p-4">

                                <p className="text-sm text-gray-500">
                                    Status
                                </p>

                                <p
                                    className={
                                        selectedHistory.status >= 200 &&
                                        selectedHistory.status < 300
                                            ? "mt-1 font-semibold text-green-600"
                                            : "mt-1 font-semibold text-red-600"
                                    }
                                >

                                    {selectedHistory.status}{" "}
                                    {selectedHistory.statusText}

                                </p>

                            </div>


                            <div className="rounded-lg bg-gray-50 p-4">

                                <p className="text-sm text-gray-500">
                                    Response Time
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {selectedHistory.responseTime} ms
                                </p>

                            </div>

                        </div>


                        {/* HEADERS */}

                        <div className="mt-6">

                            <h3 className="font-semibold text-gray-900">
                                Headers
                            </h3>

                            <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">

                                {selectedHistory.headers
                                    ? JSON.stringify(
                                          JSON.parse(
                                              selectedHistory.headers
                                          ),
                                          null,
                                          2
                                      )
                                    : "No headers"}

                            </pre>

                        </div>


                        {/* AUTHENTICATION */}

                        <div className="mt-6">

                            <h3 className="font-semibold text-gray-900">
                                Authentication
                            </h3>

                            <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">

                                {selectedHistory.auth
                                    ? JSON.stringify(
                                          JSON.parse(
                                              selectedHistory.auth
                                          ),
                                          null,
                                          2
                                      )
                                    : "No authentication"}

                            </pre>

                        </div>


                        {/* BODY */}

                        <div className="mt-6">

                            <h3 className="font-semibold text-gray-900">
                                Request Body
                            </h3>

                            <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">

                                {selectedHistory.body
                                    ? selectedHistory.body
                                    : "No request body"}

                            </pre>

                        </div>


                        {/* CREATED */}

                        <div className="mt-6">

                            <p className="text-sm text-gray-500">
                                Created
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-800">

                                {new Date(
                                    selectedHistory.createdAt
                                ).toLocaleString()}

                            </p>

                        </div>


                        {/* BUTTONS */}

                        <div className="mt-6 flex justify-end gap-3">


                            <button
                                onClick={() =>
                                    handleRunAgain(
                                        selectedHistory
                                    )
                                }
                                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                            >
                                Run Again
                            </button>


                            <button
                                onClick={() =>
                                    setSelectedHistory(null)
                                }
                                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-900"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}

export default History;