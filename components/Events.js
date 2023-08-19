import {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {Box, Divider, Heading, ScrollView, Stack, VStack, Button, Modal, FormControl, Input, Alert} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {API_URL} from '@env';

import {Context} from '../Context';
import {useContext} from "react";

export default function Events({navigation}) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDateTime, setShowDateTime] = useState(false);

    // modal
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState("post");

    // create form values
    const [name, setName] = useState("");
    const [datetime, setDatetime] = useState();

    // put form values
    const [id, setId] = useState();

    const [error, setError] = useState(false);

    const {jwt, setJwt} = useContext(Context);

    const refetchEvents = () => {
        fetch(API_URL + "/events")
            .then((resp) => resp.json())
            .then((json) => {
                let e = json.events
                e.sort((a, b) => {
                    const dateA = new Date(a.date_time);
                    const dateB = new Date(b.date_time);
                    return dateA - dateB;
                });
                setEvents(e);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    useEffect(
        () => {
            fetch(API_URL + "/events")
                .then((resp) => resp.json())
                .then((json) => {
                    let e = json.events
                    e.sort((a, b) => {
                        const dateA = new Date(a.date_time);
                        const dateB = new Date(b.date_time);
                        return dateA - dateB;
                    });
                    setEvents(e);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }, []);

    const deletePost = id => {
        fetch(API_URL + "/events/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": jwt.jwt
            }
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
                setLoading(true);
                refetchEvents();
                navigation.navigate('Events');
            })
            .catch(err => {
                // set error state to true and display err
                setError(true);
            });
    };
    const postEvent = (name, datetime) => {
        // type is either "post" or "put"
        if (type === "post") {
            fetch(API_URL + "/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": jwt.jwt
                },
                body: new URLSearchParams({
                    "name": name,
                    "date_time": datetime.toString()
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
                    setLoading(true);
                    refetchEvents();
                    // clear state
                    setName();
                    setDatetime();
                    navigation.navigate('Events');
                })
                .catch(err => {
                    // set error state to true and display err
                    setError(true);
                });
        } else if (type === "put") {
            fetch(API_URL + "/events/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": jwt.jwt
                },
                body: new URLSearchParams({
                    "name": name,
                    "date_time": datetime.toString()
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
                    setLoading(true);
                    refetchEvents();
                    // clear state
                    setName();
                    setDatetime();
                    setId();
                    navigation.navigate('Events');
                })
                .catch(err => {
                    // set error state to true and display err
                    setError(true);
                });
        }
    };

    return (
        // if admin, display edit and delete
        // if leader, display edit and delete IF they created the event
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignContent: "center"}}>
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
                        <VStack space="2.5" mt="4" px="8">
                            <Heading size="lg" style={{textAlign: "center"}}>Events</Heading>
                            {/* if leader or admin, button to create an event */}
                            {(jwt && (jwt.permissions === "admin" || jwt.permissions === "leader")) ? (
                                <Box alignItems="center">
                                    <Button onPress={() => {
                                        // set type to post
                                        setType("post");
                                        return setShowModal(true);
                                    }}>Create an Event</Button>
                                    <DateTimePickerModal
                                        isVisible={showDateTime}
                                        mode="datetime"
                                        onConfirm={date => {
                                            setShowDateTime(false);
                                            setDatetime(date);
                                        }}
                                        onCancel={() => setShowDateTime(false)}
                                    />
                                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                        <Modal.Content maxWidth="400px">
                                            <Modal.CloseButton/>
                                            <Modal.Header>Create/Edit an Event</Modal.Header>
                                            <Modal.Body>
                                                <FormControl>
                                                    <FormControl.Label>Name of the Event</FormControl.Label>
                                                    <Input onChangeText={name => setName(name)}
                                                           value={name ? name : ""}/>
                                                </FormControl>
                                                <FormControl mt="3">
                                                    <FormControl.Label>Date and Time of the Event</FormControl.Label>
                                                    <Button style={{
                                                        width: "75%",
                                                        left: "25%",
                                                        right: "25%",
                                                        marginVertical: 10
                                                    }} onPress={() => setShowDateTime(true)}>Select Date and
                                                        Time</Button>
                                                    <Input editable={false} isReadOnly={true} selectTextOnFocus={false}
                                                           isDisabled={true}
                                                           value={datetime ? datetime.toLocaleString() : ""}/>
                                                </FormControl>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button.Group space={2}>
                                                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                                        setShowModal(false);
                                                    }}>
                                                        Cancel
                                                    </Button>
                                                    <Button onPress={() => {
                                                        setShowModal(false);
                                                        postEvent(name, datetime);
                                                    }}>
                                                        Save
                                                    </Button>
                                                </Button.Group>
                                            </Modal.Footer>
                                        </Modal.Content>
                                    </Modal>
                                </Box>
                            ) : (<></>)
                            }
                            <Divider/>
                            {loading ? (
                                <Text>Loading events...</Text>
                            ) : (
                                events.map((post) => {
                                    return (
                                        <Stack key={post.id} mb="2.5" mt="1.5" direction="column" space={3}>
                                            <Box p="2" bg="#E79F2E" _text={{
                                                fontSize: 'md',
                                                fontWeight: 'medium',
                                                color: 'warmGray.50',
                                                letterSpacing: 'lg'
                                            }} shadow={2}>
                                                <Text>{post.name} @ {(new Date(post.date_time)).toLocaleString('en-US')}</Text>
                                                {
                                                    (jwt && (jwt.permissions === "admin" || post.creator_id === jwt.userId)) ? (
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            flexWrap: 'wrap',
                                                            marginVertical: 5,
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}>
                                                            <Button w="20%" onPress={() => {
                                                                setName(post.name);
                                                                setDatetime(post.date_time);
                                                                setType("put");
                                                                setId(post.id);
                                                                return setShowModal(true);
                                                            }
                                                            }>Edit</Button>
                                                            <Button w="20%" style={{
                                                                backgroundColor: "#E8003F",
                                                                marginHorizontal: 5
                                                            }} onPress={() => deletePost(post.id)}>Delete</Button>
                                                        </View>
                                                    ) : (<></>)
                                                }
                                            </Box>
                                        </Stack>
                                    );
                                })
                            )}
                        </VStack>
                    )
                }
            </ScrollView>
        </View>
    );
}