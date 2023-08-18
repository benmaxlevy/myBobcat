import { StatusBar } from 'expo-status-bar';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import { NativeBaseProvider } from 'native-base';

// components
import Events from './components/Events';
import Home from './components/Home';
import {NavigationContainer, useFocusEffect} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function App() {
    const Drawer = createDrawerNavigator();
    const windowWidth = Dimensions.get("window").width;
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
                        headerTitle: (props) => (
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: windowWidth-136,
                            }}>
                                <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                                <Image
                                    style={{ width: 50, height: 50 }}
                                    source={require('./assets/BobcatLogo.png')}
                                    resizeMode='contain'
                                />
                            </View>
                        ),
                        headerStyle: {backgroundColor: '#424242'}
                    }}
                />
                <Drawer.Screen
                  name="Events"
                  component={Events}
                  options={{
                      headerTitle: (props) => (
                          <View style={{
                              alignItems: "center",
                              justifyContent: "center",
                              width: windowWidth-136,
                          }}>
                              <StatusBar style={"light"} barStyle={"dark-content"} translucent/>
                              <Image
                                  style={{ width: 50, height: 50 }}
                                  source={require('./assets/BobcatLogo.png')}
                                  resizeMode='contain'
                              />
                          </View>
                      ),
                      headerStyle: {backgroundColor: '#424242'}
                  }}
                />
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
