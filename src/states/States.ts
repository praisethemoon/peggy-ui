import { hookstate } from "@hookstate/core";
import * as peggy from "peggy";

export const grammarCodeState = hookstate("");
//export const grammarPrefixCodeState = hookstate("");
export const sampleCodeState = hookstate("")



export interface logs  {
    type: "info" | "error" | "warning" | "success";
    message: string,
    location?: peggy.LocationRange,
}

export const logsState = hookstate<logs[]>([{type: "info", message: "Type help if .. you need help"}])

/**
 * React Ace theme options & State
 */
export interface EditorOptionsInterface {
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

const initialEditorOptions: EditorOptionsInterface = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    fontSize:14,
    highlightActiveLine: true,
    mode: "javascript",
    showGutter: true,
    showLineNumbers: true,
    tabSize: 4,
    theme: "github"
}
export const editorOptionsState = hookstate<EditorOptionsInterface>(initialEditorOptions)