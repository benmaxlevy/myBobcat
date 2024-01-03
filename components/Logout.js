import {useContext, useEffect} from "react";

import {Context} from "../Context";

export default function Logout({ navigation }) {
    const { jwt, setJwt } = useContext(Context);
    // useEffect(() => {
    //     setJwt(prevState => {
    //         console.log("ugh")
    //         return {};
    //     });
    //     return navigation.navigate('Home');
    // }, []);

    setJwt(prevState => {
        return {};
    });
    return navigation.navigate('Home');
}
