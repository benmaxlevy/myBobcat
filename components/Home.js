import {View} from "react-native";
import {Box, Heading, ScrollView, Stack, Text, VStack} from 'native-base';


export default function Home() {
    return (
        <View>
            <ScrollView>
                <VStack space="2.5" mt="4" px="8">
                    <Stack mb="2.5" mt="1.5" direction="column" space={0}>
                        <Box p="2" bg="#424242" _text={{
                            fontSize: 'md',
                            fontWeight: 'medium',
                            color: 'warmGray.50',
                            letterSpacing: 'lg'
                        }} shadow={2}>
                            <Heading size="lg" style={{textAlign: "center", color: "white"}}>myBobcat</Heading>
                            <Text fontSize={"xs"} style={{textAlign: "center", color: "white"}}>Developed by <Text bold>Ben
                                Levy</Text> (Class of 2024)</Text>
                        </Box>
                        <Box p="2" bg="#9A1C1F" _text={{
                            fontSize: 'md',
                            fontWeight: 'medium',
                            color: 'warmGray.50',
                            letterSpacing: 'lg'
                        }} shadow={2}>
                            <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}><Text
                                bold>myBobcat</Text> is here for your everyday Byram Hills High School needs, from
                                events to GPA and grade calculators!</Text>
                        </Box>
                    </Stack>
                </VStack>
                <VStack space="2.5" mt="4" px="8">
                    <Stack mb="2.5" mt="1.5" direction="column">
                        <Box p="2" bg="#E79F2E" _text={{
                            fontSize: 'md',
                            fontWeight: 'medium',
                            color: 'warmGray.50',
                            letterSpacing: 'lg'
                        }} shadow={2}>
                            <Heading size="lg" style={{textAlign: "center", color: "white"}}>Mental Health Support is
                                Here</Heading>
                            <Text fontSize={"md"} style={{textAlign: "center", color: "white"}}>If you or someone else you know is struggling,
                                calling or texting <Text style={{color: "black", fontSize: 20}} bold>988</Text> is here for you.</Text>
                        </Box>
                    </Stack>
                </VStack>
            </ScrollView>
        </View>
    );
}
