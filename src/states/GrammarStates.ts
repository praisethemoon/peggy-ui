import { hookstate } from '@hookstate/core';
import * as peggy from 'peggy'
import { defaultPeggySample } from '../constants/default_peggy_grammar';

/**
 * Grammar rule interface which contain rule name, its location as well comments (if any)
 * Mostly used for auto-complition
 */
export interface GrammarRuleDefinition {
    name: string;
    location: peggy.LocationRange;
    comment: string | null;
}
export const grammarRuleDefinitionsState = hookstate<GrammarRuleDefinition[]>([])

/**
 * Peggy grammar code
 */
export const grammarPeggyCodeState = hookstate<string>(defaultPeggySample)


/**
 * Grammar Action
 * for parsing and highlighting js-in-peggy
 */
export interface GrammarAction {
    code: string,
    location: peggy.LocationRange
}

// List of all actions
export const grammarActionsState = hookstate<GrammarAction[]>([])

// SVG code of all grammars, in railroads-diagram style
export const grammarDiagramsStates = hookstate<string[]>([])

export const parserState = hookstate<peggy.Parser | undefined>(undefined);
export const grammarLiterals = hookstate<string[]>([])