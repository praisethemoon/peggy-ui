import { Monaco } from "@monaco-editor/react";
import { grammarRuleDefinitionsState } from "../states/GrammarStates";

export const registerPeggyForMonaco = (editor: any, monaco: Monaco) => {
    monaco.editor.setTheme('peggy-light');

    /**
     * Setup language ID
     */
    monaco.languages.register({ id: 'peggyjs' });



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
                { include: 'common' },
                { include: '@whitespace' },
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
            ],
            common: [
                // identifiers and keywords

                [/[A-Z][\w\$]*/, 'type.identifier'],  // to show class names nicely
                // [/[A-Z][\w\$]*/, 'identifier'],

                // whitespace
                { include: '@whitespace' },

                // regular expression: ensure it is terminated before beginning (otherwise it is an opeator)

                // delimiters and operators
                [/[()\[\]]/, '@brackets'],
                [/[<>](?!@symbols)/, '@brackets'],


                // numbers


                // delimiter: after number because of .\d floats
                [/[;,.]/, 'delimiter'],

                // strings
                [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                [/"/, 'string', '@string_double'],
                [/'/, 'string', '@string_single'],
            ],

            whitespace: [
                [/[ \t\r\n]+/, ''],
                [/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'],
                [/\/\*/, 'comment', '@comment'],
                [/\/\/.*$/, 'comment'],
            ],

            comment: [
                [/[^\/*]+/, 'comment'],
                [/\*\//, 'comment', '@pop'],
                [/[\/*]/, 'comment']
            ],

            jsdoc: [
                [/[^\/*]+/, 'comment.doc'],
                [/\*\//, 'comment.doc', '@pop'],
                [/[\/*]/, 'comment.doc']
            ],

            // We match regular expression quite precisely


            string_double: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, 'string', '@pop']
            ],

            string_single: [
                [/[^\\']+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/'/, 'string', '@pop']
            ],

            bracketCounting: [
                [/\{/, 'delimiter.bracket', '@bracketCounting'],
                [/\}/, 'delimiter.bracket', '@pop'],
                { include: 'common' }
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
            { token: 'comment', foreground: 'ff0000' },
            { token: 'rule-name', foreground: '0000ff', fontStyle: 'bold' },
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