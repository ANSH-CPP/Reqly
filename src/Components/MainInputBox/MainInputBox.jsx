// import React from "react";
// import {useForm, FormProvider, Controller} from "react-hook-form"
// import { Functions } from "appwrite";
// import { functions } from "../../Appwrite/Appwrite";
// import Authorization from "../Authorization/Authorization";
// import RequestBodyEditor from "./RequestBodyEditor";
// import { useDispatch } from "react-redux";
// import { setResponse } from "../../Store/responseSlice";
// import RequestHeaders from "./RequestHeaders";
// import { addHistory } from "../../Store/historySlice";
// function MainInputBox(){
//     // const {register, handleSubmit, formState: {errors}} = useForm();

//     // const [header, setHeader] = useForm({});

//     const methods = useForm();
//     const {handleSubmit, register, formState:{errors}, watch, control} = methods;
//     const dispatch = useDispatch();








//     const handelCheck = async(data)=>{
//         alert("Submit working");
//         console.log("Form Data: ",data);
//         let header = {};

//         data.requestHeaders?.forEach((item) => {
//             if (item.name && item.value) {
//                 header[item.name] = item.value;
//             }
//         });
//         console.log("Headers after manual headers:", header);

//         if(data.auth?.type === 'apiKey'){
//             if(data.auth.location === 'Header'){
//                 header[data.auth.key] = data.auth.value;  
//             }   
//         }
//         else if(data.auth?.type === 'basic'){
//             const credentials = `${data.auth.username}:${data.auth.password}`;

//             const encodedCredentials = btoa(credentials);
//             header.Authorization = `Basic ${encodedCredentials}`;
//         }
//         else if(data.auth?.type === 'bearer'){
//             header.Authorization = `Bearer ${data.auth.token}`;
//         }
//         else if(data.auth?.type === 'oauth2'){

//         }














//         console.log("header", header);

//         try{
//             const result = await functions.createExecution({
//                 functionId: import.meta.env.VITE_APPWRITE_FUNCTION_ID,
//                 body: JSON.stringify({
//                     url: data.URL,
//                     method: data.method,
//                     //this auth is passed for sending auth data to appwrite as auth data is used for OAuth2 for finding token
//                     auth :data.auth,
//                     headers : header,
//                     location : data.auth.location,
//                     bodyData: data.bodyData
//                 }),
//                 async:false
//             });
//             // console.log("Appwrite Result", result);
//         //    console.log("Appwrite Result:", result);
//         //     console.log("Response Body:", result.responseBody);

//             const response = JSON.parse(result.responseBody);

//             console.log("API Response:", response);

//             dispatch(setResponse(response))

//             dispatch(addHistory({
//                 method: formData.method,
//                 url: formData.URL,
//                 headers: header,
//                 auth: formData.auth,
//                 body: bodyData,

//                 status: result.status,
//                 statusText: result.statusText,
//                 responseTime: result.responseTime,

//                 createdAt: new Date().toISOString()
//             }));
//         }   
//         catch(error){
//             console.error(error);
//         }
//     }

















//     let request = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    
//     const selectedMethod = watch("method");

//     return (

//         <FormProvider {...methods}>
//             <div>
//                 {/* <form onSubmit={handleSubmit(handelCheck)}> */}
//                 {/* <form onSubmit={(e) => {
//                     e.preventDefault();
//                     alert("FORM SUBMIT WORKING");
//                 }}> */}
//                 <form
//                     onSubmit={handleSubmit(handelCheck, (errors) => {
//                         console.log("FORM ERRORS:", errors);
//                     })}
//                 >

//                     <div>
//                         <select {...register("method")}>
//                             {request.map((it)=>{
//                                 return (
//                                     <option key={it} value={it}> {it} </option >
//                                 )
//                             })}
//                         </select>
//                     </div>



//                     <div>
//                         {errors.URL && (
//                             <p>{errors.URL.message}</p>
//                         )}

//                         <input
//                             label = "URL: "
//                             placeholder="Enter URL"
//                             type="text"
//                             {...register("URL",{
//                                 required: "URL is required",
//                                 // validate: {
//                                 //     matchPattern: (value) =>
//                                 //         /^https?:\/\/.+$/.test(value)
//                                 //         || "Enter Valid URL"
//                                 // }
//                             })} 
//                         />

