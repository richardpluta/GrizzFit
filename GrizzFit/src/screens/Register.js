import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../navigation/AuthProvider'
import { darkModePalette } from '../styles/DarkModePalette'

const Register = () => {
    const [userName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {register} = useContext(AuthContext)

    const navigation = useNavigation()

    const handleRegister = () => {
        // Firebase Auth account creation
        register(email, password);

        // TODO: Create a new user document in Firestore and add their name to it
    }

    const navLogin = () => {
        navigation.navigate("Login")
    } 

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <Text style={styles.title}>REGISTER</Text>
                <TextInput 
                    placeholder="Name"
                    value={userName}
                    onChangeText={text => setName(text)} 
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleRegister}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity
                    onPress={navLogin}
                >
                    <Text style={styles.login}>Click to log in</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkModePalette.black
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderWidth: 2,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,

    },
    button: {
        backgroundColor: '#b59a57',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    login: {
        color: '#b59a57',
        fontSize: 14,
        marginTop: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 36,
        marginBottom: 15,
        color: darkModePalette.primary,
    }
})
