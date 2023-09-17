import {View, RefreshControl} from "react-native";
import {Alert, Box, Button, Heading, ScrollView, Stack, Text, VStack} from 'native-base';
import {useContext, useEffect, useState} from "react";

import {API_URL} from '@env';
import {Context} from "../Context";

let API = API_URL;

if (!API_URL) {
    API = "https://mybobcat.simplexwebsites.com";
}

export default function Home({navigation}) {
    const {jwt, setJwt} = useContext(Context);
    const [refreshing, setRefreshing] = useState(false);
    const [day, setDay] = useState("");
    const [error, setError] = useState(false);

    useEffect(
        () => {
            navigation.addListener("focus", _ => {
                setRefreshing(true);
                fetch(API + "/schedule")
                    .then((resp) => resp.json())
                    .then((json) => {
                        setDay(json.day);
                    })
                    .catch((error) => setError(true))
                    .finally(() => setRefreshing(false));
            });
        });
    const refetchDay = _ => {
        setRefreshing(true);
        fetch(API + "/schedule")
            .then((resp) => resp.json())
            .then((json) => {
                setDay(json.day);
            })
            .catch((error) => setError(true))
            .finally(() => setRefreshing(false));
    };

    const changeDay = (newDay) => {
        fetch(API + "/schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": jwt.jwt
            },
            body: new URLSearchParams({
                "day": newDay,
            }).toString(),
        })
            .then((response) => {
                if (response.status !== 200) {
                    // check permissions
                    throw "Error (check permissions)";
                } else
                    return response.json()
            })
            .then(_ => {
                // bring to events & refetch
                setRefreshing(true);
                refetchDay();
            })
            .catch(err => {
                // set error state to true and display err
                setError(true);
            });
    };

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refetchDay}/>
        }>
            {
                error ? (
                    <Box alignItems="center" style={{alignItems: "center", justifyContent: "center"}}>
                        <Alert w="75%" status={"error"}>
                            <VStack space={2} flexShrink={1} w="100%">
                                <Text style={{textAlign: "center", fontSize: 22}} color="coolGray.800">
                                    Failed to create an event. Check whether or not you have this
                                    permission. {"\n"} If
                                    this issue persists, contact Ben Levy.
                                </Text>
                                <Button style={{marginVertical: 10, backgroundColor: "#424242"}}
                                        onPress={() => setError(false)}>Return to Events</Button>
                            </VStack>
                        </Alert>
                    </Box>
                ) : (
                    <>
                        <Box p="2" bg="#9A1C1F" _text={{
                            fontSize: 'md',
                            fontWeight: 'medium',
                            color: 'warmGray.50',
                            letterSpacing: 'lg'
                        }} shadow={2}>
                            <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}>Today is day <Text
                                bold>{day}</Text>!</Text>
                            {/* if  admin, button to change schedule */}
                            {(jwt && (jwt.permissions === "admin")) ? (
                                day==="1" ? (
                                    <Box alignItems="center">
                                        <Button onPress={() => {
                                            return changeDay(parseInt(day)+1);
                                        }}>Increment</Button>
                                    </Box>
                                ) : (day==="8" ? (
                                    <Box alignItems="center">
                                        <Button onPress={() => {
                                            return changeDay(parseInt(day)-1);
                                        }}>Decrement</Button>
                                    </Box>
                                ) : (
                                    <Box style={{flexDirection:'row', flexWrap:'wrap', alignItems: "center", justifyContent: "center", marginVertical: 5}}>
                                        <Button style={{marginRight: 5}} onPress={() => {
                                            return changeDay(parseInt(day)+1);
                                        }}>Increment</Button>
                                        <Button onPress={() => {
                                            return changeDay(parseInt(day)-1);
                                        }}>Decrement</Button>
                                    </Box>
                                ))
                            ) : (<></>)}
                        </Box>
                        <VStack space="2.5" mt="4" px="8">
                            <Stack mb="2.5" mt="1.5" direction="column" space={0}>
                                <Box p="2" bg="#424242" _text={{
                                    fontSize: 'md',
                                    fontWeight: 'medium',
                                    color: 'warmGray.50',
                                    letterSpacing: 'lg'
                                }} shadow={2}>
                                    <Heading size="lg" style={{textAlign: "center", color: "white"}}>myBobcat</Heading>
                                    <Text fontSize={"xs"} style={{textAlign: "center", color: "white"}}>Developed
                                        by <Text bold>Ben
                                            Levy</Text> (Class of 2024)</Text>
                                </Box>
                                <Box p="2" bg="#9A1C1F" _text={{
                                    fontSize: 'md',
                                    fontWeight: 'medium',
                                    color: 'warmGray.50',
                                    letterSpacing: 'lg'
                                }} shadow={2}>
                                    <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}><Text
                                        bold>myBobcat</Text> is here for your everyday Byram Hills High School needs,
                                        from
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
                                    <Heading size="lg" style={{textAlign: "center", color: "white"}}>Mental Health
                                        Support is
                                        Here</Heading>
                                    <Text fontSize={"md"} style={{textAlign: "center", color: "white"}}>If you or
                                        someone else you know is struggling,
                                        calling or texting <Text style={{color: "black", fontSize: 20}}
                                                                 bold>988</Text> is here for you.</Text>
                                </Box>
                            </Stack>
                        </VStack>
                    </>
                )
            }
        </ScrollView>
    );
}
