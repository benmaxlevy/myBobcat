// function to set JWT

import AsyncStorage from "@react-native-async-storage/async-storage";

export const setJWT = responseData => {
    return new Promise((resolve, reject) => {
        // stringify JSON
        responseData = JSON.stringify(responseData);

        AsyncStorage.setItem("jwt", JSON.stringify({
            jwt: responseData.jwt,
            permissions: responseData.permissions,
            userId: responseData.userId
        })).then(
            () => {
                resolve();
            }
        ).catch(err => {
            reject(err);
        });
    });
};

export const getJWT = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("jwt").then(jwt => {
            if(jwt !== null)
                resolve(JSON.parse(jwt));
            else
                reject();
        }).catch(err => {
            reject(err);
        });
    });
};
