import {useContext, useState} from "react";
import {Text} from "react-native";
import {Alert, Box, Button, Divider, Heading, Input, VStack} from 'native-base';

import {Context} from "../Context";

import {API_URL} from '@env';

let API = API_URL;

if(!API_URL) {
    API = "https://mybobcat.simplexwebsites.com";
}

export default function Login({navigation}) {
    const {jwt, setJwt} = useContext(Context);

    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (email, password) => {

        fetch(API + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                "email": email,
                "password": password
            }).toString(),
        })
            .then((response) => {
                if (response.status !== 200)
                    // email is taken
                    throw "Incorrect login information";
                else
                    return response.json()
            })
            .then((responseData) => {
                // set JWT using context state (global)
                setJwt({jwt: responseData.jwt, permissions: responseData.permissions, userId: responseData.userId});
                // bring to events
                navigation.navigate('Events');
            })
            .catch(err => {
                // set error state to true and display err
                setError(true);
            });
    };

    return (
        <Box alignItems="center" style={{justifyContent: "center", flex: 1}}>
            {
                error ? (
                    <Alert w="75%" status={"error"}>
                        <VStack space={2} flexShrink={1} w="100%">
                            <Text style={{textAlign: "center", fontSize: 22}} color="coolGray.800">
                                The login information you provided is incorrect. {"\n"} If this issue persists, contact
                                Ben Levy.
                            </Text>
                            <Button style={{marginVertical: 10, backgroundColor: "#424242"}}
                                    onPress={() => setError(false)}>Return to Login</Button>
                        </VStack>
                    </Alert>
                ) : (
                    <>
                        <Heading>Login</Heading>
                        <Divider style={{marginVertical: 10}} w={"50%"}/>
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
                        <Button style={{marginVertical: 10}} onPress={() => login(email, password)}>Login</Button>
                    </>
                )
            }
        </Box>
    );
}
