import {useEffect, useState} from "react";
import {Text, View, RefreshControl, Linking} from "react-native";
import {
    Box,
    Divider,
    Heading,
    ScrollView,
    Stack,
    VStack,
    Button,
    Modal,
    FormControl,
    Input,
    Alert,
    Select, CheckIcon
} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {API_URL} from '@env';

let API = API_URL;

if (!API_URL) {
    API = "https://mybobcat.simplexwebsites.com";
}

import {Context} from '../Context';
import {useContext} from "react";

export default function Events({navigation}) {
    // refresh
    const [refreshing, setRefreshing] = useState(false);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDateTime, setShowDateTime] = useState(false);

    // modal
    const [showModal, setShowModal] = useState(false);

    // create form values
    const [name, setName] = useState("");
    const [eventType, setEventType] = useState("");
    const [datetime, setDatetime] = useState();

    const [error, setError] = useState(false);

    const {jwt, setJwt} = useContext(Context);

    const refetchEvents = () => {
        setRefreshing(true);
        fetch(API + "/events")
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
            .finally(() => setRefreshing(false));
    };

    useEffect(
        () => {
            navigation.addListener("focus", _ => {
                setRefreshing(true);
                fetch(API + "/events")
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
                    .finally(() => setRefreshing(false));
            });
        }, [navigation]);

    const deletePost = id => {
        fetch(API + "/events/" + id, {
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

    const putEvent = (id, name, datetime, type, approved = false) => {
        fetch(API + "/events/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": jwt.jwt
            },
            body: new URLSearchParams({
                "name": name,
                "date_time": datetime.toString(),
                "approved": approved,
                "type": type
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
                setName("");
                setDatetime("");
                setEventType("");
                navigation.navigate('Event Requests');
            })
            .catch(err => {
                // set error state to true and display err
                setError(true);
            });

    };

    return (
        // if admin, display edit and delete
        // if leader, display edit and delete IF they created the event
        <ScrollView contentContainerStyle={{flexGrow: 1}} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refetchEvents}/>
        }>
            {
                error ? (
                    <Box alignItems="center" style={{alignItems: "center", justifyContent: "center"}}>
                        <Alert w="75%" status={"error"}>
                            <VStack space={2} flexShrink={1} w="100%">
                                <Text style={{textAlign: "center", fontSize: 22}} color="coolGray.800">
                                    Failed to edit an event. Check whether or not you have this
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
                        <Heading size="lg"
                                 style={{textAlign: "center"}}>{(jwt.permissions === "leader") ? "Your " : ("")}Event
                            Requests</Heading>
                        <Divider/>
                        {
                            events.map((post) => {
                                    // if  approved, don't show it
                                    if (post.approved === 0 && (jwt.permissions === "admin" || post.creator_id === jwt.userId))
                                        return (
                                            <Stack key={post.id} mb="2.5" mt="1.5" direction="column" space={3}>
                                                <Box p="2" bg="#E79F2E" _text={{
                                                    fontSize: 'md',
                                                    fontWeight: 'medium',
                                                    color: 'warmGray.50',
                                                    letterSpacing: 'lg'
                                                }} shadow={2}>
                                                    <Text>{post.name} @ {(new Date(post.date_time)).toLocaleString('en-US')}</Text>

                                                    <View style={{
                                                        flexDirection: 'row',
                                                        flexWrap: 'wrap',
                                                        marginVertical: 5,
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}>
                                                        {
                                                            (jwt.permissions === "admin") ? (
                                                                <Button w="25%" style={{
                                                                    backgroundColor: "#009252",
                                                                    marginHorizontal: 5
                                                                }} onPress={() => {
                                                                    putEvent(post.id, post.name, post.date_time, post.type,1);
                                                                }
                                                                }>Approve</Button>) : (<></>)
                                                        }
                                                        <Button w="25%" onPress={() => {
                                                            setName(post.name);
                                                            setDatetime(post.date_time);
                                                            setEventType(post.type);
                                                            return setShowModal(true);
                                                        }
                                                        }>Edit</Button>
                                                        <Button w="25%" style={{
                                                            backgroundColor: "#E8003F",
                                                            marginHorizontal: 5
                                                        }} onPress={() => deletePost(post.id)}>Delete</Button>
                                                        <Modal isOpen={showModal}
                                                               onClose={() => setShowModal(false)}>
                                                            <Modal.Content maxWidth="400px">
                                                                <Modal.CloseButton/>
                                                                <Modal.Header>Edit an Event</Modal.Header>
                                                                <Modal.Body>
                                                                    <FormControl>
                                                                        <FormControl.Label>Name of the
                                                                            Event</FormControl.Label>
                                                                        <Input onChangeText={name => setName(name)}
                                                                               value={name ? name : ""}/>
                                                                    </FormControl>
                                                                    <FormControl>
                                                                        <FormControl.Label>Type of the
                                                                            Event</FormControl.Label>
                                                                        <Select style={{marginVertical: 5}}
                                                                                selectedValue={eventType ? eventType : ""}
                                                                                minWidth="200"
                                                                                accessibilityLabel="Event Type"
                                                                                placeholder="Type of Event" _selectedItem={{
                                                                            bg: "teal.600",
                                                                            endIcon: <CheckIcon size="5"/>
                                                                        }} mt={1}
                                                                                onValueChange={itemValue => setEventType(itemValue)}>
                                                                            <Select.Item label="Schoolwide"
                                                                                         value={"schoolwide"}/>
                                                                            <Select.Item label="Club" value={"club"}/>
                                                                        </Select>
                                                                    </FormControl>
                                                                    <FormControl mt="3">
                                                                        <FormControl.Label>Date and Time of the
                                                                            Event</FormControl.Label>
                                                                        <Button style={{
                                                                            width: "75%",
                                                                            left: "25%",
                                                                            right: "25%",
                                                                            marginVertical: 10
                                                                        }} onPress={() => setShowDateTime(true)}>Select
                                                                            Date and
                                                                            Time</Button>
                                                                        <Input editable={false} isReadOnly={true}
                                                                               selectTextOnFocus={false}
                                                                               isDisabled={true}
                                                                               value={datetime ? datetime.toLocaleString() : ""}/>
                                                                    </FormControl>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button.Group space={2}>
                                                                        <Button variant="ghost"
                                                                                colorScheme="blueGray"
                                                                                onPress={() => {
                                                                                    setShowModal(false);
                                                                                }}>
                                                                            Cancel
                                                                        </Button>
                                                                        <Button onPress={() => {
                                                                            setShowModal(false);
                                                                            putEvent(post.id, post.name, post.date_time, eventType, post.approved);
                                                                        }}>
                                                                            Save
                                                                        </Button>
                                                                    </Button.Group>
                                                                </Modal.Footer>
                                                            </Modal.Content>
                                                        </Modal>
                                                    </View>

                                                </Box>
                                            </Stack>
                                        );
                                }
                            )}
                    </VStack>
                )
            }
        </ScrollView>
    );
}
