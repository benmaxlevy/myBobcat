import {useContext, useEffect, useState} from "react";

import {API_URL} from "@env";
import {Context} from "../Context";
import {RefreshControl, Text} from "react-native";
import {Alert, Box, Button, ScrollView, Stack, VStack} from "native-base";

let API = API_URL;

if(!API_URL)
    API="https://mybobcat.simplexwebsites.com";

const refetchSchedule = _ => {

};

const day = props => {
    return (
        <Stack mb={"2.5"} mt={"1.5"} direction={"column"} space={3}>
            <Box>

            </Box>
        </Stack>
    );
};

export default function IndividualSchedule({navigation}) {
    // refresh
    const [refreshing, setRefreshing] = useState(false);

    // form input - store as an array of obj
    const [schedule, setSchedule] = useState([]);
    const [error, setError] = useState(false);

    const {jwt, setJwt} = useContext(Context);

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
                                        onPress={() => setError(false)}>Return to Events</Button>
                            </VStack>
                        </Alert>
                    </Box>
                ) : (
                    <></>
                )
            }
        </ScrollView>
    );

}