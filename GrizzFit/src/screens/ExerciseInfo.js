import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { darkModePalette } from '../styles/DarkModePalette';

export default function ExerciseInfo({ route, navigation }) {
    const {item} = route.params;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',}}>
            <View style={styles.imageBorder}>
                <Image style={styles.formGif} source={{uri: item.formGifUrl}} />
            </View>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.instructions}>{item.instructions}</Text>
            <View>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.pop()}
                >
                    <Text style={{color: darkModePalette.black}}>Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkModePalette.shadowAlt,
    },
    exerciseName: {
        padding: 10,
        fontSize: 22,
        color: darkModePalette.white,
    },
    instructions: {
        padding: 10,
        fontSize: 16,
        color: darkModePalette.white,
    },
    formGif: {
        width: 500,
        height: 250,
    },
    imageBorder: {
        borderBottomWidth: 3,
        borderBottomColor: "#000",
    },
    button: {
        backgroundColor: darkModePalette.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: '60%',
        margin: 20,
    }
});