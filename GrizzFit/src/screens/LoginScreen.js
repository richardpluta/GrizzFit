import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../providers/AuthProvider'

import { darkModePalette } from '../styles/DarkModePalette'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login } = useContext(AuthContext);

    const navigation = useNavigation()

    const navRegister = () => {
        navigation.navigate("Register")
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.inputContainer}>
                <Image source={require('../../assets/bear.png')} style={styles.image} />
                <Text style={styles.title}>
                Grizz 
                    <Text style={styles.nestTitle}>
                        Fit
                    </Text>
                </Text>
                <Text style={styles.title2}>sign in to continue</Text>
                <TextInput
                    placeholder="Email"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    textContentType="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => login(email, password)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity
                    onPress={navRegister}
                >
                    <Text style={styles.register}>Don't have an account? Register now!</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

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
        borderWidth: 2
    },
    buttonContainer: {
        width: '70%',
        marginTop: 40,
    },
    button: {
        backgroundColor: darkModePalette.primary,
        width: '100%',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    },
    register: {
        color: darkModePalette.primary,
        fontSize: 16,
        marginTop: 20,
    },
    title: {
        fontSize: 36,
        color: darkModePalette.primary,
        fontWeight: 'bold'
    },
    title2: {
        color: 'grey',
        fontSize: 24,
        marginBottom: 10
    },
    image: {
        width: 60,
        height: 46,
        alignSelf: 'auto',
    },
    nestTitle: {
        fontSize: 36,
        color: darkModePalette.white,
        fontWeight: 'bold'
    },
})
