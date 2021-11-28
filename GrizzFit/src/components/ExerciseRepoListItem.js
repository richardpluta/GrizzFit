import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { darkModePalette } from '../styles/DarkModePalette';

export default function ExerciseRepoListItem({ item, navigation, favoriteHandler }) {
    const iconSize = 30;

    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => favoriteHandler(item.key)}>
                {!item.isFavorite && <MaterialIcons 
                    name="star-border" 
                    size={iconSize} 
                    color={darkModePalette.white}
                />}
                {item.isFavorite && <MaterialIcons 
                    name="star" 
                    size={iconSize} 
                    color={darkModePalette.primary}
                />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.flex} onPress={() => navigation.navigate('ExerciseInfo', {item: item})}>
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderColor: darkModePalette.black,
        borderRadius: 8,
        borderBottomWidth: 1,
        backgroundColor: darkModePalette.shadowAlt,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        marginLeft: 12,
        color: darkModePalette.white,
    },
    flex: {
        flex: 1,
    }
});