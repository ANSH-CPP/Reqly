// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { login as loginUser, getCurrentUser } from "../../Appwrite/AuthService";
// import { useDispatch } from "react-redux";
// import { login } from "../../Store/authSlice";
// import api from "../../api/axios";

// function Login() {

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);


//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");
//         setLoading(true);

//         try {







//             // Login in Appwrite
//             // await loginUser(email, password);
//             await api.post("/users/login",{
//                 email,
//                 password
//             })

//             // Get logged-in user
//             // const user = await getCurrentUser();
//             const response = await api.get("/users/profile")

//             const user = response.data.data;










//             console.log("Logged in user:", user);

//             // Store user in Redux
//             dispatch(login(user));

//             // Go to home
//             navigate("/");

//         } catch (error) {

//             console.error(error);

//             // setError(error.message || "Login failed");
//             setError(
//                 error.response?.data?.message || "Login failed"
//             );

//         } finally {

//             setLoading(false);

//         }
//     };


//     return (

//         <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

//             <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">

//                 <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
//                     Login
//                 </h1>


//                 {error && (
//                     <p className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">
//                         {error}
//                     </p>
//                 )}


//                 <form
//                     onSubmit={handleSubmit}
//                     className="space-y-4"
//                 >

//                     {/* Email */}

//                     <div>

//                         <label className="mb-1 block text-sm font-medium text-gray-700">
//                             Email
//                         </label>

//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter your email"
//                             required
//                             className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
//                         />

//                     </div>


//                     {/* Password */}

//                     <div>

//                         <label className="mb-1 block text-sm font-medium text-gray-700">
//                             Password
//                         </label>

//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Enter your password"
//                             required
//                             className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
//                         />

//                     </div>


//                     {/* Login Button */}

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
//                     >
//                         {loading ? "Logging in..." : "Login"}
//                     </button>

//                 </form>


//                 {/* Signup */}

//                 <p className="mt-5 text-center text-sm text-gray-600">

//                     Don't have an account?{" "}

//                     <button
//                         onClick={() => navigate("/signup")}
//                         className="font-semibold text-blue-600 hover:underline"
//                     >
//                         Sign Up
//                     </button>

//                 </p>

//             </div>

//         </div>

//     );
// }

// export default Login;









import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../Store/authSlice";
import api from "../../api/axios";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Remember the page the user originally wanted to visit
    const redirectTo = location.state?.from || "/api-tester";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            // Login user
            await api.post("/users/login", {
                email,
                password
            });

            // Get logged-in user
            const response = await api.get("/users/profile");
            const user = response.data.data;

            console.log("Logged in user:", user);

            // Store user in Redux
            dispatch(login(user));

            // Redirect to the originally requested page
            navigate(redirectTo, { replace: true });

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message || "Login failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">

                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    Login
                </h1>

                {error && (
                    <p className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* Signup */}
                <p className="mt-5 text-center text-sm text-gray-600">
                    Don't have an account?{" "}

                    <button
                        onClick={() => navigate("/signup")}
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Sign Up
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Login;
