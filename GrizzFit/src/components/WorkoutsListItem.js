import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { darkModePalette } from '../styles/DarkModePalette';

export default function WorkoutsListItem({ item, navigation }) {
    return (
        <View style={styles.button}>
            {item.isFavorite ?
                <TouchableOpacity onPress={() => console.log('Unfavoriting ' + item.title)}>
                    <MaterialIcons
                        name="star"
                        size={30}
                        color={darkModePalette.primary}
                    />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => console.log('Favoriting ' + item.title)}>
                    <MaterialIcons
                        name="star-border"
                        size={30}
                        color={darkModePalette.white}
                    />
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => navigation.push('WorkoutInfo', {workout: item})}>
                <Text style={styles.buttonText}>
                    {item.title}
                </Text>
                <Text style={styles.buttonMiniText}>
                    {item.tags}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderColor: darkModePalette.black,
        borderRadius: 8,
        borderBottomWidth: 1,
        //backgroundColor: darkModePalette.shadow,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        marginLeft: 12,
        color: darkModePalette.white
    },
    buttonMiniText: {
        fontSize: 16,
        fontStyle: 'italic',
        marginLeft: 12,
        color: darkModePalette.highlight,
        opacity: 0.8,
    },
});