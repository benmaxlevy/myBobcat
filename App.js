import {Dimensions, StyleSheet} from 'react-native';

// components
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Context, ContextProvider} from './Context';
import {useContext} from "react";

import Navigation from "./Navigation";

export default function App() {
    const Drawer = createDrawerNavigator();
    const windowWidth = Dimensions.get("window").width;
    const { jwt, setJwt } = useContext(Context);
    return (
        <ContextProvider>
                <Navigation/>
        </ContextProvider>
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
