import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

function RequestHeaders() {

    const { register, control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "requestHeaders"
    });

    return (
        <div>

            <div className="space-y-2">

                {fields.map((field, index) => (

                    <div
                        key={field.id}
                        className="grid grid-cols-[1fr_1fr_auto] items-center gap-2"
                    >

                        <div>
                            <input
                                type="text"
                                placeholder="Header"
                                className="field-input"
                                {...register(`requestHeaders.${index}.name`)}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Value"
                                className="field-input"
                                {...register(`requestHeaders.${index}.value`)}
                            />
                        </div>

                        <div>
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => remove(index)}
                            >
                                Remove
                            </button>
                        </div>

                    </div>

                ))}

            </div>

            <div className={fields.length > 0 ? "mt-3" : ""}>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                        append({
                            name: "",
                            value: ""
                        })
                    }
                >
                    + Add Header
                </button>
            </div>

        </div>
    );
}

export default RequestHeaders;
