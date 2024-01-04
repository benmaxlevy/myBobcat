import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Context = React.createContext('');

let i = 0;

export const ContextProvider = ({ children }) => {
    const [jwt, setJwt] = useState();

    // useEffect to update state jwt (for when users reopen the app)
    useEffect( () => {
        AsyncStorage.getItem("jwt").then(newStringJwt => {
            // make sure the jwt exists in storage
            console.log("async jwt: " + newStringJwt);
            if (newStringJwt) {
                // parse the string JSON into obj
                setJwt(JSON.parse(newStringJwt));
            }
        });
    }, []);

    // useEffect to update value of jwt in async storage
    useEffect( () => {
        // stringify for storage
        let stringJwt = JSON.stringify(jwt);

        if(stringJwt === undefined)
            stringJwt = "{}";

        // store
        AsyncStorage.setItem("jwt", stringJwt).catch(e => console.log(e));
    }, [jwt]);

    return (
        <Context.Provider value={{ jwt, setJwt }}>
            {children}
        </Context.Provider>
    );
};
