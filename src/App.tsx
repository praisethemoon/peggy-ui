import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import * as React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { Terminal } from "./ui/Terminal";
import { TreeContainer } from "./ui/TreeContainer";
import Toolbar from "./ui/Toolbar";
import { MainEditorView } from "./ui/MainEditorView";

import { Allotment } from "allotment";

import "./styles/railroads.css"
import "./styles/chakra-tab-override.css"
import "./styles/json-override.css"
import "./styles/monaco-peg-highlighter.css"
import "allotment/dist/style.css"
import { useResizeDetector } from "react-resize-detector";


export const App = () => {
    React.useEffect(() => {

    }, [])
    return (
        <ChakraProvider>
            <Flex height="100vh" flexDirection="column" overflowY={"hidden"}>
                <Box height="60px">
                    <Toolbar />
                </Box>
                <Flex flex="1">
                    <Allotment defaultSizes={[0.7, 0.3]} separator>
                        <Allotment vertical defaultSizes={[0.7, 0.3]} separator>
                            <Box minH={"30vh"} overflow={"auto"} height={"100%"}>
                                <MainEditorView />
                            </Box>
                            <Box bg="gray.400" display={"flex"} flexDirection={"column"} overflow={"auto"}>
                                <Terminal />
                            </Box>
                        </Allotment>
                        <Box bg="gray.100" flexGrow={"inherit"} overflow={"auto"}>
                            <TreeContainer />
                        </Box>
                    </Allotment>
                </Flex>
            </Flex>
        </ChakraProvider>
    );
}
