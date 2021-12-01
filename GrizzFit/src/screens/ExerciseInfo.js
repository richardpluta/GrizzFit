import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { darkModePalette } from '../styles/DarkModePalette';

export default function ExerciseInfo({ route, navigation }) {
    const {item} = route.params;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{
            justifyContent: 'center',}}>
            <View style={styles.imageBorder}>
                <Image style={styles.formGif} source={{uri: item.formGifUrl}} />
            </View>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.bodyHeader}>Instructions</Text>
            <Text style={styles.bodyText}>{
                item.instructions.trim().split(". ").map(
                    (value, index) => (index+1) + ') \t' + value.toString() + '\n\n'
                )
            }</Text>
            <Text style={styles.bodyHeader}>Target Muscles</Text>
            <Text style={styles.bodyText}>{
                item?.targetMuscles?.map(
                    element => element.split("muscles/").pop().replace(/_/g, " ") + "\n"
                ) ?? "N/A"
            }</Text>
            <Text style={styles.bodyHeader}>Synergist Muscles</Text>
            <Text style={styles.bodyText}>{
                item?.synergistMuscles?.map(
                    element => element.split("muscles/").pop().replace(/_/g, " ") + "\n"
                ) ?? "N/A"
            }</Text>
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
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: darkModePalette.black,
        color: darkModePalette.white,
    },
    bodyText: {
        paddingTop: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        color: darkModePalette.white,
    },
    bodyHeader: {
        paddingLeft: 10,
        fontSize: 18,
        fontStyle: 'italic',
        color: darkModePalette.highlight
    },
    formGif: {
        width: 500,
        height: 250,
    },
    imageBorder: {
        borderBottomWidth: 3,
        borderBottomColor: darkModePalette.black,
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