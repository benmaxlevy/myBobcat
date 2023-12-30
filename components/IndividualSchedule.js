import {useEffect, useState} from "react";

import {API_URL} from "@env";

let API = API_URL;

if(!API_URL)
    API="https://mybobcat.simplexwebsites.com";

export default function IndividualSchedule({navigation}) {
    // form input - store as an array of obj
    const [schedule, setSchedule] = useState([]);

}