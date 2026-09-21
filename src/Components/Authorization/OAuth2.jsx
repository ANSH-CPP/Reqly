import React, { useId } from "react";
import { useFormContext } from "react-hook-form";

function OAuth2() {
    const id1 = useId();
    const id2 = useId();
    const id3 = useId();

    const { register } = useFormContext();

    return (
        <div className="space-y-4">

            <div>
                <label htmlFor={id1} className="field-label">Token URL</label>

                <input
                    type="text"
                    id={id1}
                    placeholder="Enter OAuth Token URL"
                    className="field-input"
                    {...register("auth.tokenURL", {
                        required: "Enter OAuth2 Token URL"
                    })}
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

                <div>
                    <label htmlFor={id2} className="field-label">Client ID</label>

                    <input
                        type="text"
                        id={id2}
                        placeholder="Enter Client ID"
                        className="field-input"
                        {...register("auth.clientID", {
                            required: "Enter Client ID"
                        })}
                    />
                </div>

                <div>
                    <label htmlFor={id3} className="field-label">Client Secret</label>

                    <input
                        type="password"
                        id={id3}
                        placeholder="Enter Client Secret"
                        className="field-input"
                        {...register("auth.clientSecret", {
                            required: "Enter Client Secret"
                        })}
                    />
                </div>

            </div>
        </div>
    );
}

export default OAuth2;