//                         <button type="submit">
//                             SEND
//                         </button>
//                     </div>


//                     {/* <div>
//                         <input 
//                         label="header"
//                         type="text" 
//                         placeholder="Enter Header if any"
//                         {...register("header",{
//                             required: 0,
//                             validate: {
//                                 matchPattern: (value) => 
//                             }
//                         })}
//                         />
//                     </div> */}

//                     <div>
//                         <Authorization/>
//                     </div>

//                     <div>
//                         {["POST", "PUT", "PATCH"].includes(selectedMethod) && (
//                             <Controller
//                             name="bodyData"
//                             control= {control}
//                             defaultValue=""
//                             render={({field})=>(
//                                 <RequestBodyEditor
//                                 value={field.value}
//                                 onChange={field.onChange}
//                                 />
//                             )}
//                             />
//                         )}
//                     </div>



//                     <div>
//                         <RequestHeaders />
//                     </div>
//                 </form>


                
//             </div>
//         </FormProvider>
        
//     )
// }

// export default MainInputBox


import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { functions } from "../../Appwrite/Appwrite";
import Authorization from "../Authorization/Authorization";
import RequestBodyEditor from "./RequestBodyEditor";
import { useDispatch } from "react-redux";
import { setResponse } from "../../Store/responseSlice";
import RequestHeaders from "./RequestHeaders";
import { addHistory } from "../../Store/historySlice";
import { buildHeaders } from "../Services/RequestServices";
function MainInputBox() {

    const methods = useForm();

    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        control
    } = methods;

    const dispatch = useDispatch();

    const handelCheck = async (data) => {

        alert("Submit working");

        console.log("Form Data: ", data);

        // Build all headers
        const header = buildHeaders(data);

        console.log("Headers:", header);

        try {

            // Send request to Appwrite Function
            const result = await functions.createExecution({
                functionId: import.meta.env.VITE_APPWRITE_FUNCTION_ID,

                body: JSON.stringify({
                    url: data.URL,
                    method: data.method,

                    // Auth data is passed to Appwrite
                    // because OAuth2 is handled there
                    auth: data.auth,

                    headers: header,

                    location: data.auth?.location,

                    bodyData: data.bodyData
                }),

                async: false
            });

            console.log("Appwrite Result:", result);

            // Convert Appwrite response into JS object
            const response = JSON.parse(result.responseBody);

            console.log("API Response:", response);

            // Store API response in Redux
            dispatch(setResponse(response));


            // Store request history in Redux
            dispatch(addHistory({
                method: data.method,
                url: data.URL,
                headers: header,
                auth: data.auth,
                body: data.bodyData,

                status: response.status,
                statusText: response.statusText,
                responseTime: response.responseTime,

                createdAt: new Date().toISOString()
            }));

        }
        catch (error) {

            console.error("Request Error:", error);

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
                    <h2 className="section-title">Request</h2>
                </div>


                <form
                    className="divide-y divide-gray-200"
                    onSubmit={handleSubmit(
                        handelCheck,
                        (errors) => {
                            console.log(
                                "FORM ERRORS:",
                                errors
                            );
                        }
                    )}
                >

                    {/* METHOD + URL + SEND */}

                    <div className="p-5">

                        <div className="flex gap-2">

                            <div className="flex min-w-0 flex-1 rounded-lg border border-gray-300 bg-white transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">

                                {/* METHOD */}

                                <div>

                                    <select
                                        aria-label="HTTP method"
                                        className="cursor-pointer rounded-l-lg border-r border-gray-300 bg-gray-50 py-2.5 pr-2 pl-3 text-sm font-semibold text-gray-700 outline-none"
                                        {...register("method")}
                                    >

                                        {request.map((it) => {

                                            return (
                                                <option
                                                    key={it}
                                                    value={it}
                                                >
                                                    {it}
                                                </option>
                                            );

                                        })}

                                    </select>

                                </div>


                                {/* URL */}

                                <div className="min-w-0 flex-1">

                                    <input
                                        className="w-full bg-transparent px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                        label="URL: "
                                        placeholder="Enter URL"
                                        type="text"

                                        {...register("URL", {
                                            required: "URL is required"
                                        })}

                                    />

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary px-5"
                            >
                                Send
                            </button>

                        </div>

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

                    {["POST", "PUT", "PATCH"].includes(
                        selectedMethod
                    ) && (

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
