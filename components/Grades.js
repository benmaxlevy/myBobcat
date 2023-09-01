import {useState} from "react";
import {Box, Button, CheckIcon, Divider, Heading, Modal, Select} from 'native-base';

export default function Grades() {
    // grade ranges
    const f = [0, 0.49],
        d = [0.5, 1.49],
        c = [1.5, 2.29],
        cPlus = [2.3, 2.79],
        b = [2.8, 3.29],
        bPlus = [3.3, 3.79],
        a = [3.8, 4.29],
        aPlus = [4.3, 4.6];

    const [q1, setQ1] = useState();
    const [q2, setQ2] = useState();
    const [q3, setQ3] = useState();
    const [q4, setQ4] = useState();
    const [final, setFinal] = useState();
    const [finalPercentage, setFinalPercentage] = useState();

    const [overallGrade, setOverallGrade] = useState();

    const [showModal, setShowModal] = useState(false);

    const computeGrade = _ => {

        // average the quarters (3 significant figures))

        // find weightings (if final)
        let quarterWeights;
        if(final && finalPercentage)
            quarterWeights = (1-finalPercentage)/4;
        // ternary operator - if final, calc, if not, calc without final
        const average = final ? (quarterWeights*(q1 + q2 + q3 + q4) + finalPercentage * parseFloat(final)) : +(((q1 + q2 + q3 + q4) / 4).toFixed(2));

        // check for undefined average
        if (!average) {
            setOverallGrade(undefined);
            return setShowModal(true);
        }

        // find which range the average falls in
        if (average >= aPlus[0] && average <= aPlus[1]) {
            setOverallGrade("A+");
        } else if (average >= a[0] && average <= a[1])
            setOverallGrade("A");
        else if (average >= bPlus[0] && average <= bPlus[1])
            setOverallGrade("B+");
        else if (average >= b[0] && average <= b[1])
            setOverallGrade("B");
        else if (average >= cPlus[0] && average <= cPlus[1])
            setOverallGrade("C+");
        else if (average >= c[0] && average <= c[1])
            setOverallGrade("C");
        else if (average >= d[0] && average <= d[1])
            setOverallGrade("D");
        else if (average >= f[0] && average <= f[1])
            setOverallGrade("F");

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
                    <Select.Item label="A+" value={4.6}/>
                    <Select.Item label="A" value={4.0}/>
                    <Select.Item label="B+" value={3.6}/>
                    <Select.Item label="B" value={3.0}/>
                    <Select.Item label="C+" value={2.6}/>
                    <Select.Item label="C" value={2.0}/>
                    <Select.Item label="D" value={1.0}/>
                    <Select.Item label="F" value={0}/>
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={q2} minWidth="200"
                        accessibilityLabel="Quarter 2 Grade" placeholder="Quarter 2 Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => setQ2(itemValue)}>
                    <Select.Item label="A+" value={4.6}/>
                    <Select.Item label="A" value={4.0}/>
                    <Select.Item label="B+" value={3.6}/>
                    <Select.Item label="B" value={3.0}/>
                    <Select.Item label="C+" value={2.6}/>
                    <Select.Item label="C" value={2.0}/>
                    <Select.Item label="D" value={1.0}/>
                    <Select.Item label="F" value={0}/>
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={q3} minWidth="200"
                        accessibilityLabel="Quarter 3 Grade" placeholder="Quarter 3 Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => setQ3(itemValue)}>
                    <Select.Item label="A+" value={4.6}/>
                    <Select.Item label="A" value={4.0}/>
                    <Select.Item label="B+" value={3.6}/>
                    <Select.Item label="B" value={3.0}/>
                    <Select.Item label="C+" value={2.6}/>
                    <Select.Item label="C" value={2.0}/>
                    <Select.Item label="D" value={1.0}/>
                    <Select.Item label="F" value={0}/>
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={q4} minWidth="200"
                        accessibilityLabel="Quarter 4 Grade" placeholder="Quarter 4 Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => setQ4(itemValue)}>
                    <Select.Item label="A+" value={4.6}/>
                    <Select.Item label="A" value={4.0}/>
                    <Select.Item label="B+" value={3.6}/>
                    <Select.Item label="B" value={3.0}/>
                    <Select.Item label="C+" value={2.6}/>
                    <Select.Item label="C" value={2.0}/>
                    <Select.Item label="D" value={1.0}/>
                    <Select.Item label="F" value={0}/>
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={final} minWidth="200"
                        accessibilityLabel="Final Exam Grade" placeholder="Final Exam Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => setFinal(itemValue)}>
                    <Select.Item label="No Final Exam" value={0}/>
                    <Select.Item label="A+" value={4.6}/>
                    <Select.Item label="A" value={4.0}/>
                    <Select.Item label="B+" value={3.6}/>
                    <Select.Item label="B" value={3.0}/>
                    <Select.Item label="C+" value={2.6}/>
                    <Select.Item label="C" value={2.0}/>
                    <Select.Item label="D" value={1.0}/>
                    <Select.Item label="F" value={"0"}/>
                </Select>
                {
                    final ? (
                        <Select style={{marginVertical: 5}} selectedValue={finalPercentage} minWidth="200"
                                accessibilityLabel="Final Exam Percentage" placeholder="Final Exam % of Grade" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5"/>
                        }} mt={1} onValueChange={itemValue => setFinalPercentage(itemValue)}>
                            <Select.Item label="10%" value={0.1}/>
                            <Select.Item label="20%" value={0.2}/>
                        </Select>
                    ) : (<></>)
                }
                <Button style={{marginVertical: 10}} onPress={computeGrade}>Compute Grade</Button>
            </Box>
        </Box>
    );
}
