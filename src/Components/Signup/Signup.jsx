import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../Appwrite/AuthService";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await createAccount(
                email,
                password,
                name
            );

            // After successful signup
            navigate("/login");

        } catch (error) {

            console.error(error);

            setError(
                error.message || "Signup failed"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">

                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    Create Account
                </h1>


                {error && (
                    <p className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">
                        {error}
                    </p>
                )}


                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* NAME */}

                    <div>

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your name"
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />

                    </div>


                    {/* EMAIL */}

                    <div>

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />

                    </div>


                    {/* PASSWORD */}

                    <div>

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter password"
                            required
                            minLength={8}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />

                    </div>


                    {/* BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>

                </form>


                <p className="mt-5 text-center text-sm text-gray-600">

                    Already have an account?{" "}

                    <button
                        onClick={() => navigate("/login")}
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </button>

                </p>

            </div>

        </div>

    );
}

export default Signup;