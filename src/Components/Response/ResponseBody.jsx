import React from "react";
import { useSelector } from "react-redux";
import Editor from "@monaco-editor/react";

function ResponseBody() {

    const data = useSelector((state) => state.response.data);

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200">
            <Editor
                height="420px"
                language={data ? "json" : "plaintext"}
                theme="light"
                value={data ? JSON.stringify(data, null, 2) : "No response yet"}
                options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    wordWrap: "on",
                    fontSize: 13,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 12, bottom: 12 }
                }}
            />
        </div>
    );
}

export default ResponseBody;
