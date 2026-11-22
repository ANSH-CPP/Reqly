// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// // import { getCurrentUser } from "../../Appwrite/AuthService";

// // import {
// //     getHistory,
// //     deleteHistory,
// //     clearHistory as clearHistoryService
// // } from "../../Appwrite/HistoryService";

// import historyService from "../../Appwrite/HistoryService";

// import {
//     setHistory,
//     removeHistory,
//     clearHistory,
//     setSelectedRequest
// } from "../../Store/historySlice";


// function History() {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const history = useSelector(
//         (state) => state.history.history
//     );

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [selectedHistory, setSelectedHistory] = useState(null);


//     // FETCH HISTORY
    
//     useEffect(() => {
//         const fetchHistory = async () => {
//             try {
//                 setLoading(true);
//                 setError("");

//                 const data = await historyService.getHistory();

//                 console.log("User History:", data);

//                 dispatch(setHistory(data));
//             } catch (error) {
//                 console.error("History Error:", error);

//                 setError(
//                     error.response?.status === 401
//                         ? "Please log in to view your history."
//                         : "Failed to load history"
//                 );
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchHistory();
//     }, [dispatch]);


//     // DELETE ONE HISTORY
        
//     const handleDelete = async (rowId) => {
//         try {
//             await historyService.deleteHistory(rowId);

//             dispatch(removeHistory(rowId));

//             if (selectedHistory?._id === rowId) {
//                 setSelectedHistory(null);
//             }
//         } catch (error) {
//             console.error("Delete History Error:", error);

//             setError(
//                 error.response?.data?.message ||
//                 "Failed to delete history"
//             );
//         }
//     };



//     // CLEAR ALL HISTORY
    
//     const handleClearHistory = async () => {
//         try {
//             await historyService.deleteAllHistory();

//             dispatch(clearHistory());
//             setSelectedHistory(null);
//         } catch (error) {
//             console.error("Clear History Error:", error);

//             setError(
//                 error.response?.data?.message ||
//                 "Failed to clear history"
//             );
//         }
//     };


//     // RUN AGAIN
//     const handleRunAgain = (item) => {

//         console.log(
//             "Running saved request:",
//             item
//         );

//         // STORE REQUEST IN REDUX
//         dispatch(
//             setSelectedRequest(item)
//         );

//         // NAVIGATE WITHOUT RELOADING APP
//         navigate("/");
//     };


//     // LOADING
//     if (loading) {

//         return (

//             <div className="min-h-screen bg-gray-50">

//                 <div className="mx-auto max-w-7xl px-4 py-8">

//                     <h1 className="text-2xl font-bold text-gray-900">
//                         Request History
//                     </h1>

//                     <p className="mt-4 text-gray-600">
//                         Loading history...
//                     </p>

//                 </div>

//             </div>

//         );
//     }


//     // ERROR
//     if (error) {

//         return (

//             <div className="min-h-screen bg-gray-50">

//                 <div className="mx-auto max-w-7xl px-4 py-8">

//                     <h1 className="text-2xl font-bold text-gray-900">
//                         Request History
//                     </h1>

//                     <p className="mt-4 text-red-600">
//                         {error}
//                     </p>

//                 </div>

//             </div>

//         );
//     }


//     return (

//         <div className="min-h-screen bg-gray-50">

//             <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">


//                 {/* HEADER */}

//                 <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//                     <div>

//                         <h1 className="text-2xl font-bold text-gray-900">
//                             Request History
//                         </h1>

//                         <p className="mt-1 text-sm text-gray-500">
//                             Your previous API requests
//                         </p>

//                     </div>


//                     {history.length > 0 && (

//                         <button
//                             onClick={handleClearHistory}
//                             className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
//                         >
//                             Clear All
//                         </button>

//                     )}

//                 </div>


//                 {/* EMPTY HISTORY */}

//                 {history.length === 0 ? (

//                     <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">

//                         <h2 className="text-lg font-semibold text-gray-800">
//                             No history found
//                         </h2>

//                         <p className="mt-2 text-sm text-gray-500">
//                             Your API requests will appear here.
//                         </p>

//                     </div>

//                 ) : (

//                     <div className="space-y-4">

//                         {history.map((item) => (

