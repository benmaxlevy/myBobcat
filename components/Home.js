import {View, RefreshControl, Linking, Image, Dimensions} from "react-native";
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
    const [adverts, setAdverts] = useState([]);
    const [error, setError] = useState(false);

    const getPeriod = _ => {
        const schedule = {
            1: [1, 2, 5, 6, 7],
            2: [1, 3, 4, 6, 8],
            3: [2, 3, 4, 5, 7],
            4: [1, 2, 5, 6, 8],
            5: [3, 4, 5, 7, 8],
            6: [1, 2, 3, 6, 7],
            7: [1, 4, 5, 6, 8],
            8: [2, 3, 4, 7, 8]
        }

        // get hh:mm
        const date = new Date();
        const time = +(date.getHours() + "." + date.getMinutes());

        // if between 8:10 and 9:14, return 0
        if(time >= 8.10 && time <= 9.14)
            return schedule[day][0];
        // if between 9:18 and 10:22, return 1
        else if(time >= 9.18 && time <= 10.22)
            return schedule[day][1];
        // if between 10:26 and 11:30, return 2
        else if(time >= 10.26 && time <= 11.30)
            return schedule[day][2];
        // if between 12:13 and 1:17, return 3
        else if(time >= 12.13 && time <= 13.17)
            return schedule[day][3];
        // if between 1:21 and 2:25, return 4
        else if(time >= 13.21 && time <= 14.25)
            return schedule[day][4];
        else
            return -1;

    };

    useEffect(
        () => {
            navigation.addListener("focus", _ => {
                setRefreshing(true);

                // schedule
                fetch(API + "/schedule")
                    .then((resp) => resp.json())
                    .then((json) => {
                        setDay(json.day);
                    })
                    .catch((error) => setError(true))
                    .finally(() => setRefreshing(false));

                // adverts
                fetch(API + "/adverts")
                    .then((resp) => resp.json())
                    .then((json) => {
                        // for each advert, append url to adverts state
                        let tempAdverts = [];
                        json.adverts.forEach(a => {
                            tempAdverts.push({id: a.id, file_path: API +a.file_path});
                        });

                        setAdverts(tempAdverts);
                    })
                    .catch(() => setError(true))
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

    const refetchAdverts = _ => {
        fetch(API + "/adverts")
            .then((resp) => resp.json())
            .then((json) => {
                // for each advert, append url to adverts state
                let tempAdverts = [];
                json.adverts.forEach(a => {
                    tempAdverts.push({id: a.id, file_path: API +a.file_path});
                });

                setAdverts(tempAdverts);
            })
            .catch(() => setError(true))
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
            <RefreshControl refreshing={refreshing} onRefresh={_ => {refetchAdverts(); refetchDay(); getPeriod()}}/>
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
                                        onPress={() => setError(false)}>Return to Home</Button>
                            </VStack>
                        </Alert>
                    </Box>
                ) : (
                    <>
                        {
                            adverts.map(ad => {
                                return (
                                    <View key={ad.id}>
                                        <Image key={ad.id} style={{width: Dimensions.get("window").width, height: 90}} source={{uri: ad.file_path}}/>
                                    </View>
                                )
                            })
                        }
                        <Box p="2" bg="#9A1C1F" _text={{
                            fontSize: 'md',
                            fontWeight: 'medium',
                            color: 'warmGray.50',
                            letterSpacing: 'lg'
                        }} shadow={2}>
                            <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}>Today is day <Text
                                bold>{day}</Text>,
                                {(getPeriod() === -1) ? (
                                    <Text bold> no period right now</Text>
                                ) : (
                                    <> period <Text bold>{getPeriod()}</Text></>
                                )}
                                !</Text>
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
                                <Box p="2" bg="#002855" _text={{
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
                            <Stack mb="2.5" mt="1.5" direction="column">
                                <Box p="2" bg="#E79F2E"
                                shadow={2}>
                                    {/* link to ESchool */}
                                    <Button onPress={async () => {
                                        await Linking.openURL("https://esdstudentportal.lhric.org/Login.aspx?ReturnUrl=%2fbyramhills");
                                    }}>Student Portal</Button>
                                </Box>
                            </Stack>
                        </VStack>
                    </>
                )
            }
        </ScrollView>
    );
}
