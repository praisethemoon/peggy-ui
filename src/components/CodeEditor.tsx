import * as React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export interface EditorProps {
    uioptions: {
        mode: string;
        theme: string;
        fontSize: number;
        showGutter: boolean
        highlightActiveLine: boolean
        enableBasicAutocompletion: boolean,
        enableLiveAutocompletion: boolean,
        enableSnippets: boolean,
        showLineNumbers: boolean,
        tabSize: number,
    }

    onChange: (value: string) => void,
    value: string
}

export const CodeEditor: React.FC<EditorProps> = (props) => {

    return (
        <AceEditor
            width='inherit'
            height='80vh'
            mode={props.uioptions.mode}
            theme={props.uioptions.theme}
            fontSize={props.uioptions.fontSize}
            enableBasicAutocompletion={props.uioptions.enableBasicAutocompletion}
            enableLiveAutocompletion={props.uioptions.enableLiveAutocompletion}
            showGutter={props.uioptions.showGutter}
            highlightActiveLine={props.uioptions.highlightActiveLine}
            enableSnippets={props.uioptions.enableSnippets}
            setOptions={{showLineNumbers: props.uioptions.showLineNumbers,useWorker: false}}
            tabSize={props.uioptions.tabSize}
            onChange={props.onChange}
            value={props.value}
        />
    )
}