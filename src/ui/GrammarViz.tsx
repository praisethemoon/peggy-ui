import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, ButtonGroup, Flex, Heading, IconButton } from "@chakra-ui/react";
import { useHookstate } from "@hookstate/core";
import * as React from 'react'
import SVG from 'react-inlinesvg';
import { ImEnlarge2 } from 'react-icons/im'
import { BsFullscreen } from 'react-icons/bs'
import { grammarDiagramsStates, grammarRuleDefinitionsState } from "../states/GrammarStates";
import { DiagramModelDisplay } from "./DiagramModelDisplay";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full"

export const GrammarViz: React.FC = () => {
    const grammarDiagrams = useHookstate(grammarDiagramsStates)
    const grammarRules = useHookstate(grammarRuleDefinitionsState)

    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [isOpen, setIsOpen] = React.useState(false)
    const closeModal = () => setIsOpen(false)

    const [size, setSize] = React.useState<ModalSize>("md")

    const openModal = (size: ModalSize, index: number) => {
        setSize(size)
        setSelectedIndex(index)
        setIsOpen(true)
    }

    return (
        <>
            <DiagramModelDisplay defaultIndex={selectedIndex} isOpen={isOpen} onClose={closeModal} size={size} />
            {grammarDiagrams.map((item, index) => (
                <Accordion key={grammarRules[index].name.get()} allowToggle>
                    <AccordionItem border="none">
                        <AccordionButton bg="blackAlpha.900" color="whiteAlpha.900" _hover={{ bg: "blackAlpha.800" }}>
                            <Box flex="1" textAlign="left">
                                <pre>{grammarRules[index].name.get()} <small> {grammarRules[index].comment.get()}</small></pre>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel overflowY={"auto"}>
                            <Box display={"flex"} flexDirection={"row"}>
                                <SVG src={item.get()} width={"100%"} />
                                <Flex direction="column">
                                    <IconButton icon={<ImEnlarge2 />} aria-label={"btn"+index} onClick={() => openModal('xl', index)} borderBottomRadius={0}/>
                                    <IconButton icon={<BsFullscreen />} aria-label={"full"+index} onClick={() => openModal('full', index)} borderTopRadius={0}/>
                                </Flex>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            ))}
        </>
    );
};
