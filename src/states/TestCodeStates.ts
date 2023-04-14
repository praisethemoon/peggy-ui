import { hookstate } from '@hookstate/core';
import * as peggy from 'peggy'
import { defaultPeggyCalc } from '../constants/default_peggy_demo';

export const testCodeState = hookstate(defaultPeggyCalc)
export const testCodeResult = hookstate<any>(null)