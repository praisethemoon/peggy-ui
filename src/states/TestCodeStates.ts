import { hookstate } from '@hookstate/core';
import * as peggy from 'peggy'
import { defaultPeggyCalc } from '../constants/default_peggy_demo';
import { Monaco } from "@monaco-editor/react";

export const testCodeState = hookstate(defaultPeggyCalc)
export const testCodeResult = hookstate<any>(null)
export const testCodeMonacoState = hookstate<Monaco|null>(null);
export const testCodeTokenColorsState = hookstate<{name: string, tokens: string[], color: string, bold: boolean}[]>([])