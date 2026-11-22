
import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const executeRequest = asyncHandler(async (req, res) => {
    let {
        url,
        method,
        headers = {},
        auth,
        location,
        bodyData
    } = req.body;

    // Validate required fields
    if (!url || !method) {
        throw new ApiError(400, "URL and method are required");
    }

    method = method.toUpperCase();

    const allowedMethods = [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];

    if (!allowedMethods.includes(method)) {
        throw new ApiError(400, "Unsupported HTTP method");
    }

    // Validate URL
    let parsedUrl;

    try {
        parsedUrl = new URL(url);
    } catch {
        throw new ApiError(400, "Please enter a valid URL");
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new ApiError(400, "Only HTTP and HTTPS URLs are allowed");
    }

    // Basic protection against requests to local services
    const hostname = parsedUrl.hostname.toLowerCase();

    if (
        hostname === "localhost" ||
        hostname.endsWith(".localhost") ||
        hostname === "::1" ||
        hostname === "0.0.0.0" ||
        /^127\./.test(hostname) ||
        /^10\./.test(hostname) ||
        /^192\.168\./.test(hostname) ||
        /^172\.(1[6-9]|2\d|3[01])\./.test(hostname) ||
        hostname === "169.254.169.254"
    ) {
        throw new ApiError(
            400,
            "Requests to local or private addresses are not allowed"
        );
    }

    // Copy headers so we don't mutate the original request data
    const requestHeaders = { ...headers };

    // API Key authentication
    if (auth?.type === "apiKey") {
        if (!auth.parameter || !auth.value) {
            throw new ApiError(400, "API key details are incomplete");
        }

        if (location === "Query Parameter") {
            parsedUrl.searchParams.set(
                auth.parameter,
                auth.value
            );
        } else {
            requestHeaders[auth.parameter] = auth.value;
        }
    }

    try {
        // OAuth2 client credentials flow
        if (auth?.type === "oauth2") {
            const tokenResponse = await axios.post(
                auth.tokenURL,
                {
                    grantType: "client_credentials",
                    clientId: auth.clientID,
                    clientSecret: auth.clientSecret
                },
                {
                    timeout: 15000
                }
            );

            const accessToken = tokenResponse.data?.access_token;

            if (!accessToken) {
                throw new ApiError(
                    502,
                    "OAuth2 access token was not received"
                );
            }

            requestHeaders.Authorization = `Bearer ${accessToken}`;
        }

        // Set JSON content type when sending a body
        const hasBody = ["POST", "PUT", "PATCH"].includes(method)
            && bodyData !== undefined
            && bodyData !== null
            && bodyData !== "";

        if (hasBody && !requestHeaders["Content-Type"]) {
            requestHeaders["Content-Type"] = "application/json";
        }

        let requestBody = bodyData;

        if (
            hasBody &&
            typeof bodyData === "string" &&
            requestHeaders["Content-Type"]?.includes("application/json")
        ) {
            try {
                requestBody = JSON.parse(bodyData);
            } catch {
                throw new ApiError(
                    400,
                    "Request body must contain valid JSON"
                );
            }
        }

        const startTime = Date.now();

        const response = await axios({
            url: parsedUrl.toString(),
            method,
            headers: requestHeaders,
            data: hasBody ? requestBody : undefined,
            timeout: 15000,
            maxRedirects: 0,
            validateStatus: () => true
        });

        const responseTime = Date.now() - startTime;

        return res.status(200).json({
            success: true,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            contentType: response.headers["content-type"] || "",
            responseTime,
            data: response.data
        });
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        // A remote API returning 4xx/5xx is still a response.
        // Connection errors and timeouts are handled here.
        console.error("External request failed:", error.message);

        return res.status(502).json({
            success: false,
            error: error.code === "ECONNABORTED"
                ? "The API request timed out"
                : error.message || "Could not connect to the target API"
        });
    }
});

export { executeRequest };