//                             <div
//                                 key={item.$id}
//                                 className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
//                             >

//                                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">


//                                     {/* METHOD + URL */}

//                                     <div className="flex min-w-0 items-center gap-3">

//                                         <span className="shrink-0 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
//                                             {item.method}
//                                         </span>

//                                         <span className="break-all text-sm font-medium text-gray-800">
//                                             {item.url}
//                                         </span>

//                                     </div>


//                                     {/* ACTIONS */}

//                                     <div className="flex shrink-0 flex-wrap items-center gap-2">

//                                         <span
//                                             className={
//                                                 item.status >= 200 &&
//                                                 item.status < 300
//                                                     ? "text-sm font-semibold text-green-600"
//                                                     : "text-sm font-semibold text-red-600"
//                                             }
//                                         >
//                                             {item.status}{" "}
//                                             {item.statusText}
//                                         </span>


//                                         <button
//                                             onClick={() =>
//                                                 setSelectedHistory(item)
//                                             }
//                                             className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-600"
//                                         >
//                                             View Details
//                                         </button>


//                                         <button
//                                             onClick={() =>
//                                                 handleDelete(item.$id)
//                                             }
//                                             className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600"
//                                         >
//                                             Delete
//                                         </button>

//                                     </div>

//                                 </div>


//                                 {/* HISTORY INFO */}

//                                 <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">

//                                     <div>

//                                         <p className="text-gray-500">
//                                             Response Time
//                                         </p>

//                                         <p className="font-medium text-gray-800">
//                                             {item.responseTime} ms
//                                         </p>

//                                     </div>


//                                     <div>

//                                         <p className="text-gray-500">
//                                             Method
//                                         </p>

//                                         <p className="font-medium text-gray-800">
//                                             {item.method}
//                                         </p>

//                                     </div>


//                                     <div>

//                                         <p className="text-gray-500">
//                                             Created
//                                         </p>

//                                         <p className="font-medium text-gray-800">

//                                             {new Date(
//                                                 item.createdAt
//                                             ).toLocaleString()}

//                                         </p>

//                                     </div>

//                                 </div>

//                             </div>

//                         ))}

//                     </div>

//                 )}

//             </main>


//             {/* DETAILS MODAL */}

//             {selectedHistory && (

//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//                     <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">


//                         {/* MODAL HEADER */}

//                         <div className="flex items-center justify-between">

//                             <h2 className="text-xl font-bold text-gray-900">
//                                 Request Details
//                             </h2>

//                             <button
//                                 onClick={() =>
//                                     setSelectedHistory(null)
//                                 }
//                                 className="text-2xl text-gray-500 hover:text-gray-800"
//                             >
//                                 ×
//                             </button>

//                         </div>


//                         {/* REQUEST */}

//                         <div className="mt-6">

//                             <p className="text-sm font-medium text-gray-500">
//                                 Request
//                             </p>

//                             <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">

//                                 <span className="w-fit rounded-md bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
//                                     {selectedHistory.method}
//                                 </span>

//                                 <p className="break-all text-sm font-medium text-gray-800">
//                                     {selectedHistory.url}
//                                 </p>

//                             </div>

//                         </div>


//                         {/* STATUS + RESPONSE TIME */}

//                         <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">


//                             <div className="rounded-lg bg-gray-50 p-4">

//                                 <p className="text-sm text-gray-500">
//                                     Status
//                                 </p>

//                                 <p
//                                     className={
//                                         selectedHistory.status >= 200 &&
//                                         selectedHistory.status < 300
//                                             ? "mt-1 font-semibold text-green-600"
//                                             : "mt-1 font-semibold text-red-600"
//                                     }
//                                 >

//                                     {selectedHistory.status}{" "}
//                                     {selectedHistory.statusText}

//                                 </p>

//                             </div>


//                             <div className="rounded-lg bg-gray-50 p-4">

//                                 <p className="text-sm text-gray-500">
//                                     Response Time
//                                 </p>

//                                 <p className="mt-1 font-semibold text-gray-800">
//                                     {selectedHistory.responseTime} ms
//                                 </p>

//                             </div>

//                         </div>


//                         {/* HEADERS */}

//                         <div className="mt-6">

