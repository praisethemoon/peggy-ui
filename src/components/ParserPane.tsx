import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Alert, Box, Grid, Tab } from '@mui/material';
import * as React from 'react';
import { CodeEditor } from './CodeEditor';
import { useHookstate } from '@hookstate/core';
import { grammarCodeState, logsState, sampleCodeState } from '../states/States';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

const about = "peggyjs-ui is simple an advanced ui on top of peggyjs parser to visualize and test your parser. Written by praisethemoon"
const tips = "In your grammar, you can write js code. You can print directly using console.log to the browser's console output, or you can use options.log(\"Hello from anywhere inside the parser\"}). Note that this doesn't have anywhere near console.log. It simply takes one string as argument and prints it on the ui terminal output."

export const ParserPane: React.FC = () => {
    const [currentTab, setCurrentTab] = React.useState("1")
    const logs = useHookstate(logsState);


    const sampleCode = useHookstate(sampleCodeState)
    const grammarCode = useHookstate(grammarCodeState);

    const onInput = (input: string) => {
        if (input.length == 0)
            return
        let ins = input.split(" ");

        if (ins[0] == "help") {
            logs.merge([{ message: "Commands at your disposal\n\t$ tips: Shows a pro-tip\n\t$ p input: displays your sample input\n\t$ p grammar: displays your grammar.\n\t$ help: Displays this.\n\t$ about: Information about this tool\n\t$ clear: clears the terminal", type: "info", location: undefined }])
        }
        if (ins[0] == "clear") {
            logs.set([])
        }
        if (ins[0] == "about") {
            logs.merge([{ type: "info", message: about }])
        }

        if (ins[0] == "tips") {
            logs.merge([{ type: "info", message: tips }])
        }
        
        if (ins.length > 1) {
            if (ins[0] == "p" && ins[1] == "grammar") {
                logs.set([{ type: "info", message: grammarCode.get() }])
            }
            if (ins[0] == "p" && ins[1] == "input") {
                logs.set([{ type: "info", message: sampleCode.get() }])
            }
        }
    }

    const colors = {
        "info": "unset", "error": "red", "warning": "orange", "success": "green"
    }

    return (
        <TabContext value={currentTab}>
            <Grid container width={"100%"} style={{ whiteSpace: "pre-wrap" }}>
                <Terminal name='Terminal & Logs' colorMode={ColorMode.Dark} prompt='$' onInput={onInput} height='80vh'>
                    {logs.get().map((e, i) => (
                        <p key={i} style={{ margin: 0, padding: 0, color: colors[e.type], fontWeight: (e.type == "error" || e.type =="success") ? "bold" : "lighter" }}>
                            {e.location != null ? `line ${e.location?.start.line || 0}, col ${e.location?.start.column || 0}: ${e.message} \n` : `${e.message} \n`}
                        </p>

                    ))}
                </Terminal>
            </Grid>
        </TabContext>
    )
}