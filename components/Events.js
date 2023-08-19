import {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {Box, Divider, Heading, ScrollView, Stack, VStack} from 'native-base';

import {API_URL} from '@env';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL + "/events")
            .then((resp) => resp.json())
            .then((json) => {
                e = json.events
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
                                <Stack key={post.id} mb="2.5" mt="1.5" direction="column" space={3}>
                                    <Box p="2" bg="#E79F2E" _text={{
                                        fontSize: 'md',
                                        fontWeight: 'medium',
                                        color: 'warmGray.50',
                                        letterSpacing: 'lg'
                                    }} shadow={2}>
                                        <Text>{post.name} @ {(new Date(post.date_time)).toLocaleString('en-US')}</Text>
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
