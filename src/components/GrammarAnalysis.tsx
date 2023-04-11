import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useHookstate } from '@hookstate/core';
import { grammarDiagrams, grammarLiterals, grammarRulesNames } from '../states/States';
import { Box, Divider } from '@mui/material';
import SVG from 'react-inlinesvg';

export default function GrammarAnalysis() {
    const grammarNames = useHookstate(grammarRulesNames);
    const grammarLit = useHookstate(grammarLiterals)
    const grammarDia = useHookstate(grammarDiagrams)

    return (
        <div>
            <Box p={3}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <Typography variant='h6'>{`Grammar Literals: `}</Typography>
                    {grammarLit.map(e => (
                        <code style={{color: "crimson", fontWeight: "bolder"}} key={e.get()}>{e.get()}</code>
                    ))}
                </div>
            </Box>
            <Divider/>
            <Box p={3}>
                <Typography variant='h6'>{`Rules: `}</Typography>
                {grammarNames.map((e, i) => (
                    
                    <Accordion TransitionProps={{ unmountOnExit: true }} key={e.get()}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${e.get()}-content`}
                            id={`${e.get()}-header`}
                        >
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <Typography>{`Rule: ${i}`}</Typography>
                                <code>{e.get()}</code>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>

                            {
                                
                            }
                            <SVG src={grammarDia.at(i)?.get()|| ""}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </div>
    );
}