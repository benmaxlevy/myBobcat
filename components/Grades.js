import {useState} from "react";
import {Box, Button, CheckIcon, Divider, Heading, Modal, Select} from 'native-base';

export default function Grades() {
    const numberToGrade = {
        0: "F",
        1: "D",
        2: "C",
        3: "C+",
        4: "B",
        5: "B+",
        6: "A",
        7: "A+"
    };


    const [q1, setQ1] = useState();
    const [q2, setQ2] = useState();
    const [q3, setQ3] = useState();
    const [q4, setQ4] = useState();
    const [final, setFinal] = useState();

    const [overallGrade, setOverallGrade] = useState();

    const [showModal, setShowModal] = useState(false);

    const computeGrade = _ => {
        // if final is not set
        if (!final) {
            // average the quarters
            let average = Math.round((q1 + q2 + q3 + q4) / 4);
            setOverallGrade(numberToGrade[average]);
        } else if (final) {
            // final is 0.1
            // quarters are 0.225
            let average = Math.round(0.225*(q1 + q2 + q3 + q4) + 0.1 * parseInt(final));
            setOverallGrade(numberToGrade[average]);
        }

        // show modal
        return setShowModal(true);
    };

    return (
        <Box alignItems="center" style={{justifyContent: "center", flex: 1}}>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Calculated Overall Grade</Modal.Header>
                    <Modal.Body>
                        {
                            overallGrade ? (
                                <Heading textAlign={"center"}>{overallGrade}</Heading>
                            ) : (
                                <Heading textAlign={"center"} style={{color: "#E8003F"}}> No overall grade was calculated. {"\n"} If this issue persists, contact Ben Levy. </Heading>
                            )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setShowModal(false);
                            }}>
                                Close
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Heading>End-of-Year Grade Calculator</Heading>
            <Divider style={{marginVertical: 10}} w={"85%"}/>
            <Box maxW="300">
                <Select style={{marginVertical: 5}} selectedValue={q1} minWidth="200"
                        accessibilityLabel="Quarter 1 Grade" placeholder="Quarter 1 Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => setQ1(itemValue)}>
                    <Select.Item label="A+" value={7}/>
                    <Select.Item label="A" value={6}/>
                    <Select.Item label="B+" value={5}/>
                    <Select.Item label="B" value={4}/>
                    <Select.Item label="C+" value={3}/>
                    <Select.Item label="C" value={2}/>
                    <Select.Item label="D" value={1}/>
                    <Select.Item label="F" value={0}/>
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={q2} minWidth="200"
                        accessibilityLabel="Quarter 2 Grade" placeholder="Quarter 2 Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => setQ2(itemValue)}>
                    <Select.Item label="A+" value={7}/>
                    <Select.Item label="A" value={6}/>
                    <Select.Item label="B+" value={5}/>
                    <Select.Item label="B" value={4}/>
                    <Select.Item label="C+" value={3}/>
                    <Select.Item label="C" value={2}/>
                    <Select.Item label="D" value={1}/>
                    <Select.Item label="F" value={0}/>
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={q3} minWidth="200"
                        accessibilityLabel="Quarter 3 Grade" placeholder="Quarter 3 Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => setQ3(itemValue)}>
                    <Select.Item label="A+" value={7}/>
                    <Select.Item label="A" value={6}/>
                    <Select.Item label="B+" value={5}/>
                    <Select.Item label="B" value={4}/>
                    <Select.Item label="C+" value={3}/>
                    <Select.Item label="C" value={2}/>
                    <Select.Item label="D" value={1}/>
                    <Select.Item label="F" value={0}/>
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={q4} minWidth="200"
                        accessibilityLabel="Quarter 4 Grade" placeholder="Quarter 4 Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => setQ4(itemValue)}>
                    <Select.Item label="A+" value={7}/>
                    <Select.Item label="A" value={6}/>
                    <Select.Item label="B+" value={5}/>
                    <Select.Item label="B" value={4}/>
                    <Select.Item label="C+" value={3}/>
                    <Select.Item label="C" value={2}/>
                    <Select.Item label="D" value={1}/>
                    <Select.Item label="F" value={0}/>
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={final} minWidth="200"
                        accessibilityLabel="Final Exam Grade" placeholder="Final Exam Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => setFinal(itemValue)}>
                    <Select.Item label="No Final Exam" value={0}/>
                    <Select.Item label="A+" value={7}/>
                    <Select.Item label="A" value={6}/>
                    <Select.Item label="B+" value={5}/>
                    <Select.Item label="B" value={4}/>
                    <Select.Item label="C+" value={3}/>
                    <Select.Item label="C" value={2}/>
                    <Select.Item label="D" value={1}/>
                    <Select.Item label="F" value={"0"}/>
                </Select>
                <Button style={{marginVertical: 10}} onPress={computeGrade}>Compute Grade</Button>
            </Box>
        </Box>
    );
}