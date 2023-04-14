import { Box, TabProps, useTab, useMultiStyleConfig } from '@chakra-ui/react';
import * as React from 'react'

export function CustomTab(props: TabProps) {
    const tabProps = useTab(props);
    const isSelected = !!tabProps['aria-selected'];
    const styles = useMultiStyleConfig('Tabs', tabProps);
    return (
        <Box
            {...tabProps}

            bgColor={isSelected ? "gray.900" : "gray.700"}
            color="white"
            p="0.2rem 0.5rem"
            fontSize="sm"
            borderRadius="0.375rem 0.375rem 0 0 "
            cursor={"pointer"}
        >
            {props.children}

        </Box>
    );
}