import React from 'react';
import { f, auth } from '../config/config';

export const registerUser = () => {
    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
        const user = userCredentials.user;
    })
    .catch(error => alert(error.message))
}
 