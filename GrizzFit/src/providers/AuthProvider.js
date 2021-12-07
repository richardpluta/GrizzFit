import React, { createContext, useState } from 'react'
import { auth, firestore } from '../../config/config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                userAvatar,
                setUserAvatar,
                login: async (email, password) => {
                    try {
                        await auth.signInWithEmailAndPassword(email, password);
                    } catch (error) {
                        console.error();
                    }
                },
                register: async (email, password) => {
                    try {
                        const cred = await auth.createUserWithEmailAndPassword(email, password);
                        return cred.user.uid
                    } catch (error) {
                        console.error();
                    }
                },
                logout: async () => {
                    try {
                        await auth.signOut();
                    } catch (error) {
                        console.error();
                    }
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}