import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Context = React.createContext('');
export const ContextProvider = ({ children }) => {
    const [jwt, setJwt] = useState();

    // useEffect to update state jwt (for when users reopen the app)
    useEffect( () => {
        AsyncStorage.getItem("jwt").then(newStringJwt => {
            // make sure the jwt exists in storage
            if (newStringJwt) {
                // parse the string JSON into obj
                setJwt(JSON.parse(newStringJwt));
            }
        });
    });

    // useEffect to update value of jwt in async storage
    useEffect( () => {
        console.log("updating: " + JSON.stringify(jwt));
        // if defined, set; else, remove
        if(jwt && !(Object.keys(jwt).length === 0 && jwt.constructor === Object)) {
            console.log(jwt)
            // stringify for storage
            const stringJwt = JSON.stringify(jwt);
            // store
            AsyncStorage.setItem("jwt", stringJwt).catch(e => console.log(e));
        } else {
            console.log("h")
            AsyncStorage.removeItem("jwt").catch(e => console.log(e));
        }
    }, [jwt]);

    return (
        <Context.Provider value={{ jwt, setJwt }}>
            {children}
        </Context.Provider>
    );
};
