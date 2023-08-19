import {useEffect, useState} from "react";
import {View} from "react-native";
import {Box, Heading, Divider, Center, Select, CheckIcon, ScrollView, Stack, VStack, Button, Modal, FormControl, Input, Alert} from 'native-base';

export default function Grades() {
    const [q1, setQ1] = useState();
    const [q2, setQ2] = useState();
    const [q3, setQ3] = useState();
    const [q4, setQ4] = useState();
    const [final, setFinal] = useState();
    return (
        <Box alignItems="center" style={{justifyContent: "center", flex: 1}}>
            <Heading>End-of-Year Grade Calculator</Heading>
            <Divider style={{marginVertical: 10}} w={"85%"}/>
            <Box maxW="300">
                <Select style={{marginVertical: 5}} selectedValue={q1} minWidth="200" accessibilityLabel="Quarter 1 Grade" placeholder="Quarter 1 Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setQ1(itemValue)}>
                    <Select.Item label="A+" value={4.6} />
                    <Select.Item label="A" value={4.0} />
                    <Select.Item label="B+" value={3.6} />
                    <Select.Item label="B" value={3.0} />
                    <Select.Item label="C+" value={2.6} />
                    <Select.Item label="C" value={2.0} />
                    <Select.Item label="D" value={1.0} />
                    <Select.Item label="F" value={0.0} />
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={q2} minWidth="200" accessibilityLabel="Quarter 2 Grade" placeholder="Quarter 2 Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setQ2(itemValue)}>
                    <Select.Item label="A+" value={4.6} />
                    <Select.Item label="A" value={4.0} />
                    <Select.Item label="B+" value={3.6} />
                    <Select.Item label="B" value={3.0} />
                    <Select.Item label="C+" value={2.6} />
                    <Select.Item label="C" value={2.0} />
                    <Select.Item label="D" value={1.0} />
                    <Select.Item label="F" value={0.0} />
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={q3} minWidth="200" accessibilityLabel="Quarter 3 Grade" placeholder="Quarter 3 Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setQ3(itemValue)}>
                    <Select.Item label="A+" value={4.6} />
                    <Select.Item label="A" value={4.0} />
                    <Select.Item label="B+" value={3.6} />
                    <Select.Item label="B" value={3.0} />
                    <Select.Item label="C+" value={2.6} />
                    <Select.Item label="C" value={2.0} />
                    <Select.Item label="D" value={1.0} />
                    <Select.Item label="F" value={0.0} />
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={q4} minWidth="200" accessibilityLabel="Quarter 4 Grade" placeholder="Quarter 4 Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setQ4(itemValue)}>
                    <Select.Item label="A+" value={4.6} />
                    <Select.Item label="A" value={4.0} />
                    <Select.Item label="B+" value={3.6} />
                    <Select.Item label="B" value={3.0} />
                    <Select.Item label="C+" value={2.6} />
                    <Select.Item label="C" value={2.0} />
                    <Select.Item label="D" value={1.0} />
                    <Select.Item label="F" value={0.0} />
                </Select>
                <Select style={{marginVertical: 5}} selectedValue={final} minWidth="200" accessibilityLabel="Final Exam Grade" placeholder="Final Exam Grade" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setFinal(itemValue)}>
                    <Select.Item label="A+" value={4.6} />
                    <Select.Item label="A" value={4.0} />
                    <Select.Item label="B+" value={3.6} />
                    <Select.Item label="B" value={3.0} />
                    <Select.Item label="C+" value={2.6} />
                    <Select.Item label="C" value={2.0} />
                    <Select.Item label="D" value={1.0} />
                    <Select.Item label="F" value={0.0} />
                </Select>
            </Box>
        </Box>
    );
}