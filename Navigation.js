import {StatusBar} from 'expo-status-bar';
import {Dimensions, Image, StyleSheet, View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// components
import Events from './components/Events';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Grades from './components/Grades';
import Gpa from './components/Gpa';

import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Context} from './Context';
import {useContext} from "react";

export default function Navigation({navigation}) {
    const Drawer = createDrawerNavigator();
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const {jwt, setJwt} = useContext(Context);
    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Drawer.Navigator screenOptions={{
                        headerTintColor: "white"
                    }}>
                        <Drawer.Screen
                            name="Home"
                            component={Home}
                            options={{
                                header: ({navigation}) => {
                                    return (
                                        <SafeAreaView style={{
                                            backgroundColor: "#424242",
                                            maxHeight: windowHeight * 0.1,
                                            flexDirection: "row"
                                        }}>
                                            <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                            <View style={{width: "100%", alignItems: "center"}}>
                                                <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                    name="menu"
                                                    color="white" size={windowWidth*0.075}
                                                    style={{marginLeft: windowWidth * 0.01, position: "absolute", left: 5}}
                                                />
                                                <Image
                                                    style={{width: windowHeight * 0.05, height: windowHeight * 0.05}}
                                                    source={require('./assets/BobcatLogo.png')}
                                                    resizeMode='contain'
                                                />
                                            </View>

                                        </SafeAreaView>
                                    );
                                }
                            }}
                        />
                        <Drawer.Screen
                            name="Events"
                            component={Events}
                            options={{
                                header: ({navigation}) => {
                                    return (
                                        <View style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#424242",
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            maxHeight: "75%"
                                        }}>
                                            <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                            <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                      style={{position: "absolute", left: "2.5%", top: "50%"}}
                                                      name="menu"
                                                      color="white" size={30}/>
                                            <Image
                                                style={{width: 50, height: 50, marginTop: "20%"}}
                                                source={require('./assets/BobcatLogo.png')}
                                                resizeMode='contain'
                                            />
                                        </View>
                                    );
                                }
                            }}
                        />
                        <Drawer.Screen
                            name="Grade Calculator"
                            component={Grades}
                            options={{
                                header: ({navigation}) => {
                                    return (
                                        <View style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#424242",
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            maxHeight: "75%"
                                        }}>
                                            <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                            <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                      style={{position: "absolute", left: "2.5%", top: "50%"}}
                                                      name="menu"
                                                      color="white" size={30}/>
                                            <Image
                                                style={{width: 50, height: 50, marginTop: "20%"}}
                                                source={require('./assets/BobcatLogo.png')}
                                                resizeMode='contain'
                                            />
                                        </View>
                                    );
                                }
                            }}
                        />
                        <Drawer.Screen
                            name="GPA Calculator"
                            component={Gpa}
                            options={{
                                header: ({navigation}) => {
                                    return (
                                        <View style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#424242",
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            maxHeight: "75%"
                                        }}>
                                            <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                            <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                      style={{position: "absolute", left: "2.5%", top: "50%"}}
                                                      name="menu"
                                                      color="white" size={30}/>
                                            <Image
                                                style={{width: 50, height: 50, marginTop: "20%"}}
                                                source={require('./assets/BobcatLogo.png')}
                                                resizeMode='contain'
                                            />
                                        </View>
                                    );
                                }
                            }}
                        />
                        {(jwt !== undefined) ? (
                            <Drawer.Screen
                                name="Logout"
                                component={Logout}
                                options={{
                                    header: ({navigation}) => {
                                        return (
                                            <View style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "#424242",
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                maxHeight: "75%"
                                            }}>
                                                <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                                <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                          style={{position: "absolute", left: "2.5%", top: "50%"}}
                                                          name="menu" color="white" size={30}/>
                                                <Image
                                                    style={{width: 50, height: 50, marginTop: "20%"}}
                                                    source={require('./assets/BobcatLogo.png')}
                                                    resizeMode='contain'
                                                />
                                            </View>
                                        );
                                    }
                                }}
                            />
                        ) : (
                            <>
                                <Drawer.Screen
                                    name="Login"
                                    component={Login}
                                    options={{
                                        header: ({navigation}) => {
                                            return (
                                                <View style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "#424242",
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                    maxHeight: "75%"
                                                }}>
                                                    <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                                    <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                              style={{position: "absolute", left: "2.5%", top: "50%"}}
                                                              name="menu" color="white" size={30}/>
                                                    <Image
                                                        style={{width: 50, height: 50, marginTop: "20%"}}
                                                        source={require('./assets/BobcatLogo.png')}
                                                        resizeMode='contain'
                                                    />
                                                </View>
                                            );
                                        }
                                    }}
                                />
                                <Drawer.Screen
                                    name="Register"
                                    component={Register}
                                    options={{
                                        header: ({navigation}) => {
                                            return (
                                                <View style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "#424242",
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                    maxHeight: "75%"
                                                }}>
                                                    <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                                    <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                              style={{position: "absolute", left: "2.5%", top: "50%"}}
                                                              name="menu" color="white" size={30}/>
                                                    <Image
                                                        style={{width: 50, height: 50, marginTop: "20%"}}
                                                        source={require('./assets/BobcatLogo.png')}
                                                        resizeMode='contain'
                                                    />
                                                </View>
                                            );
                                        }
                                    }}/>
                            </>
                        )}
                    </Drawer.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});