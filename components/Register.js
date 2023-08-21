import {useState} from "react";
import {Text} from "react-native";
import {Alert, Box, Button, Divider, Heading, Input, VStack} from 'native-base';

import {API_URL} from '@env';

if(!API_URL)
    API_URL = process.env.API_URL;

export default function Register({navigation}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const register = (name, email, password) => {
        // check email's format first
        if (!validateEmail(email))
            return setError(true);
        fetch(API_URL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                "name": name,
                "email": email,
                "password": password
            }).toString(),
        })
            .then((response) => {
                if (response.status !== 200)
                    // email is taken
                    throw "Email taken";
                else
                    return response.json()
            })
            .then((responseData) => {
                // bring to login
                return navigation.navigate('Login');
            })
            .catch(err => {
                // set error state to true and display err
                setError(true);
            });
    }

    return (
        <Box alignItems="center" style={{justifyContent: "center", flex: 1}}>
            {
                error ? (
                    <Alert w="75%" status={"error"}>
                        <VStack space={2} flexShrink={1} w="100%">
                            <Text style={{textAlign: "center", fontSize: 22}} color="coolGray.800">
                                The email you provided is invalid, or a user with the provided email already
                                exists. {"\n"} If this issue persists, contact Ben Levy.
                            </Text>
                            <Button style={{marginVertical: 10, backgroundColor: "#424242"}}
                                    onPress={() => setError(false)}>Return to Register</Button>
                        </VStack>
                    </Alert>
                ) : (
                    <>
                        <Heading>Register</Heading>
                        <Divider style={{marginVertical: 10}} w={"50%"}/>
                        <Input onChangeText={newName => setName(newName)} isRequired={true} w="75%" shadow={2} _light={{
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
                        }} placeholder="Full Name"/>
                        <Input onChangeText={newEmail => setEmail(newEmail)} isRequired={true} w="75%" shadow={2}
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
                        }} placeholder="Email"/>

                        <Input onChangeText={newPassword => setPassword(newPassword)} isRequired={true}
                               type={"password"} w="75%" shadow={2} _light={{
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
                        }} placeholder="Password"/>
                        <Button style={{marginVertical: 10}}
                                onPress={() => register(name, email, password)}>Register</Button>
                    </>
                )
            }
        </Box>
    );
}
