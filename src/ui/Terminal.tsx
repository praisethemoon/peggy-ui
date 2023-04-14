import * as React from "react";
import { Box, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { useHookstate } from "@hookstate/core";
import { TerminalLogInterface, terminalLogsState } from "../states/TerminalLogsState";
import { useResizeDetector } from "react-resize-detector";

export const Terminal: React.FC = () => {
    const ref = React.useRef<any>()
    const logs = useHookstate(terminalLogsState)

    // effect to track new lines to scroll to bottom

    React.useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [logs]);

    const formatLog = (log: TerminalLogInterface) => {
        const typeColorMap = {
            info: "gray.500",
            error: "red.500",
            warning: "orange.500",
            success: "green.500",
        };

        const typeIconMap = {
            info: "ℹ️",
            error: "❌",
            warning: "⚠️",
            success: "✅",
        };

        const icon = typeIconMap[log.type];
        const color = typeColorMap[log.type];

        return (
            <Box>
                <Text fontSize="sm" color={color} fontWeight="bold">
                    {icon} {log.type} {(log.location != undefined) && `Line: ${log.location?.start.line}, Col ${log.location?.start.column}:`}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.900" ml="2">
                    {log.message}
                </Text>
            </Box>
        );
    };
    return (
        <Box
            height={"100%"}
            bg="blackAlpha.900"
        >
            <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Box 
                    cursor={"pointer"}
                    bgColor="gray.800"
                    color="white"
                    p="0.2rem 0.5rem"
                    fontSize="sm"
                    borderRadius="0 0 0.375rem 0"
                    onClick={() => {terminalLogsState.set([])}}
                >
                    Terminal - Click to clear
                </Box>
            </Box>
            <Box>
                <Box
                    bg="blackAlpha.900"
                    color="whiteAlpha.700"
                    fontFamily="monospace"
                    overflowY={"scroll"}
                    position={"absolute"}
                    width={"100%"}
                    height={"calc(100% - 25px)"}
                    top={6} left={0}>
                    {logs.map((log, index) => (
                        <Box key={index} px="2" py="1" borderBottomWidth="1px">
                            {formatLog(log.get())}
                        </Box>
                    ))}
                    <div id="marker-2394" ref={ref} />
                </Box>
            </Box>
        </Box>
    );
}
