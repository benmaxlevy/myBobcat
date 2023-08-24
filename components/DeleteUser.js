import {useContext, useState} from "react";
import {Text} from "react-native";
import {Alert, Box, Button, Divider, Heading, Input, VStack} from 'native-base';

import {Context} from "../Context";

import {API_URL} from '@env';

let API = API_URL

if(!API_URL) {
    API = "https://mybobcat.simplexwebsites.com";
}

export default function DeleteUser({navigation}) {
    const {jwt, setJwt} = useContext(Context);

    const [error, setError] = useState(false);

    const del = _ => {

        fetch(API + "/user", {
            method: "DELETE",
            headers: {
                "Authorization": jwt.jwt
            },body: new URLSearchParams({
                
            }).toString(),
        })
            .then((response) => {
                if (response.status !== 200)
                    // email is taken
                    throw "Error";
                else
                    return response.json()
            })
            .then((responseData) => {
                // set JWT to undef
                setJwt(prevState => undefined);
                // bring to home
                navigation.navigate('Home');
            })
            .catch(err => {
                console.log(err);
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
                                An error occurred while attempting to delete your data. {"\n"} If this issue persists, contact
                                Ben Levy.
                            </Text>
                            <Button style={{marginVertical: 10, backgroundColor: "#424242"}}
                                onPress={() => setError(false)}>Return to Delete</Button>
                        </VStack>
                    </Alert>
                    ) : (
                        <>
                            <Heading>Delete Account and Created Events</Heading>
                            <Divider style={{marginVertical: 10}} w={"50%"}/>
                            <Button style={{marginVertical: 10, backgroundColor: "#E7003E"}} onPress={() => del()}>Delete Data</Button>
                        </>
                    )   
            }
        </Box>
        );
}
