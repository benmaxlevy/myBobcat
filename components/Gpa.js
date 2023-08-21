import {useState} from "react";
import {View} from "react-native";

import {Box, Button, CheckIcon, Divider, Heading, Modal, Select, Input, ScrollView, FormControl, CloseIcon} from 'native-base';

export default function Gpa() {

    const [classes, setClasses] = useState([]);

    const [overallGpa, setOverallGpa] = useState();

    const [showModal, setShowModal] = useState(false);

    const computeGpa = _ => {
        let sum = 0;
        let credits = 0;

        let error = false;

        classes.forEach(c => {
            sum += (c.credits * c.grade);
            credits += c.credits;
        });

        setOverallGpa(parseFloat((sum / credits).toFixed(3)));

        return setShowModal(true);
    };

    return (
        <View style={{flex: 1, marginVertical: 15}}>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignContent: "center"}}>
                <Box alignItems="center" style={{justifyContent: "center", flex: 1}}>
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton/>
                            <Modal.Header>Calculated Overall GPA</Modal.Header>
                            <Modal.Body>
                                {
                                    overallGpa ? (
                                        <Heading textAlign={"center"}>{overallGpa}</Heading>
                                    ) : (
                                        <Heading textAlign={"center"} style={{color: "#E8003F"}}> No overall GPA was
                                            calculated. {"\n"} If this issue persists, contact Ben Levy. </Heading>
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
                    <Heading>GPA Calculator</Heading>
                    <Divider style={{marginVertical: 10}} w={"55%"}/>
                    <Box style={{marginBottom: 10}}>
                        {
                            classes.map((c, index) => {
                                return (
                                    <FormControl key={index} style={{marginBottom: 20}}>
                                        <View style={{flexDirection:'row', flexWrap:'wrap', alignItems: "center"}}>
                                            <FormControl.Label>Class Name</FormControl.Label>
                                            <CloseIcon onPress={_ => {
                                                // remove this object from the array
                                                let tempClasses = [...classes];
                                                tempClasses.splice(index, 1);
                                                return setClasses(tempClasses);
                                            }} style={{color: "#E8003F", position: "absolute", right: 0}}/>
                                        </View>
                                        <Input placeholder={"Class Name"} minW={200} selectedValue={c.title}
                                               onValueChange={itemValue => {
                                                   let tempClasses = [...classes];
                                                   tempClasses[index].title = itemValue;
                                                   return setClasses(tempClasses);
                                               }}
                                        />
                                        <FormControl.Label>Number of Credits</FormControl.Label>
                                        <Select minW={200}
                                                accessibilityLabel="Credits" placeholder="Credits"
                                                selectedValue={c.credits}
                                                onValueChange={itemValue => {
                                                    let tempClasses = [...classes];
                                                    tempClasses[index].credits = itemValue;
                                                    return setClasses(tempClasses);
                                                }} _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5"/>
                                        }} mt={1}>
                                            <Select.Item label="1.0" value={1.0}/>
                                            <Select.Item label="0.5" value={0.5}/>
                                        </Select>
                                        <FormControl.Label>Grade</FormControl.Label>
                                        <Select minW={200}
                                                accessibilityLabel="Grade" placeholder="Grade" selectedValue={c.grade}
                                                onValueChange={itemValue => {
                                                    let tempClasses = [...classes];
                                                    tempClasses[index].grade = itemValue;
                                                    return setClasses(tempClasses);
                                                }} _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5"/>
                                        }} mt={1}>
                                            <Select.Item label="A+" value={4.6}/>
                                            <Select.Item label="A" value={4.0}/>
                                            <Select.Item label="B+" value={3.6}/>
                                            <Select.Item label="B" value={3.0}/>
                                            <Select.Item label="C+" value={2.6}/>
                                            <Select.Item label="C" value={2.0}/>
                                            <Select.Item label="D+" value={1.6}/>
                                            <Select.Item label="D" value={1.0}/>
                                            <Select.Item label="F" value={0.0}/>
                                        </Select>
                                    </FormControl>
                                )
                            })
                        }
                        <Button w={"50%"} style={{marginVertical: 5, alignSelf: "center", justifyContent: "flex-start"}}
                                onPress={_ => setClasses([...classes, {title: "", grade: 4.6, credits: 1.0}])}>Add a
                            Class</Button>
                    </Box>
                    <Divider w={"35%"}/>
                    <Button style={{marginVertical: 15}} onPress={computeGpa}>Compute GPA</Button>
                </Box>
            </ScrollView>
        </View>
    )
        ;
}