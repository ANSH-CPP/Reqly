import React from "react";
import { useSelector } from "react-redux";
import ErrorAnalyzer from "./ErrorAnalyzer";

function ResponseOverview() {
    const response = useSelector(
        (state) => state.response
    );

    // Colour the status so success / client error / server error are easy to tell apart
    let statusColor = "text-gray-900";

    if (response.status >= 500) {
        statusColor = "text-red-600";
    }
    else if (response.status >= 400) {
        statusColor = "text-amber-600";
    }
    else if (response.status >= 200) {
        statusColor = "text-emerald-600";
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={"mt-1 text-base font-semibold " + statusColor}>
                        {response.status
                            ? `${response.status} ${response.statusText}`
                            : "-"
                        }
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Response Time</p>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                        {response.responseTime
                            ? `${response.responseTime} ms`
                            : "-"
                        }
                    </p>
                </div>

                <div className="min-w-0">
                    <p className="text-sm text-gray-500">Content Type</p>
                    <p className="mt-1 break-words text-base font-semibold text-gray-900">
                        {response.contentType || "-"}
                    </p>
                </div>

            </div>

            <ErrorAnalyzer/>
        </div>
    );
}

export default ResponseOverview;
