import React, { useId } from "react";
import { useFormContext } from "react-hook-form";

function BasicAuth() {
    const id1 = useId();
    const id2 = useId();
    const {register} = useFormContext();
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
                <label htmlFor={id1} className="field-label">Username</label>

                <input
                    id={id1}
                    type="text"
                    placeholder="Enter username"
                    className="field-input"
                    {...register("auth.username", {
                        required: "Username is required"
                    })}
                />
            </div>

            <div>
                <label htmlFor={id2} className="field-label">Password</label>

                <input
                    id={id2}
                    type="password"
                    placeholder="Enter password"
                    className="field-input"
                    {...register("auth.password", {
                        required: "Password is required"
                    })}
                />
            </div>
        </div>
    );
}

export default BasicAuth;
