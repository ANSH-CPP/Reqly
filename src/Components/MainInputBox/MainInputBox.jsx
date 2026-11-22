// import React, { useEffect } from "react";
// import { useForm, FormProvider, Controller } from "react-hook-form";

// import { functions } from "../../Appwrite/Appwrite";

// import {
//     getCurrentUser
// } from "../../Appwrite/AuthService";

// import {
//     createHistory
// } from "../../Appwrite/HistoryService";

// import Authorization from "../Authorization/Authorization";
// import RequestBodyEditor from "./RequestBodyEditor";
// import RequestHeaders from "./RequestHeaders";

// import {
//     useDispatch,
//     useSelector
// } from "react-redux";

// import { setResponse } from "../../Store/responseSlice";

// import {
//     addHistory,
//     clearSelectedRequest
// } from "../../Store/historySlice";

// import { buildHeaders } from "../Services/RequestServices";


// function MainInputBox() {

//     const methods = useForm();

//     const {
//         handleSubmit,
//         register,
//         formState: { errors },
//         watch,
//         control,
//         reset
//     } = methods;

//     const dispatch = useDispatch();


//     // --------------------------------
//     // GET SELECTED REQUEST FROM REDUX
//     // --------------------------------

//     const selectedRequest = useSelector(
//         (state) => state.history.selectedRequest
//     );


//     // --------------------------------
//     // LOAD SAVED REQUEST
//     // --------------------------------

//     useEffect(() => {

//         if (!selectedRequest) {
//             return;
//         }


//         console.log(
//             "Selected Request:",
//             selectedRequest
//         );


//         // --------------------------------
//         // PARSE HEADERS
//         // --------------------------------

//         let savedHeaders = {};

//         if (selectedRequest.headers) {

//             try {

//                 savedHeaders = JSON.parse(
//                     selectedRequest.headers
//                 );

//             } catch (error) {

//                 console.error(
//                     "Headers Parse Error:",
//                     error
//                 );

//             }

//         }


//         // --------------------------------
//         // CONVERT HEADER OBJECT
//         // TO HEADER ARRAY
//         // --------------------------------

//         const requestHeaders = Object.entries(
//             savedHeaders
//         ).map(([name, value]) => ({

//             name: name,

//             value: value

//         }));


//         // --------------------------------
//         // PARSE AUTH
//         // --------------------------------

//         let savedAuth = {};

//         if (selectedRequest.auth) {

//             try {

//                 savedAuth = JSON.parse(
//                     selectedRequest.auth
//                 );

//             } catch (error) {

//                 console.error(
//                     "Auth Parse Error:",
//                     error
//                 );

//             }

//         }


//         // --------------------------------
//         // RESTORE FORM
//         // --------------------------------

//         reset({

//             URL: selectedRequest.url,

//             method: selectedRequest.method,

//             requestHeaders: requestHeaders,

//             auth: savedAuth,

//             bodyData: selectedRequest.body || ""

//         });


//         console.log(
//             "Request loaded into form"
//         );


//         // --------------------------------
//         // CLEAR SELECTED REQUEST
//         // --------------------------------

//         dispatch(
//             clearSelectedRequest()
//         );


//     }, [
//         selectedRequest,
//         reset,
//         dispatch
//     ]);



//     // --------------------------------
//     // SEND REQUEST
//     // --------------------------------

//     const handelCheck = async (data) => {

//         alert("Submit working");

//         console.log(
//             "Form Data: ",
//             data
//         );


//         // --------------------------------
//         // BUILD HEADERS
//         // --------------------------------

//         const header =
//             buildHeaders(data);

//         console.log(
//             "Headers:",
//             header
//         );


//         try {


//             // --------------------------------
//             // SEND REQUEST TO APPWRITE
//             // --------------------------------

//             const result =
//                 await functions.createExecution({

//                     functionId:
//                         import.meta.env
//                             .VITE_APPWRITE_FUNCTION_ID,

//                     body: JSON.stringify({

//                         url: data.URL,

//                         method: data.method,

//                         auth: data.auth,

//                         headers: header,

//                         location:
//                             data.auth?.location,

//                         bodyData:
//                             data.bodyData

