import {Component, useEffect, useState} from "react";
import {View, Text} from "react-native";
import {Box, Divider, Heading, ScrollView, Stack, VStack} from 'native-base';

import { API_URL } from '@env';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL + "/events")
            .then((resp) => resp.json())
            .then((json) => {console.log(json); setEvents(json.events)})
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    return (
        <View>
            <ScrollView>
                <VStack space="2.5" mt="4" px="8">
                    <Heading size="lg" style={{textAlign: "center"}}>Events</Heading>
                    <Divider/>
                    {loading ? (
                        <Text>Loading events...</Text>
                    ) : (
                        events.map((post) => {
                            return (
                                <Stack mb="2.5" mt="1.5" direction="column" space={3}>
                                    <Box p="2" bg="#E79F2E" _text={{
                                        fontSize: 'md',
                                        fontWeight: 'medium',
                                        color: 'warmGray.50',
                                        letterSpacing: 'lg'
                                    }} shadow={2}>
                                        <Text>{post.name} @ {post.date_time}</Text>
                                    </Box>
                                </Stack>
                            );
                        })
                    )}
                </VStack>
            </ScrollView>
        </View>
    );
}
