import {useEffect} from "react";

import {deleteJWT} from "../JWTHelper";

export default function Logout({ navigation }) {
    deleteJWT().then(() => {
        navigation.navigate('Home');
    });
}
