import { Monaco } from "@monaco-editor/react";
import { grammarRuleDefinitionsState } from "../states/GrammarStates";

export const registerPeggyForMonaco = (editor: any, monaco: Monaco) => {
    monaco.editor.setTheme('peggy-light');

    /**
     * Setup language ID
     */
    monaco.languages.register({ id: 'peggyjs' });

    /**
     * Basics 
     */
    monaco.languages.setLanguageConfiguration('peggyjs', {
        comments: {
            lineComment: '//',
            blockComment: ['/*', '*/']
        },
        brackets: [['(', ')'], ['[', ']'], ['{', '}']],
        autoClosingPairs: [
            { open: '(', close: ')' },
            { open: '[', close: ']' },
            { open: '{', close: '}' },
            { open: "'", close: "'", notIn: ['string'] },
            { open: '"', close: '"', notIn: ['string'] }
        ]
    });

    /**
     * Tokenizer
     * TODO: handle js-in-peggy better
     */
    monaco.languages.setMonarchTokensProvider('peggyjs', {
        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        comments: {
            lineComment: '//',
            blockComment: ['/*', '*/']
          },
        // C# style strings
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        tokenizer: {
            root: [
                {
                    // Match rule names 
                    regex: /([a-zA-Z_][a-zA-Z0-9_]*)?=[\s\n\r]*=/,
                    action: {
                        token: 'rule-name'
                    }
                },
                {
                    // Match rule names 
                    regex: /^[\s]*([a-zA-Z_][a-zA-Z0-9_]*)[\s]*$/,
                    action: {
                        token: 'rule-name'
                    }
                },
                {
                    // Match rule names 
                    regex: /^("(?:\\.|[^\\"])*")/,
                    action: {
                        token: 'rule-comment'
                    }
                },
                {
                    // Match aliases 
                    regex: /alias:([a-zA-Z_][a-zA-Z0-9_]*)/,
                    action: {
                        token: 'alias-name'
                    }
                },
                {
                    // Match JS code blocks
                    regex: /{/,
                    action: { token: 'js-start' },
                    next: 'js'
                },
                [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
            ],
            js: [
                {
                    regex: /}/,
                    action: { token: 'js-end' },
                    next: 'root'
                },
                {
                    regex: /./,
                    action: { token: 'javascript' }
                }
            ],
            comment: [
                [/[^\/*]+/, 'comment'],
                [/\/\*/, 'comment', '@push'],    // nested comment
                ["\\*/", 'comment', '@pop'],
                [/[\/*]/, 'comment']
            ],

            string: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
            ],

            whitespace: [
                [/[ \t\r\n]+/, 'white'],
                [/\/\*/, 'comment', '@comment'],
                [/\/\/.*$/, 'comment'],
            ],
        }
    });
    /**
         * Theme:
         */
    monaco.editor.defineTheme('peggy-light', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'comment', foreground: 'cccccc' },
            { token: 'rule-name', foreground: '000000', fontStyle: 'bold' },
            { token: 'rule-comment', foreground: '990000', fontStyle: 'bold' },
            { token: 'alias-name', foreground: 'E5C07B' },
            { token: 'rule-name-multiline', foreground: "ff0000" }
        ],
        colors: {
            'editor.background': "#ffffff",
            'editor.lineHighlightBackground': '#eeeeee',
            'editorLineNumber.foreground': '#000000',
        }
    });


    monaco.editor.setTheme('peggy-light');


    /**
     * Auto completion support
     */
    monaco.languages.registerCompletionItemProvider('peggyjs', {
        // @ts-ignore
        provideCompletionItems: function (model, position) {
            // get the text until the current position
            const textUntilPosition = model.getValueInRange({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column
            });

            // get the word at the current position
            const wordAtPosition = model.getWordAtPosition(position);
            // if the user has typed the beginning of a rule
            //if (wordAtPosition){
            const suggestions = grammarRuleDefinitionsState.get().filter(rule => rule.name.startsWith(wordAtPosition?.word || ''));

            return {
                suggestions: suggestions.map(suggestion => {
                    return {
                        label: suggestion.name,
                        detail: suggestion.comment,
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: suggestion.name
                    };
                })
            };
        }
    });

    /**
     * Jump to definition support
     */
    monaco.languages.registerDefinitionProvider('peggyjs', {
        provideDefinition: function (model: any, position: any, token: any) {

            const tokenValue = model.getWordAtPosition(position)?.word;
            if (!tokenValue) {
                return
            }

            const candidates = grammarRuleDefinitionsState.get().filter(rule => rule.name == tokenValue);
            if (candidates.length > 0) {
                return {
                    uri: model.uri,
                    range: {
                        startLineNumber: candidates[0].location.start.line,
                        startColumn: candidates[0].location.start.column,
                        endLineNumber: candidates[0].location.end.line,
                        endColumn: candidates[0].location.end.line
                    }
                }
            }
        }
    })
}