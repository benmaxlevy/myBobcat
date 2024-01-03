import {Dimensions, Image, Linking, RefreshControl, View} from "react-native";
import {Alert, Box, Button, Heading, ScrollView, Select, Stack, Text, VStack} from 'native-base';
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
    const [day, setDay] = useState(1);
    const [type, setType] = useState("reg");
    const [adverts, setAdverts] = useState([]);
    const [error, setError] = useState(false);
    const [periodInfo, setPeriodInfo] = useState([]);

    useEffect(
        () => {
            navigation.addListener("focus", _ => {
                setRefreshing(true);
                // schedule
                fetch(API + "/schedule")
                    .then((resp) => resp.json())
                    .then((json) => {
                        if(json && json["day"]) {
                            setDay(json["day"].day);
                            setType(json["day"].type);
                        }
                    })
                    .catch((error) => {

                        setError(true)
                    })
                    .finally(() => setRefreshing(false));

                getPeriod(day)
                    .then(info => setPeriodInfo(info))
                    .catch((error) => {

                        setError(true)
                    });

                // adverts
                fetch(API + "/adverts")
                    .then((resp) => resp.json())
                    .then((json) => {
                        // for each advert, append url to adverts state
                        let tempAdverts = [];
                        json.adverts.forEach(a => {
                            tempAdverts.push({id: a.id, file_path: API + a.file_path});
                        });

                        setAdverts(tempAdverts);
                    })
                    .catch(() => {

                        setError(true)
                    })
                    .finally(() => setRefreshing(false));
            });
        });

    const refetchDay = _ => {
        setRefreshing(true);
        fetch(API + "/schedule")
            .then((resp) => resp.json())
            .then((json) => {
                setDay(json["day"].day);
                setType(json["day"].type);
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
                    tempAdverts.push({id: a.id, file_path: API + a.file_path});
                });

                setAdverts(tempAdverts);
            })
            .catch(() => setError(true))
            .finally(() => setRefreshing(false));
    };

    const changeDay = (newDay = day, newType = type) => {
        fetch(API + "/schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": jwt.jwt
            },
            body: new URLSearchParams({
                "day": newDay,
                "type": newType
            }).toString(),
        })
            .then((response) => {
                if (response.status !== 200) {
                    // check permissions
                    throw "Error (check permissions)";
                } else
                    return response.json();
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

    // function to get class name
    const getClassName = (day, period) => {
        if(jwt && !(Object.keys(jwt).length === 0 && jwt.constructor === Object)) {
            return fetch(API + "/individual_schedule/day/" + day + "/period/" + period, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": jwt.jwt
                }
            })
                .then((response) => {
                    if (response.status !== 200)
                        throw "Failed to fetch schedule";
                    else
                        return response.json()
                })
                .then((responseData) => {
                    if (!responseData.className)
                        return "";
                    else
                        return responseData.className;
                })
                .catch(err => {
                    // set error state to true and display err
                    setError(true);
                });
        } else
            return "";

    };

    const getPeriod = async day => {
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
        let time;

        // if minutes is single-digit, reflect that
        if(date.getMinutes() < 10)
            time = +(date.getHours() + "." + 0 + date.getMinutes());
        else
            time = +(date.getHours() + "." + date.getMinutes());

        // check that day is defined
        if (day === "") {
            refetchDay();
        }

        if (type === "reg") {
            // if between 8:10 and 9:14, return 0
            if (time >= 8.10 && time <= 9.14) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(9);
                periodEnd.setMinutes(14);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);
                return [schedule[day][0], diff, await getClassName(day, 1)];
            }
            // if between 9:18 and 10:22, return 1
            else if (time >= 9.18 && time <= 10.22) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(10);
                periodEnd.setMinutes(22);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][1], diff, await getClassName(day, 2)];
            }
            // if between 10:26 and 11:30, return 2
            else if (time >= 10.26 && time <= 11.30) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(11);
                periodEnd.setMinutes(30);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][2], diff, await getClassName(day, 3)];
            }
            // if between 12:13 and 1:17, return 3
            else if (time >= 12.13 && time <= 13.17) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(13);
                periodEnd.setMinutes(17);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                try {
                    await getClassName(day, 4)
                } catch (e) {
                    console.log(JSON.stringify(e));
                }

                return [schedule[day][3], diff, await getClassName(day, 4)];
            }
            // if between 1:21 and 2:25, return 4
            else if (time >= 13.21 && time <= 14.25) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(14);
                periodEnd.setMinutes(25);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][4], diff, await getClassName(day, 5)];
            }
            else
                return -1;
        } else if (type === "one_delay") {
            // if between 9:00 and 9:55, return 0
            if (time >= 9.00 && time <= 9.55) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(9);
                periodEnd.setMinutes(55);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][0], diff, await getClassName(day, 1)];
            }
            // if between 9:59 and 10:54, return 1
            else if (time >= 9.59 && time <= 10.54) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(10);
                periodEnd.setMinutes(54);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][1], diff, await getClassName(day, 2)];
            }
            // if between 10:58 and 11:53, return 2
            else if (time >= 10.58 && time <= 11.53) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(11);
                periodEnd.setMinutes(53);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][2], diff, await getClassName(day, 3)];
            }
            // if between 12:31 and 1:26, return 3
            else if (time >= 12.31 && time <= 13.26) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(13);
                periodEnd.setMinutes(26);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][3], diff, await getClassName(day, 4)];
            }
            // if between 1:30 and 2:25, return 4
            else if (time >= 13.30 && time <= 14.25) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(14);
                periodEnd.setMinutes(25);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][4], diff, await getClassName(day, 5)];
            }
            else
                return -1;
        } else if (type === "two_delay") {
            // if between 9:55 and 10:40, return 0
            if (time >= 9.55 && time <= 10.40) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(10);
                periodEnd.setMinutes(40);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][0], diff, await getClassName(day, 1)];
            }
            // if between 10:44 and 11:29, return 1
            else if (time >= 10.44 && time <= 11.29) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(11);
                periodEnd.setMinutes(29);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][1], diff, await getClassName(day, 2)];
            }
            // if between 11:33 and 12:18, return 2
            else if (time >= 11.33 && time <= 12.18) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(12);
                periodEnd.setMinutes(18);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][2], diff, await getClassName(day, 3)];
            }
            // if between 12:51 and 1:36, return 3
            else if (time >= 12.51 && time <= 13.36) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(13);
                periodEnd.setMinutes(36);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][3], diff, await getClassName(day, 4)];
            }
            // if between 1:40 and 2:25, return 4
            else if (time >= 13.40 && time <= 14.25) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(14);
                periodEnd.setMinutes(25);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][4], diff, await getClassName(day, 5)];
            }
            else
                return -1;
        } else if (type === "three_delay") {
            // if between 10:45 and 11:20, return 0
            if (time >= 10.45 && time <= 11.20) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(11);
                periodEnd.setMinutes(20);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][0], diff, await getClassName(day, 1)];
            }
            // if between 11:24 and 11:59, return 1
            else if (time >= 11.24 && time <= 11.59) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(11);
                periodEnd.setMinutes(59);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][1], diff, await getClassName(day, 2)];
            }
            // if between 12:03 and 12:38, return 2
            else if (time >= 12.03 && time <= 12.38) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(12);
                periodEnd.setMinutes(38);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][2], diff, await getClassName(day, 3)];
            }
            // if between 1:11 and 1:46, return 3
            else if (time >= 13.11 && time <= 13.46) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(13);
                periodEnd.setMinutes(46);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][3], diff, await getClassName(day, 4)];
            }
            // if between 1:50 and 2:25, return 4
            else if (time >= 13.50 && time <= 14.25) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(14);
                periodEnd.setMinutes(25);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][4], diff, await getClassName(day, 5)];
            }
            else
                return -1;
        } else if (type === "three_dismissal") {
            // if between 8:00 and 8:38, return 0
            if (time >= 8.00 && time <= 8.38) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(8);
                periodEnd.setMinutes(38);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][0], diff, await getClassName(day, 1)];
            }
            // if between 8:42 and 9:20, return 1
            else if (time >= 8.42 && time <= 9.20) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(9);
                periodEnd.setMinutes(20);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][1], diff, await getClassName(day, 2)];
            }
            // if between 9:24 and 10:02, return 2
            else if (time >= 9.24 && time <= 10.02) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(10);
                periodEnd.setMinutes(2);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][2], diff, await getClassName(day, 3)];
            }
            // if between 10:06 and 10:44
            else if (time >= 10.06 && time <= 10.44) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(10);
                periodEnd.setMinutes(44);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][3], diff, await getClassName(day, 4)];
            }
            // if between 10:48 and 11:26, return 4
            else if (time >= 10.48 && time <= 11.26) {
                // get end Date obj
                const periodEnd = new Date();
                periodEnd.setHours(11);
                periodEnd.setMinutes(26);

                // get difference in minutes between end and current
                const diff = Math.floor(((periodEnd-date)/1000)/60);

                return [schedule[day][4], diff, await getClassName(day, 5)];
            }
            else
                return -1;
        } else
            return -1;
    };

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_ => {
                getPeriod(day).then(info => {
                    setPeriodInfo(info);
                }).catch(_ => {
                    setError(true);
                });
                refetchAdverts();
                refetchDay();
            }}/>
        }>
            {
                error ? (
                    <Box alignItems="center" style={{alignItems: "center", justifyContent: "center"}}>
                        <Alert w="75%" status={"error"}>
                            <VStack space={2} flexShrink={1} w="100%">
                                <Text style={{textAlign: "center", fontSize: 22}} color="coolGray.800">
                                    Failed to make a request. Check whether or not you have this
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
                                        <Image key={ad.id} style={{width: Dimensions.get("window").width, height: 90}}
                                               source={{uri: ad.file_path}}/>
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
                            {/* if it's a weekend day, no school! */}
                            {((new Date()).getDay() === 0 || (new Date()).getDay() === 6) ? (
                                <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}>No school
                                    today!</Text>
                            ) : (
                                (day === "") ? (
                                    <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}>Loading
                                        scheduling...</Text>
                                ) : (
                                    <Text fontSize={"lg"} style={{textAlign: "center", color: "white"}}>
                                        Today is day <Text bold>{day}</Text>,
                                        {(periodInfo === -1) ? (
                                            <Text bold> no period right now</Text>
                                        ) : (
                                            <> period <Text
                                                bold>{(periodInfo)[0]} {((periodInfo)[2] !== "") ? (<>({(periodInfo)[2]}) </>) : (<></>)}</Text>with <Text
                                                bold>{(periodInfo)[1]} minutes left</Text></>
                                        )}
                                        !</Text>
                                )
                            )
                            }

                            {/* if  admin, button to change schedule */}
                            {(jwt && (jwt.permissions === "admin")) ? (
                                day === "1" ? (
                                    <Box alignItems="center">
                                        <Button style={{marginBottom: 5}} onPress={() => {
                                            return changeDay(parseInt(day) + 1);
                                        }}>Increment</Button>
                                        <Select style={{color: "white"}} minWidth={200} selectedValue={type}
                                                placeholder="Type of Day" accessibilityLabel={"Type of Day"}
                                                onValueChange={itemValue => {
                                                    return changeDay(day, itemValue);
                                                }}>
                                            <Select.Item label="Regular" value="reg"/>
                                            <Select.Item label="One Hour Delay" value="one_delay"/>
                                            <Select.Item label="Two Hour Delay" value="two_delay"/>
                                            <Select.Item label="Three Hour Delay" value="three_delay"/>
                                            <Select.Item label="Three Hour Early Dismissal" value="three_dismissal"/>
                                        </Select>
                                    </Box>
                                ) : (day === "8" ? (
                                    <Box alignItems="center">
                                        <Button style={{marginBottom: 5}} onPress={() => {
                                            return changeDay(parseInt(day) - 1);
                                        }}>Decrement</Button>
                                        <Select style={{color: "white"}} minWidth={200} selectedValue={type}
                                                placeholder="Type of Day" accessibilityLabel={"Type of Day"}
                                                onValueChange={itemValue => {
                                                    return changeDay(day, itemValue);
                                                }}>
                                            <Select.Item label="Regular" value="reg"/>
                                            <Select.Item label="One Hour Delay" value="one_delay"/>
                                            <Select.Item label="Two Hour Delay" value="two_delay"/>
                                            <Select.Item label="Three Hour Delay" value="three_delay"/>
                                            <Select.Item label="Three Hour Early Dismissal" value="three_dismissal"/>
                                        </Select>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Box style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginVertical: 5
                                        }}>
                                            <Button style={{marginRight: 5}} onPress={() => {
                                                return changeDay(parseInt(day) - 1);
                                            }}>Decrement</Button>
                                            <Button onPress={() => {
                                                return changeDay(parseInt(day) + 1);
                                            }}>Increment</Button>
                                        </Box>
                                        <Select style={{color: "white"}} selectedValue={type} placeholder="Type of Day"
                                                accessibilityLabel={"Type of Day"} onValueChange={itemValue => {
                                            return changeDay(day, itemValue);
                                        }}>
                                            <Select.Item label="Regular" value="reg"/>
                                            <Select.Item label="One Hour Delay" value="one_delay"/>
                                            <Select.Item label="Two Hour Delay" value="two_delay"/>
                                            <Select.Item label="Three Hour Delay" value="three_delay"/>
                                            <Select.Item label="Three Hour Early Dismissal" value="three_dismissal"/>
                                        </Select>
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
                                    <Button style={{marginTop: 5}} onPress={() => {navigation.navigate("Mental Health Resources")}}>More Resources</Button>
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
