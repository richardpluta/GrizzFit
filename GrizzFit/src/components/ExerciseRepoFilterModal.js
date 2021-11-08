import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { darkModePalette } from '../styles/DarkModePalette';

export default function ExerciseRepoFitlerModal() {
    return (
        <View style={styles.modal}>
            <Text>MODAL</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        height: 40,
    }
});