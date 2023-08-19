import {useContext, useEffect} from "react";

import {Context} from "../Context";

export default function Logout({ navigation }) {
    const { jwt, setJwt } = useContext(Context);
    useEffect(() => {
        setJwt(prevState => "");
    }, [])
    return(navigation.navigate('Home'));
}
