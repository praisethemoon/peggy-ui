import { Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import * as React from 'react';
import { CodeEditor } from './PeggyCodeEditor';
import { useResizeDetector } from 'react-resize-detector';
import { CustomTab } from './CustomTab';
import { useHookstate } from '@hookstate/core';
import { grammarPeggyCodeState } from '../states/GrammarStates';
import { registerPeggyForMonaco } from '../functional/PeggyMonacoSupport';
import { testCodeState } from '../states/TestCodeStates';

export const MainEditorView: React.FC = () => {
    const tab1_size = useResizeDetector();
    const tab2_size = useResizeDetector();


    const grammarCode = useHookstate(grammarPeggyCodeState)
    const handleGrammarCodeInput = (data: string | undefined) => {
        if (data)
            grammarCode.set(data)
        else
            grammarCode.set("")
    }

    const sampleCode = useHookstate(testCodeState)
    const handleTestCodeInput = (data: string | undefined) => {
        if (data)
        sampleCode.set(data)
        else
        sampleCode.set("")
    }

    return (
        <Tabs display={"flex"} overflow={"overlay"} flexGrow={1} height={"100%"} flexDirection={"column"} >
            <TabList>
                <CustomTab>Grammar</CustomTab>
                <CustomTab>Sample Code</CustomTab>
            </TabList>
            <TabPanels style={{ border: "1px solid #f7fafc" }}>
                <TabPanel display={"inherit"} overflow={"hidden"} flexGrow={1} height={"100%"} flexDirection={"column"} ref={tab1_size.ref}>
                    <CodeEditor w={tab1_size.width} h={tab1_size.height} language='peggyjs' onChange={handleGrammarCodeInput} setUpMonaco={registerPeggyForMonaco} value={grammarCode.get()}/>
                </TabPanel>
                <TabPanel display={"inherit"} overflow={"overlay"} flexGrow={1} height={"100%"} flexDirection={"column"} ref={tab2_size.ref}>
                    <CodeEditor w={tab2_size.width} h={tab2_size.height} language='idkbro' onChange={(handleTestCodeInput)} setUpMonaco={()=>{}} value={sampleCode.get()} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}