import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";

const PEOPLE = [
    "Alan Turing",
    "Grace Hopper",
    "Ada Lovelace",
    "Charles Babbage",
    "Barbara Liskov",
    "Margaret Hamilton",
];

export function ChooseTeam(): React.JSX.Element {
    const [allOptions, setAllOptions] = useState<string[]>(PEOPLE);
    const [team, setTeam] = useState<string[]>([]);

    function chooseMember(newMember: string) {
        if (!team.includes(newMember)) {
            // *Adding new member to team*
            // Creating a new list by unpacking team array and adding new member
            const newTeam = [...team, newMember];
            // Using the set to updated the team with the new member
            setTeam(newTeam);

            // *removing new member from options*
            // create a new array with out the new member
            let removeMember = allOptions.filter((name: string) => name !== newMember);
            // use the set to update the options, without the new member
            setAllOptions(removeMember);

        }
    }

    function clearTeam() {
        /*
        team = [];
        */
       setTeam([]);
       setAllOptions(PEOPLE);
    }

    return (
        <div>
            <h3>Choose Team</h3>
            <Row>
                <Col>
                    {allOptions.map((option: string) => (
                        <div key={option} style={{ marginBottom: "4px" }}>
                            Add{" "}
                            <Button onClick={() => {chooseMember(option)}} size="sm">
                                {option}
                            </Button>
                        </div>
                    ))}
                </Col>
                <Col>
                    <strong>Team:</strong>
                    {team.map((member: string) => (
                        <li key={member}>{member}</li>
                    ))}
                    <Button onClick={clearTeam}>Clear Team</Button>
                </Col>
            </Row>
        </div>
    );
}
