import React from "react";
import Editor, { Monaco } from "@monaco-editor/react";

export const CodeEditor: React.FC<{
    w?: number,
    h?: number,
    language: string,
    value: string,
    onChange: (data: string | undefined) => void,
    setUpMonaco: (editor: any, monaco: Monaco) => any
}> = ({ w, h, language, onChange, setUpMonaco, value }) => {
    const editorRef = React.useRef<any>(null);
    const monacoRef = React.useRef<any>(null);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        monacoRef.current = monaco;
        editorRef.current = editor;

        setUpMonaco(editor, monaco)
    };

    return (
        <Editor
            height={h}
            width={w}
            language={language}
            defaultLanguage={language}
            defaultValue={value}
            options={{
                automaticLayout: true,
            }}
            value={value}
            onChange={onChange}
            onMount={handleEditorDidMount}
        />
    );
};
