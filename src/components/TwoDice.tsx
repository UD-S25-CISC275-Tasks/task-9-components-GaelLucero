import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 * 
 */

export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    const [rightRoll, setRightRoll] = useState<number>(1);
    const [leftRoll, setLeftRoll] = useState<number>(6);

    function displayLeft(){
        let roll = d6();
        setLeftRoll(roll);
    }

    function displayRight(){
        let roll = d6();
        setRightRoll(roll);
    }

    return <div>
        <span data-testid = "left-die">
    <Button onClick={displayLeft}>Roll Left</Button>
    Left Roll: {leftRoll}
  </span>;

  <span data-testid = "right-die">
    <Button onClick={displayRight}>Roll Right</Button>
    Right Roll: {rightRoll}
  </span>;
  {((leftRoll === rightRoll) && leftRoll !== 1 ? "Win" : (leftRoll === rightRoll) ? "Lose" : "")}
    </div>;
}