//                     }),

//                     async: false

//                 });


//             console.log(
//                 "Appwrite Result:",
//                 result
//             );


//             // --------------------------------
//             // CONVERT APPWRITE RESPONSE
//             // --------------------------------

//             const response =
//                 JSON.parse(
//                     result.responseBody
//                 );


//             console.log(
//                 "API Response:",
//                 response
//             );


//             // --------------------------------
//             // STORE RESPONSE IN REDUX
//             // --------------------------------

//             dispatch(
//                 setResponse(response)
//             );


//             // --------------------------------
//             // GET CURRENT USER
//             // --------------------------------

//             const user =
//                 await getCurrentUser();


//             if (!user) {

//                 console.log(
//                     "User is not logged in"
//                 );

//                 return;

//             }


//             console.log(
//                 "Current User:",
//                 user
//             );


//             // --------------------------------
//             // CREATE HISTORY DATA
//             // --------------------------------

//             const historyData = {

//                 userId:
//                     user.$id,

//                 method:
//                     data.method,

//                 url:
//                     data.URL,

//                 headers:
//                     JSON.stringify(
//                         header
//                     ),

//                 auth:
//                     JSON.stringify(
//                         data.auth
//                     ),

//                 body:
//                     data.bodyData,

//                 status:
//                     response.status,

//                 statusText:
//                     response.statusText,

//                 responseTime:
//                     response.responseTime,

//                 createdAt:
//                     new Date().toISOString()

//             };


//             console.log(
//                 "History Data:",
//                 historyData
//             );


//             // --------------------------------
//             // SAVE HISTORY TO APPWRITE
//             // --------------------------------

//             const savedHistory =
//                 await createHistory(
//                     historyData
//                 );


//             console.log(
//                 "History saved to Appwrite:",
//                 savedHistory
//             );


//             // --------------------------------
//             // SAVE HISTORY TO REDUX
//             // --------------------------------

//             dispatch(
//                 addHistory(
//                     savedHistory
//                 )
//             );


//         } catch (error) {

//             console.error(
//                 "Request Error:",
//                 error
//             );

//         }

//     };


//     const request = [

//         "GET",

//         "POST",

//         "PUT",

//         "PATCH",

//         "DELETE"

//     ];


//     const selectedMethod =
//         watch("method");


//     return (

//         <FormProvider {...methods}>

//             <div className="panel">


//                 {/* PANEL HEADING */}

//                 <div className="border-b border-gray-200 px-5 py-3">

//                     <h2 className="section-title">
//                         Request
//                     </h2>

//                 </div>


//                 <form

//                     className="divide-y divide-gray-200"

//                     onSubmit={handleSubmit(

//                         handelCheck,

//                         (errors) => {

//                             console.log(
//                                 "FORM ERRORS:",
//                                 errors
//                             );

//                         }

//                     )}

//                 >


//                     {/* METHOD + URL + SEND */}

//                     <div className="p-5">

//                         <div className="flex gap-2">


//                             {/* METHOD + URL */}

//                             <div className="flex min-w-0 flex-1 rounded-lg border border-gray-300 bg-white transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">


//                                 {/* METHOD */}

//                                 <div>

//                                     <select

//                                         aria-label="HTTP method"

//                                         className="cursor-pointer rounded-l-lg border-r border-gray-300 bg-gray-50 py-2.5 pr-2 pl-3 text-sm font-semibold text-gray-700 outline-none"

//                                         {...register(
//                                             "method"
//                                         )}

//                                     >

//                                         {request.map(
//                                             (it) => {

//                                                 return (

//                                                     <option
//                                                         key={it}
//                                                         value={it}
//                                                     >
//                                                         {it}
//                                                     </option>

//                                                 );

//                                             }
//                                         )}

//                                     </select>

//                                 </div>


//                                 {/* URL */}

//                                 <div className="min-w-0 flex-1">

//                                     <input

//                                         className="w-full bg-transparent px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"

//                                         label="URL: "

//                                         placeholder="Enter URL"

//                                         type="text"

//                                         {...register(
//                                             "URL",
//                                             {
//                                                 required:
//                                                     "URL is required"
//                                             }
//                                         )}

