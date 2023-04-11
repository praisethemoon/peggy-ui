import * as React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";

import 'ace-builds/src-noconflict/theme-ambiance';
import 'ace-builds/src-noconflict/theme-chaos';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-cloud9_day';
import 'ace-builds/src-noconflict/theme-cloud9_night';
import 'ace-builds/src-noconflict/theme-cloud9_night_low_color';
import 'ace-builds/src-noconflict/theme-clouds';
import 'ace-builds/src-noconflict/theme-clouds_midnight';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-crimson_editor';
import 'ace-builds/src-noconflict/theme-dawn';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-dreamweaver';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-gob';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'ace-builds/src-noconflict/theme-gruvbox_dark_hard';
import 'ace-builds/src-noconflict/theme-gruvbox_light_hard';
import 'ace-builds/src-noconflict/theme-idle_fingers';
import 'ace-builds/src-noconflict/theme-iplastic';
import 'ace-builds/src-noconflict/theme-katzenmilch';
import 'ace-builds/src-noconflict/theme-kr_theme';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-merbivore';
import 'ace-builds/src-noconflict/theme-merbivore_soft';
import 'ace-builds/src-noconflict/theme-mono_industrial';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-nord_dark';
import 'ace-builds/src-noconflict/theme-one_dark';
import 'ace-builds/src-noconflict/theme-pastel_on_dark';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-sqlserver';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue';
import 'ace-builds/src-noconflict/theme-tomorrow_night_bright';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-vibrant_ink';
import 'ace-builds/src-noconflict/theme-xcode';

import "ace-builds/src-noconflict/ext-language_tools";
import { useHookstate } from '@hookstate/core';
import { editorOptionsState } from '../states/States';



export interface EditorProps {
    mode?: any;
    onChange: (value: string) => void;
    value: string;
}

export const CodeEditor: React.FC<EditorProps> = (props) => {
    //const editorRef = React.useRef(null);
    const uioptions = useHookstate(editorOptionsState)

    /*
    const handleEditorLoad = (editor: any) => {
        editorRef.current = editor;
        editor.getSession().setMode(props.mode || uioptions.mode.get());
    };*/


    return (
        <AceEditor
            //onLoad={handleEditorLoad}
            width='inherit'
            height='85vh'
            mode={"javascript"}
            theme={uioptions.theme.get()}
            fontSize={uioptions.fontSize.get()}
            enableBasicAutocompletion={uioptions.enableBasicAutocompletion.get()}
            enableLiveAutocompletion={uioptions.enableLiveAutocompletion.get()}
            showGutter={uioptions.showGutter.get()}
            wrapEnabled={true}
            highlightActiveLine={uioptions.highlightActiveLine.get()}
            enableSnippets={uioptions.enableSnippets.get()}
            setOptions={{ showLineNumbers: uioptions.showLineNumbers.get(), useWorker: false }}
            editorProps={{ $blockScrolling: true, }}
            tabSize={uioptions.tabSize.get()}
            onChange={props.onChange}
            value={props.value}
        />
    )
}