//                             <h3 className="font-semibold text-gray-900">
//                                 Headers
//                             </h3>

//                             <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">

//                                 {selectedHistory.headers
//                                     ? JSON.stringify(
//                                           JSON.parse(
//                                               selectedHistory.headers
//                                           ),
//                                           null,
//                                           2
//                                       )
//                                     : "No headers"}

//                             </pre>

//                         </div>


//                         {/* AUTHENTICATION */}

//                         <div className="mt-6">

//                             <h3 className="font-semibold text-gray-900">
//                                 Authentication
//                             </h3>

//                             <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">

//                                 {selectedHistory.auth
//                                     ? JSON.stringify(
//                                           JSON.parse(
//                                               selectedHistory.auth
//                                           ),
//                                           null,
//                                           2
//                                       )
//                                     : "No authentication"}

//                             </pre>

//                         </div>


//                         {/* BODY */}

//                         <div className="mt-6">

//                             <h3 className="font-semibold text-gray-900">
//                                 Request Body
//                             </h3>

//                             <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">

//                                 {selectedHistory.body
//                                     ? selectedHistory.body
//                                     : "No request body"}

//                             </pre>

//                         </div>


//                         {/* CREATED */}

//                         <div className="mt-6">

//                             <p className="text-sm text-gray-500">
//                                 Created
//                             </p>

//                             <p className="mt-1 text-sm font-medium text-gray-800">

//                                 {new Date(
//                                     selectedHistory.createdAt
//                                 ).toLocaleString()}

//                             </p>

//                         </div>


//                         {/* BUTTONS */}

//                         <div className="mt-6 flex justify-end gap-3">


//                             <button
//                                 onClick={() =>
//                                     handleRunAgain(
//                                         selectedHistory
//                                     )
//                                 }
//                                 className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
//                             >
//                                 Run Again
//                             </button>


//                             <button
//                                 onClick={() =>
//                                     setSelectedHistory(null)
//                                 }
//                                 className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-900"
//                             >
//                                 Close
//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             )}

//         </div>

//     );
// }

// export default History;




// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import historyService from "../Services/HistoryService";


// import { setHistory, removeHistory, clearHistory, setSelectedRequest } from "../../Store/historySlice";

// function History() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const history = useSelector(
//         (state) => state.history.history
//     );

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [selectedHistory, setSelectedHistory] = useState(null);
//     const [deleting, setDeleting] = useState(false);

//     // FORMAT JSON OBJECTS OR STRINGS SAFELY
//     const formatJson = (value, fallback) => {
//         if (value == null || value === "") {
//             return fallback;
//         }

//         if (typeof value === "string") {
//             try {
//                 return JSON.stringify(JSON.parse(value), null, 2);
//             } catch {
//                 return value;
//             }
//         }

//         return JSON.stringify(value, null, 2);
//     };

//     // FETCH HISTORY FROM EXPRESS BACKEND
//     useEffect(() => {
//         const fetchHistory = async () => {
//             try {
//                 setLoading(true);
//                 setError("");

//                 const data = await historyService.getHistory();

//                 console.log("User History:", data);

//                 dispatch(setHistory(data));
//             } catch (error) {
//                 console.error("History Error:", error);

//                 setError(
//                     error.response?.status === 401
//                         ? "Please log in to view your history."
//                         : error.response?.data?.message ||
//                           "Failed to load history."
//                 );
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchHistory();
//     }, [dispatch]);

//     // DELETE ONE HISTORY RECORD
//     const handleDelete = async (rowId) => {
//         try {
//             setError("");

//             await historyService.deleteHistory(rowId);

//             dispatch(removeHistory(rowId));

//             if (selectedHistory?._id === rowId) {
//                 setSelectedHistory(null);
//             }
//         } catch (error) {
//             console.error("Delete History Error:", error);

//             setError(
//                 error.response?.data?.message ||
//                 "Failed to delete history."
//             );
//         }
//     };

//     // DELETE ALL HISTORY RECORDS
//     const handleClearHistory = async () => {
//         const confirmed = window.confirm(
//             "Are you sure you want to delete all your request history?"
//         );

//         if (!confirmed) return;

//         try {
//             setDeleting(true);
//             setError("");