//                                     />

//                                 </div>

//                             </div>


//                             {/* SEND BUTTON */}

//                             <button

//                                 type="submit"

//                                 className="btn btn-primary px-5"

//                             >
//                                 Send

//                             </button>

//                         </div>


//                         {/* URL ERROR */}

//                         {errors.URL && (

//                             <p className="mt-2 text-xs text-red-600">

//                                 {errors.URL.message}

//                             </p>

//                         )}

//                     </div>


//                     {/* AUTHORIZATION */}

//                     <div className="p-5">

//                         <Authorization />

//                     </div>


//                     {/* REQUEST BODY */}

//                     {["POST", "PUT", "PATCH"].includes(
//                         selectedMethod
//                     ) && (

//                         <div className="p-5">

//                             <h3 className="section-title mb-3">
//                                 Request body
//                             </h3>


//                             <Controller

//                                 name="bodyData"

//                                 control={control}

//                                 defaultValue=""

//                                 render={({ field }) => (

//                                     <RequestBodyEditor

//                                         value={
//                                             field.value
//                                         }

//                                         onChange={
//                                             field.onChange
//                                         }

//                                     />

//                                 )}

//                             />

//                         </div>

//                     )}


//                     {/* REQUEST HEADERS */}

//                     <div className="p-5">

//                         <h3 className="section-title mb-3">
//                             Headers
//                         </h3>


//                         <RequestHeaders />

//                     </div>

//                 </form>

//             </div>

//         </FormProvider>

//     );

// }


// export default MainInputBox;





