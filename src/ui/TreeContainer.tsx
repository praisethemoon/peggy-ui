import { Box, useTab, useMultiStyleConfig, Button, Tabs, TabList, TabPanels, TabPanel, TabProps, Flex } from '@chakra-ui/react'
import * as React from 'react'
import { CodeEditor } from './PeggyCodeEditor';
import { useResizeDetector } from 'react-resize-detector';
import { CustomTab } from './CustomTab';
import { SampleAST } from './SampleAST';
import { GrammarViz } from './GrammarViz';

export const TreeContainer: React.FC = () => {    

    return (
        <Tabs display={"flex"} overflow={"overlay"} flexGrow={1} height={"100%"} flexDirection={"column"} >
            <TabList>
                <CustomTab>Grammar</CustomTab>
                <CustomTab>Sample Code</CustomTab>
            </TabList>
            <TabPanels style={{ border: "1px solid #f7fafc" }}>
                <TabPanel fontFamily="monospace"
                    overflowY={"scroll"}
                    position={"absolute"}
                    width={"100%"}
                    height={"calc(100% - 25px)"}
                    top={6} left={0} bgColor={"whiteAlpha.800"}>
                    <GrammarViz/>
                </TabPanel>
                <TabPanel fontFamily="monospace"
                    overflowY={"scroll"}
                    position={"absolute"}
                    width={"100%"}
                    height={"calc(100% - 25px)"}
                    top={6} left={0} bgColor={"whiteAlpha.800"}>
                    <SampleAST/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}