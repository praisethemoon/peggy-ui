import { Monaco } from "@monaco-editor/react";
import { grammarLiterals, grammarRuleDefinitionsState } from "../states/GrammarStates";
import { testCodeMonacoState, testCodeTokenColorsState } from "../states/TestCodeStates";

export const setupCustomLanguageMonaco = (monaco: Monaco | null) => {

    if (monaco == null) {
        monaco = testCodeMonacoState.get({ noproxy: true })
        if (monaco == null) {
            return
        }
    }
    monaco.editor.setTheme("cooltheme")

    /**
     * Setup language ID
     */
    monaco.languages.register({
        id: 'idkbro',
        extensions: ['.idkbro'],
        aliases: ['idkbro'],
        mimetypes: ['text/idkbro'],
    });


    const rule_color_map: any = []
    const rule_tokens_map: any = {}

    const cases: any = {
    }

    
    testCodeTokenColorsState.get({noproxy: true}).forEach((e, i) => {
        rule_color_map.push({ token: e.name, foreground: e.color[0]=="#"?e.color.slice(1): e.color, fontStyle: e.bold?"bold": ""})
        rule_tokens_map[e.name] = e.tokens
        cases['@'+e.name] = e.name
    })

    cases['@default'] = 'idenfifier'


    const tokenProviderOptions = {
        ...rule_tokens_map,
        tokenizer: {
            root: [
                [/[a-zA-Z_$][\w$]*/, {
                    cases,
                }]
            ]
        }
    }
    monaco.languages.setMonarchTokensProvider('idkbro', tokenProviderOptions);


    const themeSettings = {
        base: 'vs',
        inherit: true,
        rules: rule_color_map,
        colors: {
            'editor.background': "#ffffff",
            'editor.lineHighlightBackground': '#eeeeee',
            'editorLineNumber.foreground': '#000000',
        }
    }
    console.log(themeSettings)

    monaco.editor.defineTheme('cooltheme', themeSettings);
    monaco.editor.setTheme("cooltheme")


}