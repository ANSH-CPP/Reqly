import React from "react";
import { useState } from "react";
import ApiKey from "./ApiKey";
import BasicAuth from "./BasicAuth";
import BearerToken from "./BearerToken";
import OAuth2 from "./OAuth2";
import { useFormContext } from "react-hook-form";

function Authorization(){

    // value = what is stored in the form, label = what the user sees
    const authType = [
        { value: "none",   label: "None" },
        { value: "apiKey", label: "API Key" },
        { value: "bearer", label: "Bearer Token" },
        { value: "basic",  label: "Basic Auth" },
        { value: "oauth2", label: "OAuth 2.0" }
    ]

    const {register, watch} = useFormContext();
    const type = watch("auth.type")
    return(
        <div>


            <div className="flex items-center justify-between gap-4">
                <h2 className="section-title">Authorization</h2>
                <select
                className="field-input w-44"
                aria-label="Authorization type"
                {...register("auth.type")}
                >
                    {authType.map((it)=>{
                        return(
                            <option key={it.value} value={it.value}>
                                {it.label}
                            </option>
                        )
                    })}
                </select>
            </div>


            <div className="mt-4 empty:hidden">
                {type === "apiKey" && <ApiKey
                />}


                {type === "bearer" && <BearerToken
                />}



                {type === "basic" && <BasicAuth
                />}



                {type === "oauth2" && <OAuth2
                />}
            </div>


        </div>
    )
}


export default Authorization;
