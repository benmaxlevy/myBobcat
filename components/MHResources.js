import {Box, Divider, Heading, ScrollView, Stack, Text, VStack} from "native-base";

export default function MHResources({navigation}) {
    return (
        <ScrollView contentContainerStyle={{alignItems: "center", flexGrow: 1}}>
            <Heading size="lg" style={{textAlign: "center", marginVertical: 10}}>Mental Health Resources</Heading>
            <Divider style={{width: "85%"}}/>
            <VStack space="2.5" mt="4" px="8" style={{width: "95%"}}>
                <Stack mb="0" mt="1.5" direction="column" space={1}>
                    <Box p="2" bg="#002855" _text={{
                        fontSize: 'md',
                        fontWeight: 'medium',
                        color: 'warmGray.50',
                        letterSpacing: 'lg'
                    }} shadow={2}>
                        <Heading size="md" style={{textAlign: "center", color: "white"}}>BHHS Emotional Wellness Support Team</Heading>
                    </Box>
                    <Box p="2" bg="#9A1C1F" _text={{
                        fontSize: 'md',
                        fontWeight: 'medium',
                        color: 'warmGray.50',
                        letterSpacing: 'lg'
                    }} shadow={2}>
                        <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}>
                            Ms. Arini, Psychologist{"\n"}
                            Room 116D{"\n"}
                            CArini@byramhills.net
                        </Text>
                    </Box>
                    <Box p="2" bg="#9A1C1F" _text={{
                        fontSize: 'md',
                        fontWeight: 'medium',
                        color: 'warmGray.50',
                        letterSpacing: 'lg'
                    }} shadow={2}>
                        <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}>
                            Dr. Cuomo, Psychologist{"\n"}
                            Room 116F{"\n"}
                            MCuomo@byramhills.net
                        </Text>
                    </Box>
                    <Box p="2" bg="#9A1C1F" _text={{
                        fontSize: 'md',
                        fontWeight: 'medium',
                        color: 'warmGray.50',
                        letterSpacing: 'lg'
                    }} shadow={2}>
                        <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}>
                            Ms. Muelle, Social Worker{"\n"}
                            FSP (Flex Support Program){"\n"}
                            AMuelle@byramhills.net
                        </Text>
                    </Box>
                    <Box p="2" bg="#9A1C1F" _text={{
                        fontSize: 'md',
                        fontWeight: 'medium',
                        color: 'warmGray.50',
                        letterSpacing: 'lg'
                    }} shadow={2}>
                        <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}>
                            Ms. Pagan, Student Assistance Counselor{"\n"}
                            Room 100C{"\n"}
                            BPagan@byramhills.net
                        </Text>
                    </Box>
                </Stack>
            </VStack>
            <VStack space="2.5" mt="4" px="8" style={{width: "95%"}}>
                <Stack mb="2.5" mt="0" direction="column" space={1}>
                    <Box p="2" bg="#002855" _text={{
                        fontSize: 'md',
                        fontWeight: 'medium',
                        color: 'warmGray.50',
                        letterSpacing: 'lg'
                    }} shadow={2}>
                        <Heading size="md" style={{textAlign: "center", color: "white"}}>Additional Resources</Heading>
                    </Box>
                    <Box p="2" bg="#9A1C1F" _text={{
                        fontSize: 'md',
                        fontWeight: 'medium',
                        color: 'warmGray.50',
                        letterSpacing: 'lg'
                    }} style={{alignItems: "center", justifyContent: "center"}} shadow={2}>
                        <Heading size="md" style={{textAlign: "center", color: "white"}}>Helplines</Heading>
                        <Divider style={{marginVertical: 3}}/>
                        <Text fontSize={"lg"} style={{textAlign: "center", color: "white", marginBottom: 5}}>
                            911 in any emergency
                        </Text>
                        <Divider style={{marginVertical: 0, width: "70%"}}/>
                        <Text fontSize={"lg"} style={{textAlign: "center", color: "white", marginVertical: 5}}>
                            988 Suicide & Crisis Lifeline
                        </Text>
                        <Divider style={{marginVertical: 0, width: "70%"}}/>
                        <Text fontSize={"lg"} style={{textAlign: "center", color: "white", marginVertical: 5}}>
                            Crisis Prevention and Response Team at (914) 925-5959
                        </Text>
                        <Divider style={{marginVertical: 0, width: "70%"}}/>
                        <Text fontSize={"lg"} style={{textAlign: "center", color: "white", marginVertical: 5}}>
                            Call (877) 846-7369 {"\n"} or text HOPENY (467369)
                        </Text>
                    </Box>
                    <Box p="2" bg="#9A1C1F" _text={{
                        fontSize: 'md',
                        fontWeight: 'medium',
                        color: 'warmGray.50',
                        letterSpacing: 'lg'
                    }} style={{alignItems: "center", justifyContent: "center"}} shadow={2}>
                        <Heading size="md" style={{textAlign: "center", color: "white"}}>Other</Heading>
                        <Divider style={{marginVertical: 3}}/>
                        <Text fontSize={"lg"} style={{textAlign: "center", color: "white", marginBottom: 5}}>
                            Call (914) 592-5458 {"\n"} National Alliance on Mental Health Helpline for resources {"\n"} 9am-2pm, Monday-Friday
                        </Text>
                        <Divider style={{marginVertical: 0, width: "70%"}}/>
                        <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}>
                            New York State Office of Addiction Services and Supports (OASAS): oasas.ny.gov
                        </Text>
                    </Box>
                </Stack>
            </VStack>
        </ScrollView>
    );
}
