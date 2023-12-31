import {useContext, useEffect, useState} from "react";

import {API_URL} from "@env";
import {Context} from "../Context";
import {RefreshControl, Text} from "react-native";
import {Alert, Box, Button, Divider, Heading, Input, ScrollView, Stack, VStack} from "native-base";

let API = API_URL;

if(!API_URL)
    API="https://mybobcat.simplexwebsites.com";

export default function IndividualSchedule({navigation}) {
    // refresh
    const [refreshing, setRefreshing] = useState(false);

    // default state for schedule
    const defaulScheduleState = {
        Day_1: {
            Period_1: {
                class_name: "",
                request_type: "POST"
            },
            Period_2: {
                class_name: "",
                request_type: "POST"
            },
            Period_3: {
                class_name: "",
                request_type: "POST"
            },
            Period_4: {
                class_name: "",
                request_type: "POST"
            },
            Period_5: {
                class_name: "",
                request_type: "POST"
            }
        },
        Day_2: {
            Period_1: {
                class_name: "",
                request_type: "POST"
            },
            Period_2: {
                class_name: "",
                request_type: "POST"
            },
            Period_3: {
                class_name: "",
                request_type: "POST"
            },
            Period_4: {
                class_name: "",
                request_type: "POST"
            },
            Period_5: {
                class_name: "",
                request_type: "POST"
            }
        },
        Day_3: {
            Period_1: {
                class_name: "",
                request_type: "POST"
            },
            Period_2: {
                class_name: "",
                request_type: "POST"
            },
            Period_3: {
                class_name: "",
                request_type: "POST"
            },
            Period_4: {
                class_name: "",
                request_type: "POST"
            },
            Period_5: {
                class_name: "",
                request_type: "POST"
            }
        },
        Day_4: {
            Period_1: {
                class_name: "",
                request_type: "POST"
            },
            Period_2: {
                class_name: "",
                request_type: "POST"
            },
            Period_3: {
                class_name: "",
                request_type: "POST"
            },
            Period_4: {
                class_name: "",
                request_type: "POST"
            },
            Period_5: {
                class_name: "",
                request_type: "POST"
            }
        },
        Day_5: {
            Period_1: {
                class_name: "",
                request_type: "POST"
            },
            Period_2: {
                class_name: "",
                request_type: "POST"
            },
            Period_3: {
                class_name: "",
                request_type: "POST"
            },
            Period_4: {
                class_name: "",
                request_type: "POST"
            },
            Period_5: {
                class_name: "",
                request_type: "POST"
            }
        },
        Day_6: {
            Period_1: {
                class_name: "",
                request_type: "POST"
            },
            Period_2: {
                class_name: "",
                request_type: "POST"
            },
            Period_3: {
                class_name: "",
                request_type: "POST"
            },
            Period_4: {
                class_name: "",
                request_type: "POST"
            },
            Period_5: {
                class_name: "",
                request_type: "POST"
            }
        },
        Day_7: {
            Period_1: {
                class_name: "",
                request_type: "POST"
            },
            Period_2: {
                class_name: "",
                request_type: "POST"
            },
            Period_3: {
                class_name: "",
                request_type: "POST"
            },
            Period_4: {
                class_name: "",
                request_type: "POST"
            },
            Period_5: {
                class_name: "",
                request_type: "POST"
            }
        },
        Day_8: {
            Period_1: {
                class_name: "",
                request_type: "POST"
            },
            Period_2: {
                class_name: "",
                request_type: "POST"
            },
            Period_3: {
                class_name: "",
                request_type: "POST"
            },
            Period_4: {
                class_name: "",
                request_type: "POST"
            },
            Period_5: {
                class_name: "",
                request_type: "POST"
            }
        }
    };


    // form input - store as an obj
    const [schedule, setSchedule] = useState(defaulScheduleState);
    const [error, setError] = useState(false);

    const {jwt, setJwt} = useContext(Context);

    const DayComponents = () => {
        // create all the day components
        let day_components = [];

        for(let day in schedule) {
            let day_component = [];
            for(let period in schedule[day]) {
                day_component.push(
                    <Stack style={{width: "75%"}} key={day + period} direction={"column"} space={3}>
                        <Box p="2" bg="#E79F2E" _text={{
                            fontSize: 'md',
                            fontWeight: 'medium',
                            color: 'warmGray.50',
                            letterSpacing: 'lg'
                        }} shadow={2}>
                            <Text style={{fontSize: 16, fontWeight: "bold", color: "white"}}>{period.replace("_", " ")}</Text>
                            <Divider style={{backgroundColor: "black", marginVertical: 5}}/>
                            <Input onChangeText={newSchedule => {
                                // determine POST/PUT/DELETE
                                let reqType = "POST";

                                if(newSchedule === "")
                                    reqType = "DELETE";
                                else if(schedule[day][period].class_name !== "")
                                    reqType = "PUT";

                                console.log(
                                    {
                                        ...schedule,
                                        [day]: {
                                            ...schedule[day],
                                            [period]: {
                                                post_type: reqType,
                                                class_name: newSchedule
                                            }
                                        }
                                    }
                                );

                                setSchedule({
                                    ...schedule,
                                    [day]: {
                                        ...schedule[day],
                                        [period]: {
                                            post_type: reqType,
                                            class_name: newSchedule
                                        }
                                    }
                                });
                            }} isRequired={true} w="100%"
                                   shadow={2}
                                   _light={{
                                       bg: "coolGray.100",
                                       _hover: {
                                           bg: "coolGray.200"
                                       },
                                       _focus: {
                                           bg: "coolGray.200:alpha.70"
                                       }
                                   }} _dark={{
                                bg: "coolGray.800",
                                _hover: {
                                    bg: "coolGray.900"
                                },
                                _focus: {
                                    bg: "coolGray.900:alpha.70"
                                }
                            }} placeholder="Class Name"/>
                        </Box>
                    </Stack>
                );
            }
            day_components.push(
                <Box style={{ marginVertical: 5, justifyContent: "center", flex: 1, alignItems: "center", width: "100%" }}>
                    <Text style={{fontSize: 20, fontWeight: "bold", color: "black", marginVertical: 5}}>{day.replace("_", " ")}</Text>
                    <Divider style={{marginVertical: 5, width: "75%"}}/>
                    {day_component}
                </Box>
            );
        }

        return day_components;
    };


    const refetchSchedule = () => {
        setRefreshing(true);
        fetch(API + "/individual_schedule", {
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
                // if no schedules, set schedule to default
                if(responseData.schedules.length === 0)
                    setSchedule(defaulScheduleState);
                else {
                    // set schedule - responseData.schedules
                    let newSchedule = {};
                    responseData.schedules.forEach(period => {
                        newSchedule = {
                            ...newSchedule,
                            ["Day_" + period.day_number]: {
                                ...newSchedule["Day_" + period.day_number],
                                ["Period_" + period.period]: {
                                    class_name: period.class_name,
                                    request_type: "POST"
                                }
                            }
                        };
                    });
                    setSchedule(newSchedule);
                }

                setRefreshing(false);
            })
            .catch(err => {
                // set error state to true and display err
                setError(true);
                setRefreshing(false);
            });
    };

    const handleSubmit = () => {
        for(let day in schedule) {
            for(let period in schedule[day]) {
                // check request type in schedule[day][period]
                if(schedule[day][period].request_type === "POST") {
                    // POST
                    fetch(API + "/individual_schedule", {
                        method: schedule[day][period].request_type,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": jwt.jwt
                        },
                        body: new URLSearchParams({
                            "day_number": day.split("_")[1],
                            "period": period.split("_")[1],
                            "class_name": schedule[day][period].class_name
                        }).toString(),
                    })
                        .then((response) => {
                            if (response.status !== 200)
                                throw "Failed to fetch schedule";
                            else
                                return response.json();
                        })
                        .then((responseData) => {
                            // redirect to home
                            return navigation.navigate("Home");
                        })
                        .catch(err => {
                            // set error state to true and display err
                            setError(true);
                        });
                } else if(schedule[day][period].request_type === "PUT") {
                    // PUT
                    fetch(API + "/individual_schedule/day/" + day.split("_")[1] + "/period/" + period.split("_")[1], {
                        method: schedule[day][period].request_type,
                        headers: {
                            "Authorization": jwt.jwt
                        },
                        body: new URLSearchParams({
                            "class_name": schedule[day][period].class_name
                        }).toString()
                    })
                        .then((response) => {
                            if (response.status !== 200)
                                throw "Failed to fetch schedule";
                            else
                                return response.json();
                        })
                        .then(_ => {
                            // redirect to home
                            return navigation.navigate("Home");
                        })
                        .catch(err => {
                            // set error state to true and display err
                            setError(true);
                        });

                } else if(schedule[day][period].request_type === "DELETE") {
                    // DELETE
                    fetch(API + "/individual_schedule/day/" + day.split("_")[1] + "/period/" + period.split("_")[1], {
                        method: schedule[day][period].request_type,
                        headers: {
                            "Authorization": jwt.jwt
                        }
                    })
                        .then((response) => {
                            if (response.status !== 200)
                                throw "Failed to fetch schedule";
                            else
                                return response.json();
                        })
                        .then(_ => {
                            // redirect to home
                            return navigation.navigate("Home");
                        })
                        .catch(err => {
                            // set error state to true and display err
                            setError(true);
                        });
                }
            }
        }
    };

    // useEffect on focus to refetch schedule
    useEffect(
        () => {
            navigation.addListener("focus", _ => {
               refetchSchedule();
            });
        }, [navigation]);

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refetchSchedule}/>
        }>
            {
                error ? (
                    <Box alignItems="center" style={{alignItems: "center", justifyContent: "center"}}>
                        <Alert w="75%" status={"error"}>
                            <VStack space={2} flexShrink={1} w="100%">
                                <Text style={{textAlign: "center", fontSize: 22}} color="coolGray.800">
                                    Failed to make a request. {"\n"} If
                                    this issue persists, contact Ben Levy.
                                </Text>
                                <Button style={{marginVertical: 10, backgroundColor: "#424242"}}
                                        onPress={() => setError(false)}>Return to Schedule</Button>
                            </VStack>
                        </Alert>
                    </Box>
                ) : (
                    <Box style={{flex:1, alignItems: "center", justifyContent: "center"}}>
                        <Heading size="lg" style={{textAlign: "center", marginVertical: 10}}>Manage Schedule</Heading>
                        <Divider style={{width: "85%"}}/>

                        <DayComponents/>
                        <Button style={{marginVertical: 10, width: "75%"}}
                                onPress={() => handleSubmit()}>Change Schedule</Button>
                    </Box>
                )
            }
        </ScrollView>
    );

}