import React from "react";
import { useSelector } from "react-redux";

function ResponseTiming() {

    const responseTime = useSelector(
        (state) => state.response.responseTime
    );

    let performance = "No response";

    if (responseTime > 0 && responseTime < 300) {
        performance = "Fast";
    }
    else if (responseTime >= 300 && responseTime <= 1000) {
        performance = "Good";
    }
    else if (responseTime > 1000) {
        performance = "Slow";
    }

    return (
        <div>

            <div className="rounded-lg border border-gray-200 p-5">

                <p className="text-sm text-gray-500">
                    Total response time
                </p>

                <h2 className="mt-1 text-3xl font-semibold text-gray-900">
                    {responseTime > 0
                        ? `${responseTime} ms`
                        : "-"
                    }
                </h2>

                {responseTime > 0 && (
                    <div className="mt-6">

                        <div className="mb-2 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Performance
                            </p>

                            <p className="text-sm font-medium text-gray-900">
                                {performance}
                            </p>
                        </div>

                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                            <div
                                className="h-2 rounded-full bg-blue-600"
                                style={{
                                    width: `${Math.min(
                                        (responseTime / 2000) * 100,
                                        100
                                    )}%`
                                }}
                            />
                        </div>

                        <div className="mt-2 flex justify-between text-xs text-gray-500">
                            <span>0 ms</span>
                            <span>2000+ ms</span>
                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}

export default ResponseTiming;
