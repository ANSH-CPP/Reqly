import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true
})

export const refreshAccessToken = async ()=>{
    const response = await api.post("/users/refresh-token");
    return response.data;
}

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