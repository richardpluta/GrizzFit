import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { darkModePalette } from '../styles/DarkModePalette';

export default function ExerciseInfo({ route, navigation }) {
    const {item} = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>EXERCISE INFO on {item.name}</Text>
            
            <View>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                >
                    <Text style={styles.text}>Go back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkModePalette.shadowAlt,
    },
    text: {
        fontSize: 16,
        color: darkModePalette.white,
    }
});