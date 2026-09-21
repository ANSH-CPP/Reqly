import React from "react";
import { useSelector } from "react-redux";

function ResponseHeaders() {

    const headers = useSelector((state) => state.response.headers);

    return (
        <div>

            <div className="overflow-hidden rounded-lg border border-gray-200">

                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600">
                    <div>Header</div>
                    <div>Value</div>
                </div>

                {Object.entries(headers).length > 0 ? (
                    <div className="max-h-[420px] divide-y divide-gray-100 overflow-y-auto">
                        {Object.entries(headers).map(([key, value]) => (
                            <div
                                key={key}
                                className="grid grid-cols-2 gap-4 px-4 py-2.5 text-sm"
                            >
                                <div className="break-words font-medium text-gray-900">{key}</div>
                                <div className="break-all text-gray-600">{value}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-4 py-6 text-center text-sm text-gray-500">
                        No response headers
                    </div>
                )}

            </div>

        </div>
    );
}

export default ResponseHeaders;
