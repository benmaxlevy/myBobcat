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
    CheckIcon, Select
} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {API_URL} from '@env';

let API = API_URL;

if (!API_URL) {
    API = "https://mybobcat.simplexwebsites.com";
}

import {setJWT, getJWT} from "../JWTHelper";
import {Context} from '../Context';
import {useContext} from "react";

export default function Users({navigation}) {
    // refresh
    const [refreshing, setRefreshing] = useState(false);

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);

    // modal states
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [permissions, setPermissions] = useState();

    //const {jwt, setJwt} = useContext(Context);

    getJWT().then(jwt => {

        const fetchUsers = _ => {
            setRefreshing(true);
            fetch(API + "/users", {
                headers: {
                    "Authorization": jwt.jwt
                },
            })
                .then(resp => {
                    return resp.json()
                })
                .then(json => {
                    setUsers(json.users)
                })
                .catch(error => setError(true))
                .finally(_ => setRefreshing(false));
        };

        const putUsers = _ => {
            fetch(API + "/users/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": jwt.jwt
                },
                body: new URLSearchParams({
                    "name": name,
                    "email": email,
                    "permissions": permissions
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
                    fetchUsers();
                    // clear state
                    navigation.navigate('Manage Users');
                })
                .catch(err => {
                    // set error state to true and display err
                    setError(true);
                });
        };

        useEffect(
            _ => {
                fetchUsers();
            }, [navigation]
        );

        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={fetchUsers}/>
            }>
                {
                    error ? (
                        <Box alignItems="center" style={{alignItems: "center", justifyContent: "center"}}>
                            <Alert w="75%" status={"error"}>
                                <VStack space={2} flexShrink={1} w="100%">
                                    <Text style={{textAlign: "center", fontSize: 22}} color="coolGray.800">
                                        Failed to make user request. Check whether or not you have this
                                        permission. {"\n"} If
                                        this issue persists, contact Ben Levy.
                                    </Text>
                                    <Button style={{marginVertical: 10, backgroundColor: "#424242"}}
                                            onPress={() => setError(false)}>Return to Users</Button>
                                </VStack>
                            </Alert>
                        </Box>
                    ) : (
                        <VStack space="2.5" mt="4" px="8">
                            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.CloseButton/>
                                    <Modal.Header>Edit a User</Modal.Header>
                                    <Modal.Body>
                                        <FormControl>
                                            <FormControl.Label>Name of the User</FormControl.Label>
                                            <Input onChangeText={name => setName(name)}
                                                   value={name ? name : ""}/>
                                        </FormControl>
                                        <FormControl>
                                            <FormControl.Label>Email of the User</FormControl.Label>
                                            <Input onChangeText={email => setEmail(email)}
                                                   value={email ? email : ""}/>
                                        </FormControl>
                                        <FormControl>
                                            <FormControl.Label>Permissions of the User</FormControl.Label>
                                            <Select style={{marginVertical: 5}}
                                                    selectedValue={permissions ? permissions : ""} minWidth="200"
                                                    accessibilityLabel="Permissions"
                                                    placeholder="Permissions of the User"
                                                    _selectedItem={{
                                                        bg: "teal.600",
                                                        endIcon: <CheckIcon size="5"/>
                                                    }} mt={1} onValueChange={itemValue => setPermissions(itemValue)}>
                                                <Select.Item label="Admin" value={"admin"}/>
                                                <Select.Item label="Student Leader" value={"leader"}/>
                                                <Select.Item label="Student" value={"student"}/>
                                            </Select>
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
                                                putUsers();
                                            }}>
                                                Save
                                            </Button>
                                        </Button.Group>
                                    </Modal.Footer>
                                </Modal.Content>
                            </Modal>
                            <Heading size="lg" style={{textAlign: "center"}}>Users</Heading>
                            <Divider/>
                            {
                                users.map(user => {
                                    return (
                                        <Stack key={user.id} mb="2.5" mt="1.5" direction="column" space={3}>
                                            <Box p="2" bg="#E79F2E" _text={{
                                                fontSize: 'md',
                                                fontWeight: 'medium',
                                                color: 'warmGray.50',
                                                letterSpacing: 'lg'
                                            }} shadow={2}>
                                                <Text>Name: {user.name}, Email: {user.email},
                                                    Permissions: {user.permissions}</Text>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                    marginVertical: 5,
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <Button w="25%" onPress={() => {
                                                        setName(user.name);
                                                        setId(user.id);
                                                        setEmail(user.email);
                                                        setPermissions(user.permissions);
                                                        return setShowModal(true);
                                                    }
                                                    }>Edit</Button>
                                                </View>
                                            </Box>
                                        </Stack>
                                    );
                                })
                            }
                        </VStack>
                    )
                }
            </ScrollView>
        );
    }).catch(_ => setError(true));
}
