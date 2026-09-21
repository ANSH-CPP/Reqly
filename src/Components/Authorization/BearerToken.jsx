import React, {useState, useId} from "react";
import { useFormContext } from "react-hook-form";

function BearerToken(){
    const id = useId()
    const {register} = useFormContext();

    return(
        <div>
            <label htmlFor={id} className="field-label">
                Token
            </label>

            <input type="password"
            id={id}
            placeholder="Enter Bearer Token"
            className="field-input"
            {...register('auth.token',{
                required: "Enter Token"
                }
            )}
            />
        </div>
    )
}

export default BearerToken;
