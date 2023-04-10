import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataObject } from '@mui/icons-material';
import { Tooltip, IconButton, Avatar, Menu, MenuItem, Tab, ButtonGroup, Divider } from '@mui/material';
import { CodeEditor } from './components/CodeEditor';
import { ParserPane } from './components/ParserPane';
import * as peggy from "peggy";
import { Alert } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ReactJson from 'react-json-view';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import TuneIcon from '@mui/icons-material/Tune';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

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
    const [mode, setMode] = React.useState("javascript")
    const [theme, setTheme] = React.useState("github")
    const [fontSize, setFontSize] = React.useState(14)
    const [showGutter, setShowGutter] = React.useState(true)
    const [highlightActiveLine, setHighlightActiveLine] = React.useState(true)
    const [enableBasicAutocompletion, setEnableBasicAutocompletion] = React.useState(true)
    const [enableLiveAutocompletion, setEnableLiveAutocompletion] = React.useState(true)
    const [enableSnippets, setEnableSnippets] = React.useState(true)
    const [showLineNumbers, setShowLineNumbers] = React.useState(true)
    const [tabSize, setTabSize] = React.useState(4)

    const [grammarCode, setGrammarCode] = React.useState("")

    const [grammarError, setGrammarError] = React.useState("")
    const [sampleError, setSampleError] = React.useState("")

    const [sampleCode, setSampleCode] = React.useState("")
    const [result, setResult] = React.useState<any>({})

    const [parser, setParser] = React.useState<peggy.Parser | null>(null)

    const compileGrammar = () => {
        setGrammarError("")
        var parser: peggy.Parser | null = null
        setParser(null);
        try {
            parser = peggy.generate(grammarCode)
            setParser(parser)
        }
        catch (e) {
            // TODO: show line numbers
            console.log(e);
            setGrammarError(getErrorMessage(e))
        }
    }

    const runSample = () => {
        setSampleError("")
        var result = null
        setResult({})

        if (parser != null) {
            try {
                result = parser.parse(sampleCode);
                setResult(result)
            }
            catch (e) {
                setSampleError(getErrorMessage(e))
            }

        }

    }


    return (
        <ThemeProvider theme={muitheme}>
            <CssBaseline />
            <Box minWidth={"100%"} textAlign='center' paddingTop={2}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" color='primary' size='small'>
                    <Button startIcon={<SettingsApplicationsIcon />} onClick={compileGrammar}>Compile Grammar</Button>
                    <Button startIcon={<PlayCircleFilledIcon />} onClick={runSample}>Run Sample</Button>
                </ButtonGroup>

                <ButtonGroup variant="contained" aria-label="outlined primary button group" color='primary' size='small' style={{ marginLeft: 20 }}>
                    <Button startIcon={<TuneIcon />}>Peggy Build Options</Button>
                    <Button startIcon={<SystemUpdateAltIcon />}>Download Parser</Button>
                </ButtonGroup>
            </Box>
            <main>
                <Grid container spacing={2} style={{ paddingTop: 16 }} >
                    <Grid xs={8} sx={{ height: 'inherit' }}>
                        <TabContext value={currentTab} >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={(e, v) => { setCurrentTab(v) }} centered>
                                    <Tab label="Grammar Code" value="1" />
                                    <Tab label="Sample Output Tree" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                {(grammarError != "") && (
                                    <Alert variant="filled" severity="error">
                                        {grammarError}
                                    </Alert>
                                )}
                                <CodeEditor
                                    uioptions={{ mode, theme, fontSize, showGutter, highlightActiveLine, enableBasicAutocompletion, enableLiveAutocompletion, enableSnippets, showLineNumbers, tabSize }}
                                    onChange={e => setGrammarCode(e)}
                                    value={grammarCode}
                                />

                            </TabPanel>
                            <TabPanel value="2">
                                <ReactJson onEdit={false} src={result} theme={'bright:inverted'} style={{ maxHeight: "80vh", overflow: "scroll", fontSize: 15 }} />
                            </TabPanel>
                        </TabContext>

                    </Grid>
                    <Grid xs={4} sx={{ height: "inherit" }}>
                        <ParserPane onCodeChange={setSampleCode} sampleCode={sampleCode} sampleError={sampleError} />
                    </Grid>
                </Grid>

            </main>
        </ThemeProvider>
    );
}
