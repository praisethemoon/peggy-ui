import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, ButtonGroup, Flex, Heading, IconButton } from "@chakra-ui/react";
import { useHookstate } from "@hookstate/core";
import * as React from 'react'
import SVG from 'react-inlinesvg';
import { ImEnlarge2 } from 'react-icons/im'
import { BsFullscreen } from 'react-icons/bs'
import { grammarDiagramsStates, grammarRuleDefinitionsState } from "../states/GrammarStates";
import { DiagramModelDisplay } from "./DiagramModelDisplay";
import { testCodeTokenColorsState } from "../states/TestCodeStates";
import { HexColorPicker } from "react-colorful";
import { PopoverPicker } from "./PopoverColorPicker";
import { TbBold, TbBoldOff } from 'react-icons/tb'
import { setupCustomLanguageMonaco } from "../functional/CustomLangMonacoSupport";

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

    const testCodeTokenColors = useHookstate(testCodeTokenColorsState)

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
                        <AccordionPanel overflowY={"auto"} borderColor={"blackAlpha.900"} borderWidth={3} borderStyle={"solid"}>

                            <Box display={"flex"} flexDirection={"row"}>
                                <Flex direction="column" alignItems={"center"}>
                                    <IconButton icon={<ImEnlarge2 />} aria-label={"btn" + index} onClick={() => openModal('xl', index)} borderBottomRadius={0} />
                                    <IconButton icon={<BsFullscreen />} aria-label={"full" + index} onClick={() => openModal('full', index)} borderTopRadius={0} />
                                    {(testCodeTokenColors.findIndex((e) => e.name.get() == grammarRules[index].name.get()) != -1) && (
                                        <Box pt={3}>
                                            <PopoverPicker
                                                color={testCodeTokenColors[testCodeTokenColors.findIndex((e) => e.name.get() == grammarRules[index].name.get())].color.get()}
                                                onChange={(new_col) => {
                                                    testCodeTokenColors[testCodeTokenColors.findIndex((e) => e.name.get() == grammarRules[index].name.get())].color.set(new_col)
                                                    setupCustomLanguageMonaco(null)
                                                }}
                                            />
                                            <Box pt={1}>
                                                <IconButton aria-label="" size="sm" 
                                                    icon={
                                                        testCodeTokenColors[testCodeTokenColors.findIndex((e) => e.name.get() == grammarRules[index].name.get())].bold.get()?
                                                        (<TbBold />):(<TbBoldOff />)
                                                    }
                                                    onClick={() => {
                                                        testCodeTokenColors[testCodeTokenColors.findIndex((e) => e.name.get() == grammarRules[index].name.get())].bold.set(
                                                            !testCodeTokenColors[testCodeTokenColors.findIndex((e) => e.name.get() == grammarRules[index].name.get())].bold.get()
                                                        )
                                                        setupCustomLanguageMonaco(null)
                                                    }} 
                                                />
                                            </Box>
                                        </Box>

                                    )}

                                </Flex>
                                <SVG src={item.get()} width={"100%"} />
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            ))}
        </>
    );
};
