import React, { createContext, useState } from 'react'
import { auth } from '../../config/config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth.signInWithEmailAndPassword(email, password);
                    } catch (error) {
                        console.error();
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth.createUserWithEmailAndPassword(email, password);
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