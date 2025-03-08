import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): React.JSX.Element {
    /*
    Day of the Dead: 💀
    Christmas: 🎄
    New Years: 🎆
    Chinese New Year: 🐲
    Thanksgiving: 🦃

    */

    const [holiday, setHoliday] = useState<Holiday>("New_Years");
    
    type Holiday = "Day_of_the_Dead" | "Christmas" | "New_Years" | "Chinese_New_Years" | "Thanksgiving";

    const Date_Map: Record<Holiday, Holiday> = {
        "New_Years" : "Chinese_New_Years",
        "Chinese_New_Years" : "Day_of_the_Dead",
        "Day_of_the_Dead" : "Thanksgiving",
        "Thanksgiving" : "Christmas",
        "Christmas" : "New_Years"
    };

    const Alphabet__Map: Record<Holiday, Holiday> = {
        "Chinese_New_Years" : "Christmas",
        "Christmas" : "Day_of_the_Dead",
        "Day_of_the_Dead" : "New_Years",
        "New_Years" : "Thanksgiving",
        "Thanksgiving" : "Chinese_New_Years"
    };

    function changeByAlphabet() {
        let newColor = Alphabet__Map[holiday];
        setHoliday(newColor);
    }

    function changeByDate(){
        let newColor = Date_Map[holiday];
        setHoliday(newColor);
    }

    function displayEmoji() {
        if (holiday === "Chinese_New_Years") {
            return "🐲";
        }else if (holiday === "New_Years") {
            return "🎆";
        }else if (holiday === "Christmas") {
            return "🎄";
        }else if (holiday === "Day_of_the_Dead") {
            return "💀";
        }
        return "🦃";
    }

    return <div>
        <Button onClick={changeByAlphabet}>Advance by Alphabet</Button>
        <Button onClick={changeByDate}>Advance by Year</Button>
        Holiday: {displayEmoji()}
    </div>;
}
