import React from "react";
import { Flex, ButtonGroup, IconButton, Button, Text, Tooltip } from "@chakra-ui/react";

import { BsGear } from 'react-icons/bs'
import { GoTerminal } from 'react-icons/go'
import { IoMdOptions } from 'react-icons/io'
import { FaDownload } from 'react-icons/fa'
import * as peggy from 'peggy'
import { compilePeggyGrammar, downloadParser, runSample } from "../functional/PeggyAPI";
const Toolbar = () => {
    return (
        <Flex justifyContent="center" alignItems="center" bgColor={"blackAlpha.800"} padding={2} height={"inherit"}>

            <Text 
                fontSize="lg" 
                fontWeight="bold" 
                style={{position: "absolute", top: 12, left: 20}} 
                color="whiteAlpha.900"
            >
                {`peggy v${peggy.VERSION}`}
            </Text>
            <ButtonGroup variant="solid" isAttached pr={3}>
                <Button onClick={compilePeggyGrammar} aria-label="play" iconSpacing="3" leftIcon={<BsGear />} colorScheme="blackAlpha"> Build Peggy Grammar</Button>
                <Button onClick={runSample}aria-label="play" iconSpacing="3" rightIcon={<GoTerminal />} colorScheme="blackAlpha"> Run Sample</Button>
            </ButtonGroup>
            <ButtonGroup variant="solid" spacing={2}>
                <Tooltip label="This button in vacation. AKA not implemented yet :(" >
                    <Button aria-label="play" iconSpacing="3" rightIcon={<IoMdOptions />} colorScheme="blackAlpha" disabled> Configuration</Button>
                </Tooltip>
                <Button onClick={downloadParser} aria-label="play" iconSpacing="3" rightIcon={<FaDownload />} colorScheme="blackAlpha"> Download Parser</Button>
            </ButtonGroup>
        </Flex>
    );
};

export default Toolbar;