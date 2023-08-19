import React, {useState} from "react";

export const Context = React.createContext('');
export const ContextProvider = ({ children }) => {
    const [jwt, setJwt] = useState();

    return (
        <Context.Provider value={{ jwt, setJwt }}>
            {children}
        </Context.Provider>
    );
};
