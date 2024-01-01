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
    const defaultScheduleState = [
        [
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            }
        ],
        [
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            }
        ],
        [
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            }
        ],
        [
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            }
        ],
        [
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            }
        ],
        [
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            }
        ],
        [
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            }
        ],
        [
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            },
            {
                class_name: "",
                request_type: "POST"
            }
        ]
    ];

    // form input - store as an obj
    const [schedule, setSchedule] = useState(defaultScheduleState);
    const [error, setError] = useState(false);

    const {jwt, setJwt} = useContext(Context);

    const DayComponents = () => {
        // create all the day components
        let day_components = [];
        let key = 0;

        schedule.forEach((day, day_num) => {
            let day_component = [];
            day.forEach((period, period_num) => {
                day_component.push(
                    <Stack style={{width: "75%"}} key={key} direction={"column"} space={3}>
                        <Box p="2" bg="#E79F2E" _text={{
                            fontSize: 'md',
                            fontWeight: 'medium',
                            color: 'warmGray.50',
                            letterSpacing: 'lg'
                        }} shadow={2}>
                            <Text style={{fontSize: 16, fontWeight: "bold", color: "white"}}>Period {period_num + 1}</Text>
                            <Divider style={{backgroundColor: "black", marginVertical: 5}}/>
                            <Input defaultValue={period.class_name} onChangeText={newSchedule => {
                                let newScheduleObj = schedule;
                                newScheduleObj[day_num][period_num].class_name = newSchedule;
                                setSchedule(newScheduleObj);
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
            });

            day_components.push(
                <Box style={{ marginVertical: 5, justifyContent: "center", flex: 1, alignItems: "center", width: "100%" }}>
                    <Text style={{fontSize: 20, fontWeight: "bold", color: "black", marginVertical: 5}}>Day {day_num + 1}</Text>
                    <Divider style={{marginVertical: 5, width: "75%"}}/>
                    {day_component}
                </Box>
            );

            // increment key to avoid non-unique keys for above
            key++;
        });

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
                    setSchedule(defaultScheduleState);
                else {
                    // set schedule - responseData.schedules
                    let newSchedule = schedule;
                    responseData.schedules.forEach(period => {
                        newSchedule[period.day_number-1][period.period-1].class_name = period.class_name;
                        newSchedule[period.day_number-1][period.period-1].request_type = "PUT";
                    });
                    setSchedule(newSchedule);
                    console.log(newSchedule);
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
        schedule.forEach((day, day_num) => {
            day.forEach((period, period_num) => {
                // check request type in schedule[day][period]
                if(period.request_type === "POST") {
                    console.log("bruh?")
                    // POST
                    fetch(API + "/individual_schedule", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": jwt.jwt
                        },
                        body: new URLSearchParams({
                            "day_number": day_num + 1,
                            "period": period_num +1,
                            "class_name": period.class_name
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
                } else if(period.request_type === "PUT") {
                    console.log("not bruh :)")
                    // PUT
                    fetch(API + "/individual_schedule/day/" + (day_num + 1) + "/period/" + (period_num + 1), {
                        method: "PUT",
                        headers: {
                            "Authorization": jwt.jwt,
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: new URLSearchParams({
                            "class_name": period.class_name
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
                    fetch(API + "/individual_schedule/day/" + (day_num + 1) + "/period/" + (period_num + 1), {
                        method: "DELETE",
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
            });
        });
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