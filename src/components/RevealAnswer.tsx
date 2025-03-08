import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): React.JSX.Element {

    const [visible, setVisible] = useState<boolean>(false);

    function flipVisibility(): void {
        // Set visible to be the logical opposite of its previous value
        setVisible(!visible);
      }

    // Only includes <div>Hello!</div> if `visible` is true
    return <div> 
        <Button onClick={flipVisibility}>/Reveal Answer/i</Button>
        {visible && <div>42</div>}  {/* *JSX allows us to mix code and HTML*/ }
    </div>;
}
