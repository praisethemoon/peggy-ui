import { Monaco } from "@monaco-editor/react";
import { grammarLiterals, grammarRuleDefinitionsState } from "../states/GrammarStates";
import { testCodeMonacoState } from "../states/TestCodeStates";

export const setupCustomLanguageMonaco = (monaco: Monaco | null) => {

    if(monaco == null) {
        monaco = testCodeMonacoState.get({ noproxy: true })
        if (monaco == null) {
            return
        }
    }
    monaco.editor.setTheme("cooltheme")


    console.log(monaco)
    console.log(monaco.editor)
    
    /**
     * Setup language ID
     */
    monaco.languages.register({
        id: 'idkbro',
        extensions: ['.idkbro'],
        aliases: ['idkbro'],
        mimetypes: ['text/idkbro'],
    });


    const values = Object.values(grammarLiterals.get()).map(e => `${e}`)
    console.log("highlight literals: ", values)

    monaco.languages.setMonarchTokensProvider('idkbro', {
        keywords: values,
        tokenizer: {
            root: [
                [/[a-zA-Z_$][\w$]*/, { cases: { 
                                   '@keywords': 'keyword',
                                   '@default': 'identifier' } }]
            ]
        }
    });


    monaco.editor.defineTheme('cooltheme', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'identifier', foreground: "0000ff"},
            { token: "keyword", foreground: "DC143C", fontStyle: 'bold'}
        ],
        colors: {
            'editor.background': "#ffffff",
            'editor.lineHighlightBackground': '#eeeeee',
            'editorLineNumber.foreground': '#000000',
        }
    });
    monaco.editor.setTheme("cooltheme")

}