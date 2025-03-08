import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [inProgress, setInProgress] = useState<boolean>(false);

    function addAttempt(){
        setAttempts(attempts + 1);
    }

    function startQuiz(){
        setInProgress(true);
        setAttempts(attempts - 1);
    }

    function stopQuiz(){
        setInProgress(false);
    }
    return <div>
        <Button onClick={startQuiz} disabled={inProgress || (attempts < 1)}>Start Quiz</Button>
        <Button onClick={addAttempt} disabled={inProgress}>Mulligan</Button>
        <Button onClick={stopQuiz} disabled={!inProgress}>Stop Quiz</Button>
        The Number of attempts: {attempts}
    </div>;
}
