import * as React from 'react';

import { JsonView, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { randomData } from '../constants/randomdata';
import { testCodeResult } from '../states/TestCodeStates';
import { useHookstate } from '@hookstate/core';


export const SampleAST = () => {
    const testCode = useHookstate(testCodeResult)
    return (
        <JsonView data={testCode.get() || {}} shouldInitiallyExpand={(level: any) => true} style={{ ...defaultStyles }} />
    );
};