//             await historyService.deleteAllHistory();

//             dispatch(clearHistory());
//             setSelectedHistory(null);
//         } catch (error) {
//             console.error("Clear History Error:", error);

//             setError(
//                 error.response?.data?.message ||
//                 "Failed to clear history."
//             );
//         } finally {
//             setDeleting(false);
//         }
//     };

//     // RUN REQUEST AGAIN
//     const handleRunAgain = (item) => {
//         dispatch(setSelectedRequest(item));
//         setSelectedHistory(null);
//         navigate("/");
//     };

//     // LOADING STATE
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50">
//                 <div className="mx-auto max-w-7xl px-4 py-8">
//                     <h1 className="text-2xl font-bold text-gray-900">
//                         Request History
//                     </h1>

//                     <p className="mt-4 text-gray-600">
//                         Loading history...
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     // PAGE
//     return (
//         <div className="min-h-screen bg-gray-50">
//             <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

//                 {/* HEADER */}
//                 <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-900">
//                             Request History
//                         </h1>

//                         <p className="mt-1 text-sm text-gray-500">
//                             Your previous API requests
//                         </p>
//                     </div>

//                     {history.length > 0 && (
//                         <button
//                             onClick={handleClearHistory}
//                             disabled={deleting}
//                             className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
//                         >
//                             {deleting ? "Clearing..." : "Clear All"}
//                         </button>
//                     )}
//                 </div>

//                 {/* ERROR MESSAGE */}
//                 {error && (
//                     <div
//                         role="alert"
//                         className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
//                     >
//                         <span>{error}</span>

//                         <button
//                             onClick={() => setError("")}
//                             className="font-semibold hover:text-red-900"
//                             aria-label="Dismiss error"
//                         >
//                             ×
//                         </button>
//                     </div>
//                 )}

//                 {/* EMPTY HISTORY */}
//                 {history.length === 0 ? (
//                     <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
//                         <h2 className="text-lg font-semibold text-gray-800">
//                             No history found
//                         </h2>

//                         <p className="mt-2 text-sm text-gray-500">
//                             Your API requests will appear here.
//                         </p>
//                     </div>
//                 ) : (
//                     /* HISTORY LIST */
//                     <div className="space-y-4">
//                         {history.map((item) => (
//                             <div
//                                 key={item._id}
//                                 className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
//                             >
//                                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//                                     {/* METHOD + URL */}
//                                     <div className="flex min-w-0 items-center gap-3">
//                                         <span className="shrink-0 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
//                                             {item.method}
//                                         </span>

//                                         <span className="break-all text-sm font-medium text-gray-800">
//                                             {item.url}
//                                         </span>
//                                     </div>

//                                     {/* ACTIONS */}
//                                     <div className="flex shrink-0 flex-wrap items-center gap-2">
//                                         <span
//                                             className={
//                                                 item.status >= 200 &&
//                                                 item.status < 300
//                                                     ? "text-sm font-semibold text-green-600"
//                                                     : "text-sm font-semibold text-red-600"
//                                             }
//                                         >
//                                             {item.status ?? "N/A"}{" "}
//                                             {item.statusText}
//                                         </span>

//                                         <button
//                                             onClick={() =>
//                                                 setSelectedHistory(item)
//                                             }
//                                             className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-600"
//                                         >
//                                             View Details
//                                         </button>

//                                         <button
//                                             onClick={() =>
//                                                 handleDelete(item._id)
//                                             }
//                                             className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {/* HISTORY INFO */}
//                                 <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
//                                     <div>
//                                         <p className="text-gray-500">
//                                             Response Time
//                                         </p>

//                                         <p className="font-medium text-gray-800">
//                                             {item.responseTime ?? "N/A"}{" "}
//                                             {item.responseTime != null ? "ms" : ""}
//                                         </p>
//                                     </div>

//                                     <div>
//                                         <p className="text-gray-500">
//                                             Method
//                                         </p>

//                                         <p className="font-medium text-gray-800">
//                                             {item.method}
//                                         </p>
//                                     </div>

//                                     <div>
//                                         <p className="text-gray-500">
//                                             Created
//                                         </p>

