import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CodeEditor } from './components/CodeEditor';
import { ParserPane } from './components/ParserPane';
import * as peggy from "peggy";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ReactJson from 'react-json-view';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import TuneIcon from '@mui/icons-material/Tune';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useHookstate } from '@hookstate/core';
import { grammarCodeState, logsState, sampleCodeState } from './states/States';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup';
import Tab from '@mui/material/Tab/Tab';
import { UISettingsModal } from './components/UISettingsModal';

const muitheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

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

    onChange: (value: string, event: any) => void
}

export default function PEGJSEditor() {
    const [currentTab, setCurrentTab] = React.useState("1")
    const [uiModalVisible, setUIModalVisible] = React.useState(false)
    const showUIModal = () => setUIModalVisible(true)
    const hideUIModal = () => setUIModalVisible(false)

    const [result, setResult] = React.useState<any>({})
    const [parser, setParser] = React.useState<peggy.Parser | null>(null)

    // grammar code
    const grammarCode = useHookstate(grammarCodeState);
    const updateGrammarCode = (code: string) => {
        grammarCode.set(code)
    }
    const grammarLog = useHookstate(logsState)

    const addGrammarLogInfo = (stage: peggy.Stage,
        message: string,
        location?: peggy.LocationRange,
        notes?: peggy.DiagnosticNote[]) => {
        grammarLog.merge([{ message, location, type: "info" }])
    }

    const addGrammarLogWarn = (stage: peggy.Stage,
        message: string,
        location?: peggy.LocationRange,
        notes?: peggy.DiagnosticNote[]) => {
        grammarLog.merge([{ message, location, type: "warning" }])
    }
    const addGrammarLogError = (stage: peggy.Stage,
        message: string,
        location?: peggy.LocationRange,
        notes?: peggy.DiagnosticNote[]) => {
        grammarLog.merge([{ message, location, type: "error" }])
    }

    const log = (message: string) => {
        grammarLog.merge([{ message, type: "info" }])
    }

    // sample code
    const sampleCode = useHookstate(sampleCodeState)
    const updateSampleCode = (str: string) => sampleCode.set(str)


    const compileGrammar = () => {
        grammarLog.set([])
        var parser: peggy.Parser | null = null
        setParser(null);
        try {
            parser = peggy.generate(grammarCode.get(), { info: addGrammarLogInfo, warning: addGrammarLogWarn, error: addGrammarLogError, trace: false })
            setParser(parser)
            toast("Grammar parsed", { type: "success", position: "bottom-right" })
        }
        catch (e) {

            if (e instanceof peggy.GrammarError) {
                let excep = e as peggy.GrammarError;
                addGrammarLogError(e.stage as peggy.Stage, getErrorMessage(e), e.location, [])
            }

            else {
                // @ts-ignore
                const location = e.location
                addGrammarLogError({} as peggy.Stage, getErrorMessage(e), location || null, [])
            }

            toast("Couldnt build peggy grammar, please check the logs", { type: "error", position: "bottom-right" })
        }
    }


    const runSample = () => {
        
        var result = null
        setResult({})

        if (parser != null) {
            grammarLog.set([])
            try {
                result = parser.parse(sampleCode.get(), { info: addGrammarLogInfo, warning: addGrammarLogWarn, error: addGrammarLogError, log })
                console.log(result)
                setResult(result)
                logsState.merge([{type: "success", message: `Result: ${result}`}])
                toast("Input parsed", { type: "success", position: "bottom-right" })
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

                toast("Error parsing your input, please check the logs", { type: "error", position: "bottom-right" })
            }

        }
        else {
            addGrammarLogError({} as peggy.Stage, "Cannot run code sample while Grammar is not fixed. Please fix your grammar first", undefined, [])
            toast("Cannot run sample due to invalid grammar. Please check the logs", { type: "error", position: "bottom-right" })
        }
    }

    const downloadParser = () => {
        grammarLog.set([])
        var data: string = ""
        setParser(null);
        try {
            data = peggy.generate(grammarCode.get(), { info: addGrammarLogInfo, warning: addGrammarLogWarn, error: addGrammarLogError, trace: false, output: "source" })
            const blob = new Blob([data], { type: "text/javascript" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "parser.js";
            link.href = url;
            link.click();

            toast("Parser generate and served", { type: "success", position: "bottom-right" })
        }
        catch (e) {

            if (e instanceof peggy.GrammarError) {
                let excep = e as peggy.GrammarError;
                addGrammarLogError(e.stage as peggy.Stage, getErrorMessage(e), e.location, [])
            }

            else {
                // @ts-ignore
                const location = e.location
                addGrammarLogError({} as peggy.Stage, getErrorMessage(e), location || null, [])
            }

            toast("Failed to generate your parser, please check the logs", { type: "error", position: "bottom-right" })
        }
    }

    return (
        <ThemeProvider theme={muitheme}>
            <ToastContainer/>
            <Box display={"flex"} flexDirection={'column'} id="start">
                <Box minWidth={"100%"} textAlign='center' paddingTop={2} height={50}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" color='primary' size='small'>
                        <Button startIcon={<SettingsApplicationsIcon />} onClick={compileGrammar}>Compile Grammar</Button>
                        <Button startIcon={<PlayCircleFilledIcon />} onClick={runSample}>Run Sample</Button>
                    </ButtonGroup>

                    <ButtonGroup variant="contained" aria-label="outlined primary button group" color='primary' size='small' style={{ marginLeft: 20 }}>
                        <Button startIcon={<TuneIcon />} onClick={showUIModal}>UI Options</Button>
                        <Button startIcon={<SystemUpdateAltIcon />} onClick={downloadParser}>Download Parser</Button>
                    </ButtonGroup>
                </Box>
                <UISettingsModal handleClose={hideUIModal} open={uiModalVisible}/>
                <Box style={{ flexGrow: 1 }}>
                    <Grid container spacing={2} >
                        <Grid xs={8} style={{ resize: "vertical" }}>
                            <TabContext value={currentTab} >
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={(e, v) => { setCurrentTab(v) }} centered>
                                        <Tab label="Grammar Code" value="1" />
                                        <Tab label="Sample Code" value="2" />
                                        <Tab label="Sample Output Tree" value="3" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <Box display={"flex"} flexDirection={"column"} flexGrow={1} position={"relative"} minHeight={"90vp"}>
                                        <CodeEditor
                                            value={grammarCode.get()}
                                            onChange={updateGrammarCode}
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel value="2">
                                    <Box>
                                        <CodeEditor
                                            onChange={updateSampleCode}
                                            value={sampleCode.get()}
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel value="3">
                                    <ReactJson onEdit={false} src={result} theme={'bright:inverted'} style={{ maxHeight: "80vh", overflow: "scroll", fontSize: 15 }} />
                                </TabPanel>
                            </TabContext>
                        </Grid>
                        <Grid xs={4} sx={{ height: "inherit" }}>
                            <ParserPane />
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </ThemeProvider>
    );
}
