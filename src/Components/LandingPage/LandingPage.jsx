import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

function LandingPage() {
    const navigate = useNavigate();

    const features = [
        {
            number: "01",
            title: "API Testing",
            description:
                "Send and test HTTP requests with different methods, headers, parameters, authentication and request bodies. Inspect status codes, response headers, response body and response time.",
            points: [
                "GET, POST, PUT, PATCH and DELETE",
                "Multiple authentication methods",
                "Detailed response inspection",
                "Save and replay request history"
            ],
            action: "Start Testing APIs",
            path: "/api-tester"
        },
        {
            number: "02",
            title: "Webhook Management",
            description:
                "Receive and manage incoming webhook events. Validate payloads, identify duplicate events, track processing attempts and recover failed deliveries.",
            points: [
                "Webhook endpoint generation",
                "Payload validation and event tracking",
                "Automatic retries and failure handling",
                "Dead Letter Queue and manual recovery"
            ],
            action: "Explore Webhooks",
            path: "/incoming-webhooks"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
                    <div className="max-w-3xl">
                        <span className="inline-flex rounded-full border border-blue-200 bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
                            API Testing & Webhook Management Platform
                        </span>

                        <h1 className="mt-7 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Develop, Test and Monitor APIs
                            <span className="text-blue-600">
                                {" "}in One Place.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                            API Checker is a developer-focused platform
                            that simplifies API testing and webhook
                            management. Build requests, inspect responses,
                            monitor incoming events and recover failed
                            webhook deliveries from one workspace.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate("/api-tester")}
                                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                            >
                                Open API Tester →
                            </button>

                            <button
                                onClick={() => navigate("/incoming-webhooks")}
                                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Explore Webhooks
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Core Features
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to work with APIs
                        </h2>

                        <p className="mt-4 text-gray-600">
                            Two essential tools designed to make API
                            development and integration easier.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {features.map((feature) => (
                            <div
                                key={feature.number}
                                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <span className="text-sm font-bold text-blue-600">
                                    FEATURE {feature.number}
                                </span>

                                <h3 className="mt-4 text-2xl font-bold text-gray-900">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 leading-7 text-gray-600">
                                    {feature.description}
                                </p>

                                <ul className="mt-6 space-y-3">
                                    {feature.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-start gap-3 text-sm text-gray-700"
                                        >
                                            <span className="mt-0.5 font-bold text-green-600">
                                                ✓
                                            </span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-8">
                                    <button
                                        onClick={() => navigate(feature.path)}
                                        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
                                    >
                                        {feature.action} →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Features */}
            <section className="border-y border-gray-200 bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                            More tools for your workflow
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Keep track of your API requests and webhook
                            performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-7">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Request History
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Access previously executed API requests,
                                review their responses and run requests again.
                            </p>

                            <button
                                onClick={() => navigate("/History")}
                                className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                                View History →
                            </button>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-7">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Webhook Analytics
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Monitor webhook processing statistics,
                                successful events, failed deliveries,
                                retries and processing time.
                            </p>

                            <button
                                onClick={() => navigate("/webhook-analytics")}
                                className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                                View Analytics →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-900 py-16">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl font-bold text-white">
                        Ready to simplify your API workflow?
                    </h2>

                    <p className="mt-4 text-gray-300">
                        Start testing APIs and managing webhook events
                        with API Checker.
                    </p>

                    <button
                        onClick={() => navigate("/api-tester")}
                        className="mt-8 rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Get Started →
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-6">
                <p className="text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} API Checker. Built for developers.
                </p>
            </footer>
        </div>
    );
}

export default LandingPage;