//                                         <p className="font-medium text-gray-800">
//                                             {item.createdAt
//                                                 ? new Date(
//                                                       item.createdAt
//                                                   ).toLocaleString()
//                                                 : "N/A"}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </main>

//             {/* DETAILS MODAL */}
//             {selectedHistory && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//                     <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">

//                         {/* MODAL HEADER */}
//                         <div className="flex items-center justify-between">
//                             <h2 className="text-xl font-bold text-gray-900">
//                                 Request Details
//                             </h2>

//                             <button
//                                 onClick={() => setSelectedHistory(null)}
//                                 className="text-2xl text-gray-500 hover:text-gray-800"
//                                 aria-label="Close request details"
//                             >
//                                 ×
//                             </button>
//                         </div>

//                         {/* REQUEST */}
//                         <div className="mt-6">
//                             <p className="text-sm font-medium text-gray-500">
//                                 Request
//                             </p>

//                             <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
//                                 <span className="w-fit rounded-md bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
//                                     {selectedHistory.method}
//                                 </span>

//                                 <p className="break-all text-sm font-medium text-gray-800">
//                                     {selectedHistory.url}
//                                 </p>
//                             </div>
//                         </div>

//                         {/* STATUS + RESPONSE TIME */}
//                         <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                             <div className="rounded-lg bg-gray-50 p-4">
//                                 <p className="text-sm text-gray-500">
//                                     Status
//                                 </p>

//                                 <p
//                                     className={
//                                         selectedHistory.status >= 200 &&
//                                         selectedHistory.status < 300
//                                             ? "mt-1 font-semibold text-green-600"
//                                             : "mt-1 font-semibold text-red-600"
//                                     }
//                                 >
//                                     {selectedHistory.status ?? "N/A"}{" "}
//                                     {selectedHistory.statusText}
//                                 </p>
//                             </div>

//                             <div className="rounded-lg bg-gray-50 p-4">
//                                 <p className="text-sm text-gray-500">
//                                     Response Time
//                                 </p>

//                                 <p className="mt-1 font-semibold text-gray-800">
//                                     {selectedHistory.responseTime ?? "N/A"}
//                                     {selectedHistory.responseTime != null
//                                         ? " ms"
//                                         : ""}
//                                 </p>
//                             </div>
//                         </div>

//                         {/* HEADERS */}
//                         <div className="mt-6">
//                             <h3 className="font-semibold text-gray-900">
//                                 Headers
//                             </h3>

//                             <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-gray-900 p-4 text-sm text-white">
//                                 {formatJson(
//                                     selectedHistory.headers,
//                                     "No headers"
//                                 )}
//                             </pre>
//                         </div>

//                         {/* AUTHENTICATION */}
//                         <div className="mt-6">
//                             <h3 className="font-semibold text-gray-900">
//                                 Authentication
//                             </h3>

//                             <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-gray-900 p-4 text-sm text-white">
//                                 {formatJson(
//                                     selectedHistory.auth,
//                                     "No authentication"
//                                 )}
//                             </pre>
//                         </div>

//                         {/* REQUEST BODY */}
//                         <div className="mt-6">
//                             <h3 className="font-semibold text-gray-900">
//                                 Request Body
//                             </h3>

//                             <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-gray-900 p-4 text-sm text-white">
//                                 {selectedHistory.body || "No request body"}
//                             </pre>
//                         </div>

//                         {/* RESPONSE DATA */}
//                         <div className="mt-6">
//                             <h3 className="font-semibold text-gray-900">
//                                 Response Body
//                             </h3>

//                             <pre className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-gray-900 p-4 text-sm text-white">
//                                 {formatJson(
//                                     selectedHistory.responseData,
//                                     "No response data"
//                                 )}
//                             </pre>
//                         </div>

//                         {/* CREATED */}
//                         <div className="mt-6">
//                             <p className="text-sm text-gray-500">
//                                 Created
//                             </p>

//                             <p className="mt-1 text-sm font-medium text-gray-800">
//                                 {selectedHistory.createdAt
//                                     ? new Date(
//                                           selectedHistory.createdAt
//                                       ).toLocaleString()
//                                     : "N/A"}
//                             </p>
//                         </div>

