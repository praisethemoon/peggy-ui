import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Select,
    Box,
    Image,
    ModalCloseButton,
    List,
    ListItem,
    Flex,
    AccordionButton,
    AccordionIcon,
} from "@chakra-ui/react";
import React from "react";
import SVG from 'react-inlinesvg';
import { useHookstate } from "@hookstate/core";
import { grammarDiagramsStates, grammarRuleDefinitionsState } from "../states/GrammarStates";
import { Allotment } from "allotment";

interface DiagramModelDisplayProps {
    size: "sm" | "md" | "lg" | "xl" | "full";
    isOpen: boolean;
    onClose: () => void;
    defaultIndex: number; // index of the 
}

export const DiagramModelDisplay: React.FC<DiagramModelDisplayProps> = ({ size, isOpen, onClose, defaultIndex }) => {
    const grammarDiagrams = useHookstate(grammarDiagramsStates);
    const grammarRules = useHookstate(grammarRuleDefinitionsState);

    const [activeRuleIndex, setActiveIndex] = React.useState(defaultIndex)

    const handleOptionChange = (i: number) => {
        setActiveIndex(i);
    };


    React.useEffect(() => {
        setActiveIndex(defaultIndex)
    }, [isOpen])

    if (grammarRules.length == 0) {
        onClose()
        return <></>
    }


    return (
        <Modal size={size} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{grammarRules[activeRuleIndex].name.get()}</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={"flex"}>
                    {(size == "full") && (
                        <Box flex="1" overflow={"auto"} flexGrow={1} display={"flex"}>
                            <Allotment defaultSizes={[0.2, 0.8]} separator>
                                <List
                                    bg={"blackAlpha.900"}
                                    color="whiteAlpha.900"
                                    position={"absolute"}
                                    width={"100%"}
                                    height={"100%"}
                                    overflowY={"auto"}
                                    display={"flex"}
                                    flexDirection={"column"}
                                >
                                    {grammarRules.map((e, i) => (
                                        <Box p={1} bg={activeRuleIndex == i ? "blackAlpha.500" : "inherit"} color="whiteAlpha.900" _hover={{ bg: "whiteAlpha.900", color: "blackAlpha.900" }} onClick={() => handleOptionChange(i)}>
                                            <Box flex="1" textAlign="left">
                                                <pre>{e.name.get()} <small> {e.comment.get()}</small></pre>
                                            </Box>
                                        </Box>

                                    ))}
                                </List>

                                <SVG src={grammarDiagrams[activeRuleIndex].get()} width={"100%"} height={"100%"} />

                            </Allotment>
                        </Box>)}
                    {((size != "full") && (
                        <SVG src={grammarDiagrams[activeRuleIndex].get()} width={"100%"} height={"100%"} />
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
