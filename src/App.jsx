// import { useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import Header from "./Components/Header/Header";
// import MainInputBox from "./Components/MainInputBox/MainInputBox";
// import { ResponsePanel } from "./Components/Response";

// import Login from "./Components/Login/Login";
// import Signup from "./Components/Signup/Signup";

// // import { getCurrentUser } from "./Appwrite/AuthService";
// import { login } from "./Store/authSlice";
// import History from "./Components/History/History";
// import api, { refreshAccessToken } from "./api/axios";
// import WebhookAnalytics from "./Components/WebhookAnalytics/WebhookAnalytics";
// import IncomingWebhook from "./Components/IncomingWebhook/IncomingWebhook";

// function Home() {

//     return (
//         <div className="min-h-screen bg-gray-50">

//             <Header />

//             <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

//                 <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">

//                     <MainInputBox />

//                     <ResponsePanel />

//                 </div>

//             </main>

//         </div>
//     );
// }


// function App() {

//     const dispatch = useDispatch();


//     useEffect(() => {

//         const checkUser = async () => {

        
//             try {
//                 // const user = await getCurrentUser();
//                 const response = await api.get("/users/profile");
//                 const user = response.data.data;
//                 if (user) {
    
//                     console.log("Existing session:", user);
    
//                     dispatch(login(user));
    
//                 }
//             } catch (error) {

//                 if (error.response?.status === 401) {

//                     try {
//                         await refreshAccessToken();

//                         const response = await api.get("/users/profile");
//                         const user = response.data.data;

//                         console.log("Session restored:", user);

//                         dispatch(login(user));

//                     } catch (refreshError) {
//                         console.log("Session expired completely");
//                     }

//                 } else {
//                     console.log("Failed to check session:", error);
//                 }
//             }
//         };

//         checkUser();

//     }, [dispatch]);


//     return (

//         <Routes>

//             <Route path="/" element={<Home />} />

//             <Route path="/login" element={<Login />} />

//             <Route path="/signup" element={<Signup />} />

//             <Route
//                 path="/History"
//                 element={<History />}
//             />

//             <Route
//                 path="/webhook-analytics"
//                 element={<WebhookAnalytics />}
//             />

//             <Route
//                 path="/incoming-webhooks"
//                 element={<IncomingWebhook />}
//             />

//         </Routes>

//     );
// }


// export default App;

















// import { useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import Header from "./Components/Header/Header";
// import MainInputBox from "./Components/MainInputBox/MainInputBox";
// import { ResponsePanel } from "./Components/Response";

// import Login from "./Components/Login/Login";
// import Signup from "./Components/Signup/Signup";
// import LandingPage from "./Components/LandingPage/LandingPage";

// import { login } from "./Store/authSlice";
// import History from "./Components/History/History";
// import api, { refreshAccessToken } from "./api/axios";

// import WebhookAnalytics from "./Components/WebhookAnalytics/WebhookAnalytics";
// import IncomingWebhook from "./Components/IncomingWebhook/IncomingWebhook";

// // Your existing API testing workspace
// function ApiTester() {
//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Header />

//             <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
//                 <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
//                     <MainInputBox />
//                     <ResponsePanel />
//                 </div>
//             </main>
//         </div>
//     );
// }

// function App() {
//     const dispatch = useDispatch();

//     // Existing login/session restoration logic — preserved
//     useEffect(() => {
//         const checkUser = async () => {
//             try {
//                 const response = await api.get("/users/profile");
//                 const user = response.data.data;

//                 if (user) {
//                     dispatch(login(user));
//                 }
//             } catch (error) {
//                 if (error.response?.status === 401) {
//                     try {
//                         await refreshAccessToken();

//                         const response = await api.get("/users/profile");
//                         const user = response.data.data;

//                         dispatch(login(user));
//                     } catch (refreshError) {
//                         console.log("Session expired completely");
//                     }
//                 } else {
//                     console.log("Failed to check session:", error);
//                 }
//             }
//         };

//         checkUser();
//     }, [dispatch]);

//     return (
//         <Routes>
//             {/* New landing page */}
//             <Route path="/" element={<LandingPage />} />

//             {/* Existing API testing workspace */}
//             <Route path="/api-tester" element={<ApiTester />} />

//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />

//             <Route path="/History" element={<History />} />

//             <Route
//                 path="/webhook-analytics"
//                 element={<WebhookAnalytics />}
//             />

//             <Route
//                 path="/incoming-webhooks"
//                 element={<IncomingWebhook />}
//             />
//         </Routes>
//     );
// }

// export default App;



















// import { useEffect } from "react";
// import {
//     Routes,
//     Route,
//     Navigate,
//     useLocation
// } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import Header from "./Components/Header/Header";
// import MainInputBox from "./Components/MainInputBox/MainInputBox";
// import { ResponsePanel } from "./Components/Response";

// import Login from "./Components/Login/Login";
// import Signup from "./Components/Signup/Signup";
// import LandingPage from "./Components/LandingPage/LandingPage";

