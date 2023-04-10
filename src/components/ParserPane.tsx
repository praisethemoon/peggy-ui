import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Alert, Box, Tab } from '@mui/material';
import * as React from 'react';
import { CodeEditor } from './CodeEditor';

export const ParserPane: React.FC<{ onCodeChange: (v: string) => void, sampleCode: string, sampleError: string }> = ({ onCodeChange, sampleCode, sampleError }) => {
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

    return (
        <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={(e, v) => { setCurrentTab(v) }} centered>
                    <Tab label="Input/Output" value="1" />
                    <Tab label="Options" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1">
                <Box sx={{ height: "40vh" }}>
                    {(sampleError != "") && (
                        <Alert variant="filled" severity="error">
                            {sampleError}
                        </Alert>
                    )}
                    <CodeEditor
                        uioptions={{ mode, theme, fontSize, showGutter, highlightActiveLine, enableBasicAutocompletion, enableLiveAutocompletion, enableSnippets, showLineNumbers, tabSize }}
                        onChange={onCodeChange}
                        value={sampleCode}
                    />
                </Box>
            </TabPanel>
            <TabPanel value="2">

            </TabPanel>
        </TabContext>
    )
}