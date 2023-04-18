import React, { useCallback, useRef, useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";

import useClickOutside from "./useClickOutside";

export const PopoverPicker: React.FC<{ color:string, onChange: (newcolor: string) => void }> = ({color, onChange}) => {
    const popover = useRef<any>();
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);

    return (
        <div className="picker">
            <div
                className="swatch"
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className="popover" ref={popover}>
                    <HexAlphaColorPicker color={color} onChange={onChange} />
                </div>
            )}
        </div>
    );
};
