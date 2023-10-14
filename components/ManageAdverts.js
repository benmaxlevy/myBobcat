import {View, RefreshControl, Linking, Image, Dimensions} from "react-native";
import {Alert, Box, Button, Divider, Heading, ScrollView, Stack, Text, VStack} from 'native-base';
import {useContext, useEffect, useState} from "react";

import * as DocumentPicker from "expo-document-picker";

import {API_URL} from '@env';
import {Context} from "../Context";

let API = API_URL;

if (!API_URL) {
    API = "https://mybobcat.simplexwebsites.com";
}

export default function ManageAdverts({navigation}) {
    const {jwt, setJwt} = useContext(Context);
    const [refreshing, setRefreshing] = useState(false);
    const [adverts, setAdverts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(
        () => {
            navigation.addListener("focus", _ => {
                setRefreshing(true);

                // adverts
                fetch(API + "/adverts")
                    .then((resp) => resp.json())
                    .then((json) => {
                        // for each advert, append url to adverts state
                        let tempAdverts = [];
                        json.adverts.forEach(a => {
                            tempAdverts.push({id: ad.id, file_path: API +a.file_path});
                        });

                        setAdverts(tempAdverts);
                    })
                    .catch(() => setError(true))
                    .finally(() => setRefreshing(false));
            });
        });

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
            .catch((err) => {
                console.log(err)
                setError(true)
            })
            .finally(() => setRefreshing(false));
    };

    const deleteAdvert = id => {
        console.log(id)
        fetch(API + "/adverts/" + id, {
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
                setRefreshing(true);
                refetchAdverts();
                navigation.navigate('Manage Adverts');
            })
            .catch(err => {
                // set error state to true and display err
                setError(true);
            });
    };

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_ => {refetchAdverts();}}/>
        }>
            {
                error ? (
                    <Box alignItems="center" style={{alignItems: "center", justifyContent: "center"}}>
                        <Alert w="75%" status={"error"}>
                            <VStack space={2} flexShrink={1} w="100%">
                                <Text style={{textAlign: "center", fontSize: 22}} color="coolGray.800">
                                    Failed to do this action. Check whether or not you have this
                                    permission. {"\n"} If
                                    this issue persists, contact Ben Levy.
                                </Text>
                                <Button style={{marginVertical: 10, backgroundColor: "#424242"}}
                                        onPress={() => setError(false)}>Return to Managing Adverts</Button>
                            </VStack>
                        </Alert>
                    </Box>
                ) : (
                    <VStack space="2.5" mt="4">
                        <Heading size="lg"
                                 style={{textAlign: "center"}}>Manage Adverts</Heading>
                        <Box alignItems="center">
                            <Button onPress={async () => {
                                let result = await DocumentPicker.getDocumentAsync({type: ["image/*"]});
                                result = result.assets[0];
                                fetch(API + "/adverts", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                        "Authorization": jwt.jwt
                                    },
                                    body: new FormData({
                                        "advert": result
                                    }),
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
                                        refetchAdverts();
                                        navigation.navigate('Events');
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        // set error state to true and display err
                                        setError(true);
                                    });
                            }}>Create an Advert</Button>
                        </Box>
                        <Divider/>
                        {
                            adverts.map((ad, index) => {
                                console.log(ad)
                                return (
                                    <Stack key={index} mb="2.5" mt="1.5" direction="column" space={3}>
                                        <Box key={index} bg="#E79F2E" _text={{
                                            fontSize: 'md',
                                            fontWeight: 'medium',
                                            color: 'warmGray.50',
                                            letterSpacing: 'lg'
                                        }} shadow={2}>
                                            <Image key={index} style={{width: Dimensions.get("window").width, height: 90}} source={{uri: ad.file_path}}/>
                                            <View key={index} style={{
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                marginVertical: 5,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                                <Button key={index} w="25%" style={{
                                                    backgroundColor: "#E8003F",
                                                    marginHorizontal: 5
                                                }} onPress={() => deleteAdvert(ad.id)}>Delete</Button>
                                            </View>
                                        </Box>
                                    </Stack>
                                )
                            })
                        }
                    </VStack>
            )}
        </ScrollView>
    );
}
