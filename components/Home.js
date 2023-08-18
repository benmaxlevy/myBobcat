import {Component} from "react";
import {View} from "react-native";
import {Box, Text, Heading, ScrollView, Stack, VStack} from 'native-base';

export default class Home extends Component {
    render() {
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
                                <Text fontSize={"xs"} style={{textAlign: "center", color: "white"}}>Developed by <Text bold>Ben Levy</Text> (Class of 2024)</Text>
                            </Box>
                            <Box p="2" bg="#9A1C1F" _text={{
                                fontSize: 'md',
                                fontWeight: 'medium',
                                color: 'warmGray.50',
                                letterSpacing: 'lg'
                            }} shadow={2}>
                                <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}><Text bold>myBobcat</Text> is here for your everyday Byram Hills High School needs, from events to GPA and grade calculators!</Text>
                            </Box>
                        </Stack>
                    </VStack>
                </ScrollView>
            </View>
        );
    }
}
