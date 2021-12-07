import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { darkModePalette } from '../styles/DarkModePalette';

export default function CustomCheckBox({ text, pressed, setPressed }) {
    return (
        <TouchableOpacity 
            onPress={() => setPressed(!pressed)}
            style={pressed? styles.pressedBox : styles.unpressedBox}
        >
            <Text style={pressed? styles.pressedText : styles.unpressedText}>{text}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    unpressedBox: {
        alignSelf: 'flex-start',
        padding: 5,
        marginHorizontal: 5,
        borderColor: darkModePalette.grey,
        borderWidth: 1,
        borderRadius: 10,
    },
    pressedBox: {
        alignSelf: 'flex-start',
        padding: 5,
        marginHorizontal: 5,
        borderColor: darkModePalette.grey,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: darkModePalette.green
    },
    unpressedText: {
        color: darkModePalette.grey,
        fontWeight: 'normal',
    },
    pressedText: {
        color: darkModePalette.black,
        fontWeight: 'bold',
    }
});