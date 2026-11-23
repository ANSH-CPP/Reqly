// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:5000/api/v1",
//     withCredentials: true
// })

// export const refreshAccessToken = async ()=>{
//     const response = await api.post("/users/refresh-token");
//     return response.data;
// }

// export default api;











import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true
});

// Prevent multiple refresh requests at the same time
let refreshPromise = null;

// Refresh access token
export const refreshAccessToken = () => {
    if (!refreshPromise) {
        refreshPromise = api
            .post("/users/refresh-token")
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
};

// Automatically handle expired access tokens
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const url = originalRequest?.url || "";

        // Do not refresh for these requests
        if (
            status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            url.includes("/users/refresh-token") ||
            url.includes("/users/login") ||
            url.includes("/users/register") ||
            url.includes("/users/profile")
        ) {
            return Promise.reject(error);
        }
        // Prevent infinite retry loops
        originalRequest._retry = true;

        try {
            // Refresh token (shared promise prevents duplicate refreshes)
            await refreshAccessToken();

            // Retry original request using the new cookies
            return api(originalRequest);

        } catch (refreshError) {
            // Refresh token is invalid or expired
            if (window.location.pathname !== "/login") {
                window.location.href = "/";
            }

            return Promise.reject(refreshError);
        }
    }
);

export default api;
















// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
//   withCredentials: true,
// });

// let refreshPromise = null;

// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;
//     const status = error.response?.status;
//     const url = originalRequest?.url || "";

//     if (
//       status !== 401 ||
//       !originalRequest ||
//       originalRequest._retry ||
//       url.includes("/users/refresh-token") ||
//       url.includes("/users/login") ||
//       url.includes("/users/register")
//     ) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     try {
//       if (!refreshPromise) {
//         refreshPromise = api
//           .post("/users/refresh-token")
//           .finally(() => {
//             refreshPromise = null;
//           });
//       }

//       await refreshPromise;

//       // Retry the original request with the refreshed cookie.
//       return api(originalRequest);
//     } catch (refreshError) {
//       // Refresh token is invalid or expired.
//       window.location.href = "/login";
//       return Promise.reject(refreshError);
//     }
//   }
// );

// export const refreshAccessToken = () =>
//   api.post("/users/refresh-token");

// export default api;