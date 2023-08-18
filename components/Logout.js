import {useContext} from "react";

import {Context} from "../Context";

export default function Logout({ navigation }) {
    const { jwt, setJwt } = useContext(Context);
    setJwt(prevState => "");
    return(navigation.navigate('Home'));
}
