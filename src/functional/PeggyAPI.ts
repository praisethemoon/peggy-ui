import * as peggy from 'peggy'

// grammar code
import { GrammarAction, grammarActionsState, grammarDiagramsStates, grammarPeggyCodeState, grammarRuleDefinitionsState, parserState } from '../states/GrammarStates'
import { terminalLogsState } from '../states/TerminalLogsState'
import { createDiagram, makeDiagram } from './ASTToRailroadDiagram'
import { testCodeResult, testCodeState } from '../states/TestCodeStates';

/**
 * helper functions and peggyjs callbacks
 */

function traverseAst(node: any, callback: any) {
    callback(node);
    if (node.type === "rule" && node.expression.type === "action") {
        callback(node.expression);
    }
    if (node.type === "choice") {
        node.alternatives.forEach((alternative: any) => {
            traverseAst(alternative, callback);
        });
    } else if (node.expression) {
        traverseAst(node.expression, callback);
    }
}

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}


const addGrammarLogInfo = (stage: peggy.Stage,
    message: string,
    location?: peggy.LocationRange,
    notes?: peggy.DiagnosticNote[]) => {
    terminalLogsState.merge([{ message, location, type: "info" }])
}

const addGrammarLogWarn = (stage: peggy.Stage,
    message: string,
    location?: peggy.LocationRange,
    notes?: peggy.DiagnosticNote[]) => {
    terminalLogsState.merge([{ message, location, type: "warning" }])
}
const addGrammarLogError = (stage: peggy.Stage,
    message: string,
    location?: peggy.LocationRange,
    notes?: peggy.DiagnosticNote[]) => {
    terminalLogsState.merge([{ message, location, type: "error" }])
}

const log = (message: string) => {
    terminalLogsState.merge([{ message, type: "info" }])
}

export const compilePeggyGrammar = () => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString('en-US', { hour12: true })
    let success = true // hope for the best xD

    log(`Compilation started at ${formattedDateTime}`)

    try {
        const raw_code = grammarPeggyCodeState.get()
        const parser = peggy.generate(raw_code, { info: addGrammarLogInfo, warning: addGrammarLogWarn, error: addGrammarLogError, trace: false })
        terminalLogsState.merge([{ message: "Grammar compiled 👌", type: "success" }])
        parserState.set(parser)

        const ast = peggy.generate(raw_code, { output: "ast" })

        // updating grammar state objects
        grammarRuleDefinitionsState.set(ast.rules.map(e => ({ name: e.name, location: e.location, comment: ((e?.expression?.type === "named") ? (e.expression.name || "") : ("")) })))

        // creating diagrams
        let diagrams = ast.rules.map(rule => createDiagram(rule, ast))
        diagrams = diagrams.map((d, i) => makeDiagram(d, ast, i))
        grammarDiagramsStates.set(diagrams.map(e => e.toString()))

        const actions: GrammarAction[] = []
        ast.rules.forEach(rule => {
            traverseAst(rule, (node: any) => {
                if (node.type === "action") {
                    console.log(node)
                    actions.push({ code: node.code, location: node.location });
                }
            });
        })

        grammarActionsState.set(actions);
    }

    catch (e) {
        console.trace(e)
        success = false
        if (e instanceof peggy.GrammarError) {
            let excep = e as peggy.GrammarError;
            addGrammarLogError(e.stage as peggy.Stage, getErrorMessage(e), e.location, [])
        }
        else {
            // @ts-ignore
            const location = e.location
            addGrammarLogError({} as peggy.Stage, getErrorMessage(e), location || null, [])
        }
    }
}


export const runSample = () => {
    const parser = parserState.get({ noproxy: true })

    if (parser == undefined) {
        terminalLogsState.merge([{ message: "Grammar was not built, please build grammar first", type: "error" }])
        return
    }

    try {
        const res = parser.parse(testCodeState.get(), { info: addGrammarLogInfo, warning: addGrammarLogWarn, error: addGrammarLogError, log })
        testCodeResult.set(res)
        terminalLogsState.merge([{ type: "success", message: `Result: ${res}` }])
    }
    catch (e) {
        if (e instanceof peggy.GrammarError) {
            let excep = e as peggy.GrammarError;
            addGrammarLogError(e.stage as peggy.Stage, getErrorMessage(e), e.location, [])
        }

        else {
            // @ts-ignore
            const location = e.location
            addGrammarLogError({} as peggy.Stage, getErrorMessage(e), location || undefined, [])
        }
    }
}

export const downloadParser = () => {
    const data = peggy.generate(grammarPeggyCodeState.get(), { info: addGrammarLogInfo, warning: addGrammarLogWarn, error: addGrammarLogError, trace: false, output: "source" })
    const blob = new Blob([data], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "parser.js";
    link.href = url;
    link.click();
    terminalLogsState.merge([{ message: "Grammar was clipped and shipped! Have fun!", type: "success" }])
}