// import { login } from "./Store/authSlice";
// import History from "./Components/History/History";
// import api, { refreshAccessToken } from "./api/axios";

// import WebhookAnalytics from "./Components/WebhookAnalytics/WebhookAnalytics";
// import IncomingWebhook from "./Components/IncomingWebhook/IncomingWebhook";

// // Existing API testing workspace
// function ApiTester() {
//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Header />

//             <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
//                 <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
//                     <MainInputBox />
//                     <ResponsePanel />
//                 </div>
//             </main>
//         </div>
//     );
// }

// // Protect pages that require login
// function ProtectedRoute({ children }) {
//     const { status: authStatus } = useSelector(
//         (state) => state.auth
//     );

//     const location = useLocation();

//     if (!authStatus) {
//         return (
//             <Navigate
//                 to="/login"
//                 replace
//                 state={{ from: location }}
//             />
//         );
//     }

//     return children;
// }

// function App() {
//     const dispatch = useDispatch();

//     // Existing session restoration logic
//     useEffect(() => {
//         const checkUser = async () => {
//             try {
//                 const response = await api.get("/users/profile");
//                 const user = response.data.data;

//                 if (user) {
//                     dispatch(login(user));
//                 }
//             } catch (error) {
//                 if (error.response?.status === 401) {
//                     try {
//                         await refreshAccessToken();

//                         const response = await api.get("/users/profile");
//                         const user = response.data.data;

//                         dispatch(login(user));
//                     } catch (refreshError) {
//                         console.log("Session expired completely");
//                     }
//                 } else {
//                     console.log("Failed to check session:", error);
//                 }
//             }
//         };

//         checkUser();
//     }, [dispatch]);

//     return (
//         <Routes>
//             {/* Public pages */}
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />

//             {/* Protected pages */}
//             <Route
//                 path="/api-tester"
//                 element={
//                     <ProtectedRoute>
//                         <ApiTester />
//                     </ProtectedRoute>
//                 }
//             />

//             <Route
//                 path="/History"
//                 element={
//                     <ProtectedRoute>
//                         <History />
//                     </ProtectedRoute>
//                 }
//             />

//             <Route
//                 path="/incoming-webhooks"
//                 element={
//                     <ProtectedRoute>
//                         <IncomingWebhook />
//                     </ProtectedRoute>
//                 }
//             />

//             <Route
//                 path="/webhook-analytics"
//                 element={
//                     <ProtectedRoute>
//                         <WebhookAnalytics />
//                     </ProtectedRoute>
//                 }
//             />
//         </Routes>
//     );
// }

// export default App;





import { useEffect, useState } from "react";
import {
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Components/Header/Header";
import MainInputBox from "./Components/MainInputBox/MainInputBox";
import { ResponsePanel } from "./Components/Response";

import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import LandingPage from "./Components/LandingPage/LandingPage";

import { login } from "./Store/authSlice";
import History from "./Components/History/History";
import api, { refreshAccessToken } from "./api/axios";

import WebhookAnalytics from "./Components/WebhookAnalytics/WebhookAnalytics";
import IncomingWebhook from "./Components/IncomingWebhook/IncomingWebhook";

// Existing API testing workspace
function ApiTester() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
                    <MainInputBox />
                    <ResponsePanel />
                </div>
            </main>
        </div>
    );
}

// Protect pages that require login
function ProtectedRoute({ children, isCheckingAuth }) {
    const { status: authStatus } = useSelector(
        (state) => state.auth
    );

    const location = useLocation();

    // Wait until session verification finishes
    if (isCheckingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-600">
                    Checking your session...
                </p>
            </div>
        );
    }

    // Redirect logged-out users to login
    if (!authStatus) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
}

function App() {
    const dispatch = useDispatch();

    // Initially, authentication status is unknown
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // Restore existing login session
    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await api.get("/users/profile");
                const user = response.data.data;

                if (user) {
                    dispatch(login(user));
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    try {
                        await refreshAccessToken();

                        const response = await api.get("/users/profile");
                        const user = response.data.data;

                        dispatch(login(user));
                    } catch (refreshError) {
                        console.log("Session expired completely");
                    }
                } else {
                    console.log("Failed to check session:", error);
                }
            } finally {
                // Authentication check is complete
                setIsCheckingAuth(false);
            }
        };

        checkUser();
    }, [dispatch]);

    return (
        <Routes>
            {/* Public pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected pages */}
            <Route
                path="/api-tester"
                element={
                    <ProtectedRoute isCheckingAuth={isCheckingAuth}>
                        <ApiTester />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/History"
                element={
                    <ProtectedRoute isCheckingAuth={isCheckingAuth}>
                        <History />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/incoming-webhooks"
                element={
                    <ProtectedRoute isCheckingAuth={isCheckingAuth}>
                        <IncomingWebhook />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/webhook-analytics"
                element={
                    <ProtectedRoute isCheckingAuth={isCheckingAuth}>
                        <WebhookAnalytics />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
