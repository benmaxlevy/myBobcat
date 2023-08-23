import {StatusBar} from 'expo-status-bar';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {NativeBaseProvider} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';

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
    const {jwt, setJwt} = useContext(Context);
    return (
        <NativeBaseProvider>
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
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#424242",
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        height: "33%"
                                    }}>
                                        <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                        <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                  style={{position: "absolute", left: "2.5%", top: "70%"}} name="menu"
                                                  color="white" size={30}/>
                                        <Image
                                            style={{width: 50, height: 50, position: "absolute", top: "60%"}}
                                            source={require('./assets/BobcatLogo.png')}
                                            resizeMode='contain'
                                        />
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
                                    <SafeAreaView style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#424242",
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        height: "33%"
                                    }}>
                                        <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                        <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                  style={{position: "absolute", left: "2.5%", top: "70%"}} name="menu"
                                                  color="white" size={30}/>
                                        <Image
                                            style={{width: 50, height: 50, position: "absolute", top: "60%"}}
                                            source={require('./assets/BobcatLogo.png')}
                                            resizeMode='contain'
                                        />
                                    </SafeAreaView>
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
                                    <SafeAreaView style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#424242",
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        height: "33%"
                                    }}>
                                        <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                        <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                  style={{position: "absolute", left: "2.5%", top: "70%"}} name="menu"
                                                  color="white" size={30}/>
                                        <Image
                                            style={{width: 50, height: 50, position: "absolute", top: "60%"}}
                                            source={require('./assets/BobcatLogo.png')}
                                            resizeMode='contain'
                                        />
                                    </SafeAreaView>
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
                                    <SafeAreaView style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#424242",
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        height: "33%"
                                    }}>
                                        <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                        <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                  style={{position: "absolute", left: "2.5%", top: "70%"}} name="menu"
                                                  color="white" size={30}/>
                                        <Image
                                            style={{width: 50, height: 50, position: "absolute", top: "60%"}}
                                            source={require('./assets/BobcatLogo.png')}
                                            resizeMode='contain'
                                        />
                                    </SafeAreaView>
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
                                        <SafeAreaView style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#424242",
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            height: "33%"
                                        }}>
                                            <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                            <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                      style={{position: "absolute", left: "2.5%", top: "70%"}}
                                                      name="menu"
                                                      color="white" size={30}/>
                                            <Image
                                                style={{width: 50, height: 50, position: "absolute", top: "60%"}}
                                                source={require('./assets/BobcatLogo.png')}
                                                resizeMode='contain'
                                            />
                                        </SafeAreaView>
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
                                            <SafeAreaView style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "#424242",
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                height: "33%"
                                            }}>
                                                <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                                <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                          style={{position: "absolute", left: "2.5%", top: "70%"}}
                                                          name="menu"
                                                          color="white" size={30}/>
                                                <Image
                                                    style={{width: 50, height: 50, position: "absolute", top: "60%"}}
                                                    source={require('./assets/BobcatLogo.png')}
                                                    resizeMode='contain'
                                                />
                                            </SafeAreaView>
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
                                            <SafeAreaView style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "#424242",
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                height: "33%"
                                            }}>
                                                <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                                <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                          style={{position: "absolute", left: "2.5%", top: "70%"}}
                                                          name="menu"
                                                          color="white" size={30}/>
                                                <Image
                                                    style={{width: 50, height: 50, position: "absolute", top: "60%"}}
                                                    source={require('./assets/BobcatLogo.png')}
                                                    resizeMode='contain'
                                                />
                                            </SafeAreaView>
                                        );
                                    }
                                }}/>
                        </>
                    )}
                </Drawer.Navigator>
            </NavigationContainer>
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