//                         {/* BUTTONS */}
//                         <div className="mt-6 flex justify-end gap-3">
//                             <button
//                                 onClick={() =>
//                                     handleRunAgain(selectedHistory)
//                                 }
//                                 className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
//                             >
//                                 Run Again
//                             </button>

//                             <button
//                                 onClick={() => setSelectedHistory(null)}
//                                 className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-900"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default History;



























import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import historyService from "../Services/HistoryService";
import {
    setHistory,
    removeHistory,
    clearHistory,
    setSelectedRequest,
} from "../../Store/historySlice";

function History() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const history = useSelector((state) => state.history.history);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [clearing, setClearing] = useState(false);

    // Safely format JSON objects and strings.
    const formatJson = (value, fallback = "No data") => {
        if (value === null || value === undefined || value === "") {
            return fallback;
        }

        if (typeof value === "string") {
            try {
                return JSON.stringify(JSON.parse(value), null, 2);
            } catch {
                return value;
            }
        }

        try {
            return JSON.stringify(value, null, 2);
        } catch {
            return String(value);
        }
    };

    // Convert API errors into readable messages.
    const getErrorMessage = (error, fallback) => {
        if (error.response?.status === 401) {
            return "Your session has expired. Please log in again.";
        }

        return (
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            fallback
        );
    };

    // Fetch history from the backend.
    useEffect(() => {
        let cancelled = false;

        const fetchHistory = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await historyService.getHistory();

                if (!cancelled) {
                    dispatch(setHistory(Array.isArray(data) ? data : []));
                }
            } catch (error) {
                console.error("History Error:", error);

                if (!cancelled) {
                    setError(
                        getErrorMessage(error, "Failed to load history.")
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchHistory();

        return () => {
            cancelled = true;
        };
    }, [dispatch]);

    // Delete one history record.
    const handleDelete = async (rowId) => {
        if (!rowId || deletingId !== null || clearing) {
            return;
        }

        try {
            setError("");
            setDeletingId(rowId);

            // Delete the record in the backend first.
            await historyService.deleteHistory(rowId);

            // Remove the record from Redux immediately.
            dispatch(removeHistory(rowId));

            // Close the modal if the deleted record was selected.
            setSelectedHistory((current) =>
                current?._id === rowId ? null : current
            );
        } catch (error) {
            console.error("Delete History Error:", error);

            setError(
                getErrorMessage(error, "Failed to delete history.")
            );
        } finally {
            setDeletingId(null);
        }
    };

    // Delete all history records.
    const handleClearHistory = async () => {
        if (clearing || deletingId !== null) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete all your request history?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setClearing(true);
            setError("");

            await historyService.deleteAllHistory();

            dispatch(clearHistory());
            setSelectedHistory(null);
        } catch (error) {
            console.error("Clear History Error:", error);

            setError(
                getErrorMessage(error, "Failed to clear history.")
            );
        } finally {
            setClearing(false);
        }
    };

    // Run a saved request again.
    const handleRunAgain = (item) => {
        dispatch(setSelectedRequest(item));
        setSelectedHistory(null);
        navigate("/");
    };

    // Loading state.
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <main className="mx-auto max-w-7xl px-4 py-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Request History
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Loading history...
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Request History
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Your previous API requests
                        </p>
                    </div>

                    {history.length > 0 && (
                        <button
                            type="button"
                            onClick={handleClearHistory}
                            disabled={clearing || deletingId !== null}
                            className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {clearing ? "Clearing..." : "Clear All"}
                        </button>
                    )}
                </div>

                {/* Error message */}
                {error && (
                    <div
                        role="alert"
                        className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        <span>{error}</span>

                        <button
                            type="button"
                            onClick={() => setError("")}
                            className="font-semibold hover:text-red-900"
                            aria-label="Dismiss error"
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Empty history */}
                {history.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">
                            No history found
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Your API requests will appear here.
                        </p>
                    </div>
                ) : (
                    /* History list */
                    <div className="space-y-4">
                        {history.map((item) => (
                            <div
                                key={item._id}
                                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    {/* Method and URL */}
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span className="shrink-0 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                                            {item.method}
                                        </span>

                                        <span className="break-all text-sm font-medium text-gray-800">
                                            {item.url}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                                        <span
                                            className={
                                                item.status >= 200 &&
                                                item.status < 300
                                                    ? "text-sm font-semibold text-green-600"
                                                    : "text-sm font-semibold text-red-600"
                                            }
                                        >
                                            {item.status ?? "N/A"}{" "}
                                            {item.statusText}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedHistory(item)
                                            }
                                            className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-600"
                                        >
                                            View Details
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item._id)}
                                            disabled={
                                                deletingId !== null || clearing
                                            }
                                            className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {deletingId === item._id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </div>
                                </div>

                                {/* History information */}
                                <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                                    <div>
                                        <p className="text-gray-500">
                                            Response Time
                                        </p>

                                        <p className="font-medium text-gray-800">
                                            {item.responseTime ?? "N/A"}
                                            {item.responseTime != null
                                                ? " ms"
                                                : ""}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500">Method</p>

                                        <p className="font-medium text-gray-800">
                                            {item.method}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500">Created</p>

                                        <p className="font-medium text-gray-800">
                                            {item.createdAt
                                                ? new Date(
                                                      item.createdAt
                                                  ).toLocaleString()
                                                : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Details modal */}
            {selectedHistory && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setSelectedHistory(null)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="history-modal-title"
                        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className="flex items-center justify-between">
                            <h2
                                id="history-modal-title"
                                className="text-xl font-bold text-gray-900"
                            >
                                Request Details
                            </h2>

                            <button
                                type="button"
                                onClick={() => setSelectedHistory(null)}
                                className="text-2xl text-gray-500 hover:text-gray-800"
                                aria-label="Close request details"
                            >
                                ×
                            </button>
                        </div>

                        {/* Request */}
                        <div className="mt-6">
                            <p className="text-sm font-medium text-gray-500">
                                Request
                            </p>

                            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                                <span className="w-fit rounded-md bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                                    {selectedHistory.method}
                                </span>

                                <p className="break-all text-sm font-medium text-gray-800">
                                    {selectedHistory.url}
                                </p>
                            </div>
                        </div>

                        {/* Status and response time */}
                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">Status</p>

                                <p
                                    className={
                                        selectedHistory.status >= 200 &&
                                        selectedHistory.status < 300
                                            ? "mt-1 font-semibold text-green-600"
                                            : "mt-1 font-semibold text-red-600"
                                    }
                                >
                                    {selectedHistory.status ?? "N/A"}{" "}
                                    {selectedHistory.statusText}
                                </p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Response Time
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {selectedHistory.responseTime ?? "N/A"}
                                    {selectedHistory.responseTime != null
                                        ? " ms"
                                        : ""}
                                </p>
                            </div>
                        </div>

                        {/* Headers */}
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-900">
                                Headers
                            </h3>

                            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-gray-900 p-4 text-sm text-white">
                                {formatJson(
                                    selectedHistory.headers,
                                    "No headers"
                                )}
                            </pre>
                        </div>

                        {/* Authentication */}
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-900">
                                Authentication
                            </h3>

                            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-gray-900 p-4 text-sm text-white">
                                {formatJson(
                                    selectedHistory.auth,
                                    "No authentication"
                                )}
                            </pre>
                        </div>

                        {/* Request body */}
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-900">
                                Request Body
                            </h3>

                            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-gray-900 p-4 text-sm text-white">
                                {formatJson(
                                    selectedHistory.body,
                                    "No request body"
                                )}
                            </pre>
                        </div>

                        {/* Response body */}
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-900">
                                Response Body
                            </h3>

                            <pre className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-gray-900 p-4 text-sm text-white">
                                {formatJson(
                                    selectedHistory.responseData,
                                    "No response data"
                                )}
                            </pre>
                        </div>

                        {/* Created date */}
                        <div className="mt-6">
                            <p className="text-sm text-gray-500">Created</p>

                            <p className="mt-1 text-sm font-medium text-gray-800">
                                {selectedHistory.createdAt
                                    ? new Date(
                                          selectedHistory.createdAt
                                      ).toLocaleString()
                                    : "N/A"}
                            </p>
                        </div>

                        {/* Modal actions */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => handleRunAgain(selectedHistory)}
                                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                            >
                                Run Again
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedHistory(null)}
                                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-900"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default History;