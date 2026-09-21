import { Editor } from "@monaco-editor/react";


function RequestBodyEditor({value, onChange}){
    return(
        <div className="overflow-hidden rounded-lg border border-gray-200">
            <Editor
                height="320px"
                defaultLanguage="json"
                theme="light"
                value={value}
                onChange={(value) => onChange(value || "")}
                options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 12, bottom: 12 }
                }}
            />
        </div>
    )
}

export default RequestBodyEditor;
