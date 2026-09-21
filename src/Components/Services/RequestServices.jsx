export const buildHeaders = (data) => {
    let header = {};

    // Manual headers
    data.requestHeaders?.forEach((item) => {
        if (item.name && item.value) {
            header[item.name] = item.value;
        }
    });

    // Authentication headers
    if (data.auth?.type === "apiKey") {
        if (data.auth.location === "Header") {
            header[data.auth.key] = data.auth.value;
        }
    }

    else if (data.auth?.type === "basic") {
        const credentials =
            `${data.auth.username}:${data.auth.password}`;

        const encodedCredentials = btoa(credentials);

        header.Authorization = `Basic ${encodedCredentials}`;
    }

    else if (data.auth?.type === "bearer") {
        header.Authorization =
            `Bearer ${data.auth.token}`;
    }

    else if (data.auth?.type === "oauth2") {
        // OAuth2 is handled by Appwrite Function
    }

    return header;
};