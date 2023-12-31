import {StatusBar} from 'expo-status-bar';
import {Dimensions, Image, StyleSheet, View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// components
import Events from './components/Events';
import EventsRequests from './components/EventsRequests';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import DeleteUser from './components/DeleteUser';
import Register from './components/Register';
import Grades from './components/Grades';
import Gpa from './components/Gpa';
import Users from "./components/Users";

import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Context} from './Context';
import {useContext} from "react";
import ManageAdverts from "./components/ManageAdverts";
import IndividualSchedule from "./components/IndividualSchedule";

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
                                            backgroundColor: "#002855",
                                            flexDirection: "row"
                                        }}>
                                            <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                            <View style={{
                                                width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginVertical: 5
                                            }}>
                                                <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                          name="menu"
                                                          color="white" size={35}
                                                          style={{
                                                              marginLeft: windowWidth * 0.01,
                                                              position: "absolute",
                                                              left: 5
                                                          }}
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
                        {/* if admin, show tab for managing adverts */}
                        {(jwt !== undefined && jwt.permissions === "admin") ? (<>
                            <Drawer.Screen
                                name="Manage Adverts"
                                component={ManageAdverts}
                                options={{
                                    header: ({navigation}) => {
                                        return (
                                            <SafeAreaView style={{
                                                backgroundColor: "#002855",
                                                flexDirection: "row"
                                            }}>
                                                <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                                <View style={{
                                                    width: "100%",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginVertical: 5
                                                }}>
                                                    <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                              name="menu"
                                                              color="white" size={35}
                                                              style={{
                                                                  marginLeft: windowWidth * 0.01,
                                                                  position: "absolute",
                                                                  left: 5
                                                              }}
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
                                name="Manage Users"
                                component={Users}
                                options={{
                                    header: ({navigation}) => {
                                        return (
                                            <SafeAreaView style={{
                                                backgroundColor: "#002855",
                                                flexDirection: "row"
                                            }}>
                                                <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                                <View style={{
                                                    width: "100%",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginVertical: 5
                                                }}>
                                                    <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                              name="menu"
                                                              color="white" size={35}
                                                              style={{
                                                                  marginLeft: windowWidth * 0.01,
                                                                  position: "absolute",
                                                                  left: 5
                                                              }}
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
                        </>) : (<></>)}

                        <Drawer.Screen
                            name="Events"
                            component={Events}
                            options={{
                                header: ({navigation}) => {
                                    return (
                                        <SafeAreaView style={{
                                            backgroundColor: "#002855",
                                            flexDirection: "row"
                                        }}>
                                            <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                            <View style={{
                                                width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginVertical: 5
                                            }}>
                                                <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                          name="menu"
                                                          color="white" size={35}
                                                          style={{
                                                              marginLeft: windowWidth * 0.01,
                                                              position: "absolute",
                                                              left: 5
                                                          }}
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
                        {/* if leader or admin, show tab for event requests */}
                        {(jwt !== undefined && jwt.permissions !== "student") ? (<>
                            <Drawer.Screen
                                name="Event Requests"
                                component={EventsRequests}
                                options={{
                                    header: ({navigation}) => {
                                        return (
                                            <SafeAreaView style={{
                                                backgroundColor: "#002855",
                                                flexDirection: "row"
                                            }}>
                                                <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                                <View style={{
                                                    width: "100%",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginVertical: 5
                                                }}>
                                                    <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                              name="menu"
                                                              color="white" size={35}
                                                              style={{
                                                                  marginLeft: windowWidth * 0.01,
                                                                  position: "absolute",
                                                                  left: 5
                                                              }}
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
                        </>) : (<></>)}
                        <Drawer.Screen
                            name="Grade Calculator"
                            component={Grades}
                            options={{
                                header: ({navigation}) => {
                                    return (
                                        <SafeAreaView style={{
                                            backgroundColor: "#002855",
                                            flexDirection: "row"
                                        }}>
                                            <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                            <View style={{
                                                width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginVertical: 5
                                            }}>
                                                <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                          name="menu"
                                                          color="white" size={35}
                                                          style={{
                                                              marginLeft: windowWidth * 0.01,
                                                              position: "absolute",
                                                              left: 5
                                                          }}
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
                            name="GPA Calculator"
                            component={Gpa}
                            options={{
                                header: ({navigation}) => {
                                    return (
                                        <SafeAreaView style={{
                                            backgroundColor: "#002855",
                                            flexDirection: "row"
                                        }}>
                                            <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                            <View style={{
                                                width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginVertical: 5
                                            }}>
                                                <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                          name="menu"
                                                          color="white" size={35}
                                                          style={{
                                                              marginLeft: windowWidth * 0.01,
                                                              position: "absolute",
                                                              left: 5
                                                          }}
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
                        {(jwt !== undefined) ? (
                            <>
                                <Drawer.Screen
                                    name="Manage Schedule"
                                    component={IndividualSchedule}
                                    options={{
                                        header: ({navigation}) => {
                                            return (
                                                <SafeAreaView style={{
                                                    backgroundColor: "#002855",
                                                    flexDirection: "row"
                                                }}>
                                                    <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                                    <View style={{
                                                        width: "100%",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginVertical: 5
                                                    }}>
                                                        <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                                  name="menu"
                                                                  color="white" size={35}
                                                                  style={{
                                                                      marginLeft: windowWidth * 0.01,
                                                                      position: "absolute",
                                                                      left: 5
                                                                  }}
                                                        />
                                                        <Image
                                                            style={{
                                                                width: windowHeight * 0.05,
                                                                height: windowHeight * 0.05
                                                            }}
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
                                    name="Logout"
                                    component={Logout}
                                    options={{
                                        header: ({navigation}) => {
                                            return (
                                                <SafeAreaView style={{
                                                    backgroundColor: "#002855",
                                                    flexDirection: "row"
                                                }}>
                                                    <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                                    <View style={{
                                                        width: "100%",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginVertical: 5
                                                    }}>
                                                        <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                                  name="menu"
                                                                  color="white" size={35}
                                                                  style={{
                                                                      marginLeft: windowWidth * 0.01,
                                                                      position: "absolute",
                                                                      left: 5
                                                                  }}
                                                        />
                                                        <Image
                                                            style={{
                                                                width: windowHeight * 0.05,
                                                                height: windowHeight * 0.05
                                                            }}
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
                                    name="Delete Data"
                                    component={DeleteUser}
                                    options={{
                                        header: ({navigation}) => {
                                            return (
                                                <SafeAreaView style={{
                                                    backgroundColor: "#002855",
                                                    flexDirection: "row"
                                                }}>
                                                    <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                                    <View style={{
                                                        width: "100%",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginVertical: 5
                                                    }}>
                                                        <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                                  name="menu"
                                                                  color="white" size={35}
                                                                  style={{
                                                                      marginLeft: windowWidth * 0.01,
                                                                      position: "absolute",
                                                                      left: 5
                                                                  }}
                                                        />
                                                        <Image
                                                            style={{
                                                                width: windowHeight * 0.05,
                                                                height: windowHeight * 0.05
                                                            }}
                                                            source={require('./assets/BobcatLogo.png')}
                                                            resizeMode='contain'
                                                        />
                                                    </View>
                                                </SafeAreaView>
                                            );
                                        }
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <Drawer.Screen
                                    name="Login"
                                    component={Login}
                                    options={{
                                        header: ({navigation}) => {
                                            return (
                                                <SafeAreaView style={{
                                                    backgroundColor: "#002855",
                                                    flexDirection: "row"
                                                }}>
                                                    <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                                    <View style={{
                                                        width: "100%",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginVertical: 5
                                                    }}>
                                                        <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                                  name="menu"
                                                                  color="white" size={35}
                                                                  style={{
                                                                      marginLeft: windowWidth * 0.01,
                                                                      position: "absolute",
                                                                      left: 5
                                                                  }}
                                                        />
                                                        <Image
                                                            style={{
                                                                width: windowHeight * 0.05,
                                                                height: windowHeight * 0.05
                                                            }}
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
                                    name="Register"
                                    component={Register}
                                    options={{
                                        header: ({navigation}) => {
                                            return (
                                                <SafeAreaView style={{
                                                    backgroundColor: "#002855",
                                                    flexDirection: "row"
                                                }}>
                                                    <StatusBar style={"light"} barStyle={"dark-content"} translucent/>

                                                    <View style={{
                                                        width: "100%",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginVertical: 5
                                                    }}>
                                                        <Ionicons onPress={_ => navigation.toggleDrawer()}
                                                                  name="menu"
                                                                  color="white" size={35}
                                                                  style={{
                                                                      marginLeft: windowWidth * 0.01,
                                                                      position: "absolute",
                                                                      left: 5
                                                                  }}
                                                        />
                                                        <Image
                                                            style={{
                                                                width: windowHeight * 0.05,
                                                                height: windowHeight * 0.05
                                                            }}
                                                            source={require('./assets/BobcatLogo.png')}
                                                            resizeMode='contain'
                                                        />
                                                    </View>
                                                </SafeAreaView>
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
