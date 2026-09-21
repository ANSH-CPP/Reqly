// import React,{useState, useId} from "react";
// import { useFormContext } from "react-hook-form";


// function ApiKey(){

//     const {register, watch} = useFormContext();
//     const id1 = useId()
//     const id2 = useId()
//     const id3 = useId()
//     const id4 = useId()

//     // const key = watch("authKey")
//     // const value = watch("authValue")
//     // console.log("Key: ", key)
//     // console.log("Value: ",value)

//     const location = ["Header", "Query Parameter"];
//     const seeLocation = watch("locationOfApiKey")
//     return (
//         <div>
//             <h3>Api Key</h3>

//             <div>
//                 <select
//                 {...register("locationOfApiKey")}
//                 >
//                     {location.map((it)=>(
//                         <option key={it} value={it}>{it}</option>
//                     ))}
//                 </select>
//             </div>
            





//             {seeLocation=="Header" && 

//                 <div>

//                     <div> 
//                         <label htmlFor={id1}>Key</label>

//                         <input
//                             id={id1} 
//                             placeholder="X-API-Key"
//                             type="text"
//                             {...register("auth.key",{
//                                 required: "key is required",
//                                 validate: {
//                                     matchPattern: (value) =>
//                                         /^[A-Za-z0-9-]+$/.test(value)
//                                         || "Enter Valid URL"
//                                 }
//                             })} 
//                         />


//                     </div>

//                     <div>
//                         <label htmlFor={id2}>Value</label>
//                         <input
//                             id={id2} 
//                             placeholder="Enter API Key"
//                             type="password"
//                             {...register("auth.value",{
//                                 required: "Enter API Key"
//                             })} 
//                         />
//                     </div>

//                 </div>

//             }
        


//             {seeLocation == "Query Parameter" && 
//                 <div>
//                     <div>
//                         <label htmlFor={id3}>Parameter Name</label>
//                         <input
//                             id={id3} 
//                             placeholder="api_key"
//                             type="text"
//                             {...register("auth.parameter",{
//                                 required: "Enter Parameter"
//                             })} 
//                         />
//                     </div>
                    

//                     <div>
//                         <label htmlFor={id4}>Value</label>
//                         <input
//                             id={id4} 
//                             placeholder="Enter API Key"
//                             type="password"
//                             {...register("auth.value",{
//                                 required: "Enter API Key"
//                             })} 
//                         />
//                     </div>
                    

//                 </div>
//             }

//         <div/>
//     )
// }

// export default ApiKey;


import React, { useId } from "react";
import { useFormContext } from "react-hook-form";

function ApiKey() {
    const { register, watch } = useFormContext();

    const id0 = useId();
    const id1 = useId();
    const id2 = useId();
    const id3 = useId();
    const id4 = useId();

    const location = ["Header", "Query Parameter"];

    const seeLocation = watch("auth.location");

    return (
        <div className="space-y-4">

            <div>
                <label htmlFor={id0} className="field-label">
                    Add to
                </label>

                <select
                    id={id0}
                    className="field-input"
                    {...register("auth.location")}
                >
                    {location.map((it) => (
                        <option key={it} value={it}>
                            {it}
                        </option>
                    ))}
                </select>
            </div>

            {/* Header */}
            {seeLocation === "Header" && (
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor={id1} className="field-label">Key</label>

                        <input
                            id={id1}
                            type="text"
                            placeholder="X-API-Key"
                            className="field-input"
                            {...register("auth.key", {
                                required: "Key is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^[A-Za-z0-9-]+$/.test(value) ||
                                        "Enter valid key name"
                                }
                            })}
                        />
                    </div>

                    <div>
                        <label htmlFor={id2} className="field-label">Value</label>

                        <input
                            id={id2}
                            type="password"
                            placeholder="Enter API Key"
                            className="field-input"
                            {...register("auth.value", {
                                required: "Enter API Key"
                            })}
                        />
                    </div>
                </div>
            )}

            {/* Query Parameter */}
            {seeLocation === "Query Parameter" && (
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor={id3} className="field-label">
                            Parameter Name
                        </label>

                        <input
                            id={id3}
                            type="text"
                            placeholder="api_key"
                            className="field-input"
                            {...register("auth.parameter", {
                                required: "Enter Parameter"
                            })}
                        />
                    </div>

                    <div>
                        <label htmlFor={id4} className="field-label">Value</label>

                        <input
                            id={id4}
                            type="password"
                            placeholder="Enter API Key"
                            className="field-input"
                            {...register("auth.value", {
                                required: "Enter API Key"
                            })}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApiKey;
