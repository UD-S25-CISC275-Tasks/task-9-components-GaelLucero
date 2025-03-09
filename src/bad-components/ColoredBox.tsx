import React, { useState } from "react";
import { Button } from "react-bootstrap";

export const COLORS = ["red", "blue", "green"];
const DEFAULT_COLOR_INDEX = 0;

function ChangeColor({setColorIndex, colorIndex}: ColorIndex): React.JSX.Element {
    // const [colorIndex, setColorIndex] = useState<number>(DEFAULT_COLOR_INDEX);
    return (
        <Button
            onClick={() => {
                setColorIndex((1 + colorIndex) % COLORS.length);
            }}
        >
            Next Color
        </Button>
    );
}

interface ColorIndex {
    setColorIndex: (newIndex: number) => void
    colorIndex: number
}

function ColorPreview({colorIndex}:ColorIndex): React.JSX.Element {
    // setColorIndex(colorIndex);
    return (
        <div
            data-testid="colored-box"
            style={{
                width: "50px",
                height: "50px",
                // DEFAULT_COLOR_INDEX
                backgroundColor: COLORS[colorIndex],
                display: "inline-block",
                verticalAlign: "bottom",
                marginLeft: "5px",
            }}
        ></div>
    );
}

export function ColoredBox(): React.JSX.Element {
    const [colorIndex, setColorIndex] = useState<number>(DEFAULT_COLOR_INDEX);

    return (
        <div>
            <h3>Colored Box</h3>
            {/* DEFAULT_COLOR_INDEX */}
            <span>The current color is: {COLORS[DEFAULT_COLOR_INDEX]}</span>
            <div>
                <ChangeColor setColorIndex={setColorIndex} colorIndex={colorIndex}></ChangeColor>
                <ColorPreview setColorIndex={setColorIndex} colorIndex={colorIndex}></ColorPreview>
            </div>
        </div>
    );
}
