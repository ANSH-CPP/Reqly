export default async ({ req, res, log, error }) => {
    log("API Checker Function started");
    log(`BODY: ${JSON.stringify(req.body)}`);



    const body = JSON.parse(req.body);

    let url = body.url;
    const method = body.method;
    const headers = body.headers || {};
    const auth = body.auth;
    const location = body.location;
    const body_data = body.bodyData;



    log(`RECEIVED HEADERS: ${JSON.stringify(headers)}`);
    log(`URL: ${url}`);
    log(`METHOD: ${method}`);
    log("Location: " + location);
    log(`REQUEST BODY: ${body_data || "No body"}`);







    //API Key
    if(auth?.type === 'apiKey'){
        if(location === "Query Parameter"){
            const urlObject = new URL(url);
            urlObject.searchParams.set(
                auth.parameter,
                auth.value
            );
            url = urlObject.toString();
        }
    }












    try {

        // OAuth2
        if (auth?.type === "oauth2") {

        log("OAuth authentication selected");
        log(`OAuth Auth Data: ${JSON.stringify(auth)}`);

        log("Starting OAuth token request");

        const tokenResponse = await fetch(auth.tokenURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                grantType: "client_credentials",
                clientId: auth.clientID,
                clientSecret: auth.clientSecret
            })
        });

        log(`Token response status: ${tokenResponse.status}`);

        const tokenData = await tokenResponse.json();

        log(`Token response data: ${JSON.stringify(tokenData)}`);

            if (!tokenResponse.ok) {
                return res.json({
                    success: false,
                    error: "OAuth2 token request failed",
                    statusCode: tokenResponse.status,
                    data: tokenData
                });
            }

            const accessToken = tokenData.access_token;

            if (!accessToken) {
                return res.json({
                    success: false,
                    error: "Access token not received"
                });
            }

            Object.assign(headers, {
                Authorization: `Bearer ${accessToken}`
            });

            log("OAuth2 access token received");
        }
























        //body_data manage
        if(["POST","PUT","PATCH"].includes(method) && body_data){
            headers["Content-Type"] = "application/json";
            log("Request body will be sent");
        }
        log(`SENDING HEADERS: ${JSON.stringify(headers)}`);
        log(`Calling API: ${url}`);

















        // Actual API request
        const startTime = Date.now();

        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: ["POST","PUT","PATCH"].includes(method)
                ? body_data
                : undefined
        });

        const endTime = Date.now();

        const responseTime = endTime - startTime;


        // Response Headers
        const responseHeaders = {};

        for (const [key, value] of response.headers.entries()) {
            responseHeaders[key] = value;
        }


        // Response Body
        const contentType = response.headers.get("content-type");

        let data;

        if (contentType?.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }


        // Send response back to React
        return res.json({
            success: true,
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
            contentType: contentType,
            responseTime: responseTime,
            data: data
        });

    } catch (err) {

        error(err.message);

        return res.json({
            success: false,
            error: err.message
        }, 500);
    }
};
