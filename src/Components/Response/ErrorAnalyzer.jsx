import React from "react";
import { useSelector } from "react-redux";

function ErrorAnalyzer() {

    const { status, statusText, data } = useSelector(
        (state) => state.response
    );

    if (!status || status < 400) {
        return null;
    }

    let message = "";
    let causes = [];
    let suggestion = "";

    // Convert API error response into searchable text
    let errorText = "";

    if (typeof data === "string") {
        errorText = data.toLowerCase();
    }
    else if (data) {
        errorText = JSON.stringify(data).toLowerCase();
    }

    // 401 - Authentication
    if (status === 401) {

        message = "The API could not authenticate your request.";

        causes = [
            "API key may be missing or invalid",
            "Bearer token may be expired or incorrect",
            "Authentication credentials may be incorrect"
        ];

        if (
            errorText.includes("api key") ||
            errorText.includes("apikey") ||
            errorText.includes("invalid key")
        ) {
            message = "The API key appears to be invalid or missing.";

            suggestion =
                "Check your API key and make sure it is being sent in the correct location.";
        }
        else if (
            errorText.includes("token") ||
            errorText.includes("bearer")
        ) {
            message = "The authentication token appears to be invalid.";

            suggestion =
                "Check whether the Bearer token is correct and has not expired.";
        }
        else {
            suggestion =
                "Check your API authentication settings.";
        }
    }

    // 400 - Bad Request
    else if (status === 400) {

        message = "The API rejected your request because the request data is invalid.";

        causes = [
            "Required parameter may be missing",
            "Request body may contain invalid data",
            "Parameter value may be incorrect"
        ];

        if (
            errorText.includes("parameter") ||
            errorText.includes("missing")
        ) {
            message = "A required parameter appears to be missing or invalid.";

            suggestion =
                "Check the required parameters in the API documentation.";
        }
        else if (
            errorText.includes("json") ||
            errorText.includes("body")
        ) {
            message = "The request body may contain invalid data.";

            suggestion =
                "Check that your JSON body is valid and matches the API format.";
        }
        else {
            suggestion =
                "Check your URL, parameters, headers and request body.";
        }
    }

    // 403 - Forbidden
    else if (status === 403) {

        message =
            "The server understood your request but refused access.";

        causes = [
            "Your account may not have permission",
            "API credentials may have insufficient permissions",
            "The requested resource may be restricted"
        ];

        suggestion =
            "Check your API credentials and required permissions.";
    }

    // 404 - Not Found
    else if (status === 404) {

        message =
            "The requested API endpoint could not be found.";

        causes = [
            "URL may be incorrect",
            "Endpoint may not exist",
            "API version may be incorrect"
        ];

        if (
            errorText.includes("route") ||
            errorText.includes("endpoint") ||
            errorText.includes("not found")
        ) {
            message =
                "The API could not find the requested endpoint.";
        }

        suggestion =
            "Check the URL, endpoint path and API version.";
    }

    // 405 - Method Not Allowed
    else if (status === 405) {

        message =
            "The HTTP method is not supported by this endpoint.";

        causes = [
            "GET may have been used instead of POST",
            "POST may have been used instead of GET",
            "The endpoint may support different methods"
        ];

        suggestion =
            "Check which HTTP methods the endpoint supports.";
    }

    // 408 - Request Timeout
    else if (status === 408) {

        message =
            "The server took too long to receive the request.";

        causes = [
            "Network connection may be slow",
            "Server may be overloaded",
            "Request may have timed out"
        ];

        suggestion =
            "Try sending the request again.";
    }

    // 409 - Conflict
    else if (status === 409) {

        message =
            "The request conflicts with the current state of the resource.";

        causes = [
            "Resource may already exist",
            "Data may conflict with existing data",
            "Another request may have modified the resource"
        ];

        suggestion =
            "Check the existing resource and request data.";
    }

    // 422 - Validation Error
    else if (status === 422) {

        message =
            "The server understood the request but could not validate the data.";

        causes = [
            "Required field may be missing",
            "Field value may have an invalid format",
            "Request data may fail validation"
        ];

        suggestion =
            "Check the API validation requirements and request body.";
    }

    // 429 - Rate Limit
    else if (status === 429) {

        message =
            "Too many requests have been sent to the API.";

        causes = [
            "API rate limit has been exceeded",
            "Too many requests were sent in a short period"
        ];

        suggestion =
            "Wait before sending another request and check the API rate limits.";
    }

    // 500 - Server Error
    else if (status >= 500 && status < 600) {

        message =
            "The API server encountered an internal error.";

        causes = [
            "Something went wrong on the server",
            "The API service may be temporarily unavailable",
            "The server may have an unexpected error"
        ];

        suggestion =
            "Try again later. If the problem continues, check the API status or documentation.";
    }

    // Other errors
    else {

        message =
            "The API returned an error response.";

        causes = [
            "The server rejected the request",
            "The request may not match the API requirements"
        ];

        suggestion =
            "Check the API documentation and your request configuration.";
    }

    return (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5">

            <h2 className="text-sm font-semibold text-red-900">
                API Error Analyzer
            </h2>

            <p className="mt-2 text-sm font-medium text-red-800">
                {status} {statusText}
            </p>

            <div className="mt-4">

                <p className="text-sm font-semibold text-gray-900">
                    What happened?
                </p>

                <p className="mt-1 text-sm text-gray-700">
                    {message}
                </p>

            </div>

            <div className="mt-4">

                <p className="text-sm font-semibold text-gray-900">
                    Possible causes
                </p>

                <ul className="mt-1 ml-5 list-disc space-y-0.5 text-sm text-gray-700">

                    {causes.map((cause, index) => (
                        <li key={index}>
                            {cause}
                        </li>
                    ))}

                </ul>

            </div>

            <div className="mt-4">

                <p className="text-sm font-semibold text-gray-900">
                    Suggestion
                </p>

                <p className="mt-1 text-sm text-gray-700">
                    {suggestion}
                </p>

            </div>

        </div>
    );
}

export default ErrorAnalyzer;