import React, { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";

import Authorization from "../Authorization/Authorization";
import RequestBodyEditor from "./RequestBodyEditor";
import RequestHeaders from "./RequestHeaders";

import { useDispatch, useSelector } from "react-redux";

import api from "../../api/axios.js";
import historyService from "../Services/HistoryService.js";

import { setResponse } from "../../Store/responseSlice";

import {
    addHistory,
    clearSelectedRequest
} from "../../Store/historySlice";

import { buildHeaders } from "../Services/RequestServices";

function MainInputBox() {
    const methods = useForm({
        defaultValues: {
            method: "GET",
            URL: "",
            requestHeaders: [],
            auth: {},
            bodyData: ""
        }
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        control,
        reset
    } = methods;

    const dispatch = useDispatch();

    // GET SELECTED REQUEST FROM REDUX
    const selectedRequest = useSelector(
        (state) => state.history.selectedRequest
    );

    // LOAD SAVED REQUEST INTO FORM
    useEffect(() => {
        if (!selectedRequest) {
            return;
        }

        console.log("Selected Request:", selectedRequest);

        // PARSE SAVED HEADERS
        let savedHeaders = {};

        if (selectedRequest.headers) {
            try {
                savedHeaders =
                    typeof selectedRequest.headers === "string"
                        ? JSON.parse(selectedRequest.headers)
                        : selectedRequest.headers;
            } catch (error) {
                console.error("Headers Parse Error:", error);
            }
        }

        // CONVERT HEADER OBJECT INTO HEADER ARRAY
        const requestHeaders = Array.isArray(savedHeaders)
            ? savedHeaders
            : Object.entries(savedHeaders).map(([name, value]) => ({
                  name,
                  value
              }));

        // PARSE SAVED AUTHORIZATION
        let savedAuth = {};

        if (selectedRequest.auth) {
            try {
                savedAuth =
                    typeof selectedRequest.auth === "string"
                        ? JSON.parse(selectedRequest.auth)
                        : selectedRequest.auth;
            } catch (error) {
                console.error("Auth Parse Error:", error);
            }
        }

        // RESTORE FORM VALUES
        reset({
            URL: selectedRequest.url || selectedRequest.URL || "",
            method: selectedRequest.method || "GET",
            requestHeaders,
            auth: savedAuth,
            bodyData: selectedRequest.body || selectedRequest.bodyData || ""
        });

        console.log("Request loaded into form");

        // CLEAR SELECTED REQUEST
        dispatch(clearSelectedRequest());
    }, [selectedRequest, reset, dispatch]);

    // SEND REQUEST TO OUR BACKEND
    const handelCheck = async (data) => {
        console.log("Form Data:", data);

        // BUILD REQUEST HEADERS
        const header = buildHeaders(data);

        console.log("Headers:", header);

        try {
            // 1. EXECUTE REQUEST THROUGH OUR EXPRESS BACKEND
            const result = await api.post("/requests/execute", {
                url: data.URL,
                method: data.method,
                auth: data.auth,
                headers: header,
                location: data.auth?.location,
                bodyData: data.bodyData
            });

            // 2. GET API RESPONSE
            const response = result.data;

            console.log("API Response:", response);

            // 3. DISPLAY RESPONSE IN REDUX / RESPONSE PANEL
            dispatch(setResponse(response));

            // 4. SAVE REQUEST HISTORY TO OUR BACKEND
            // A history failure should not hide a successful API response.
            try {
                const savedHistory =
                    await historyService.createHistory({
                        method: data.method,
                        url: data.URL,
                        status: response.status,
                        responseTime: response.responseTime,
                        responseData: response.data
                    });

                console.log("History saved:", savedHistory);

                // 5. UPDATE REDUX HISTORY
                if (savedHistory) {
                    dispatch(addHistory(savedHistory));
                }
            } catch (historyError) {
                console.error(
                    "History Save Error:",
                    historyError.response?.data || historyError.message
                );
            }
        } catch (error) {
            console.error("Request Error:", error);

            // DISPLAY REQUEST / BACKEND ERROR
            dispatch(
                setResponse({
                    success: false,
                    error:
                        error.response?.data?.error ||
                        error.response?.data?.message ||
                        error.message ||
                        "Request failed"
                })
            );
        }
    };

    const request = [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];

    const selectedMethod = watch("method");

    return (
        <FormProvider {...methods}>
            <div className="panel">
                {/* PANEL HEADING */}
                <div className="border-b border-gray-200 px-5 py-3">
                    <h2 className="section-title">
                        Request
                    </h2>
                </div>

                <form
                    className="divide-y divide-gray-200"
                    onSubmit={handleSubmit(
                        handelCheck,
                        (formErrors) => {
                            console.log("FORM ERRORS:", formErrors);
                        }
                    )}
                >
                    {/* METHOD + URL + SEND */}
                    <div className="p-5">
                        <div className="flex gap-2">
                            {/* METHOD + URL */}
                            <div className="flex min-w-0 flex-1 rounded-lg border border-gray-300 bg-white transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                                {/* METHOD */}
                                <div>
                                    <select
                                        aria-label="HTTP method"
                                        className="cursor-pointer rounded-l-lg border-r border-gray-300 bg-gray-50 py-2.5 pr-2 pl-3 text-sm font-semibold text-gray-700 outline-none"
                                        {...register("method")}
                                    >
                                        {request.map((it) => (
                                            <option key={it} value={it}>
                                                {it}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* URL */}
                                <div className="min-w-0 flex-1">
                                    <input
                                        className="w-full bg-transparent px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                        placeholder="Enter URL"
                                        type="text"
                                        {...register("URL", {
                                            required: "URL is required"
                                        })}
                                    />
                                </div>
                            </div>

                            {/* SEND BUTTON */}
                            <button
                                type="submit"
                                className="btn btn-primary px-5"
                            >
                                Send
                            </button>
                        </div>

                        {/* URL ERROR */}
                        {errors.URL && (
                            <p className="mt-2 text-xs text-red-600">
                                {errors.URL.message}
                            </p>
                        )}
                    </div>

                    {/* AUTHORIZATION */}
                    <div className="p-5">
                        <Authorization />
                    </div>

                    {/* REQUEST BODY */}
                    {["POST", "PUT", "PATCH"].includes(selectedMethod) && (
                        <div className="p-5">
                            <h3 className="section-title mb-3">
                                Request body
                            </h3>

                            <Controller
                                name="bodyData"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <RequestBodyEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    )}

                    {/* REQUEST HEADERS */}
                    <div className="p-5">
                        <h3 className="section-title mb-3">
                            Headers
                        </h3>

                        <RequestHeaders />
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}

export default MainInputBox;
