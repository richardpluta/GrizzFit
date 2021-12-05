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
        borderColor: darkModePalette.shadow,
        borderWidth: 2,
        borderRadius: 10,
    },
    pressedBox: {
        alignSelf: 'flex-start',
        padding: 5,
        marginHorizontal: 5,
        borderColor: darkModePalette.secondary,
        borderWidth: 2,
        borderRadius: 10,
    },
    unpressedText: {
        color: darkModePalette.white,
        fontWeight: 'normal',
    },
    pressedText: {
        color: darkModePalette.white,
        fontWeight: 'bold',
    }
});