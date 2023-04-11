import * as React from 'react';

import Editor, { Monaco } from '@monaco-editor/react';
import { useHookstate } from '@hookstate/core';
import { editorOptionsState } from '../states/States';


export interface EditorProps {
    mode?: any;
    onChange: (value: string) => void;
    value: string;
    defaultValue?:string 
}

export const CodeEditor: React.FC<EditorProps> = (props) => {
    const uioptions = useHookstate(editorOptionsState)

    const editorRef = React.useRef<any>(null);

    function handleEditorDidMount(editor: any, monaco: Monaco) {
        editorRef.current = editor;
        monaco.languages.register({id: "peggy"})
    }

    const handleChange = (data: string | undefined) => {
        if (data)
            props.onChange(data)
    }
    return (
        <Editor 
            onMount={handleEditorDidMount}
            onChange={handleChange}
            height={"80vh"}
            theme=''
            defaultLanguage="peggy"
            defaultValue={props.defaultValue || ""}
            
        />
    )
}