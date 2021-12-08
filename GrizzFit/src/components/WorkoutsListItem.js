import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { darkModePalette } from '../styles/DarkModePalette';
import { WorkoutExercisesContext } from '../providers/WorkoutExercisesProvider';

export default function WorkoutsListItem({ item, navigation }) {
    const { removeWorkout } = useContext(WorkoutExercisesContext)

    return (
        <View style={styles.button}>
            <View style={styles.workoutInfo}>
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
                <TouchableOpacity onPress={() => navigation.push('WorkoutInfo', { workout: item })}>
                    <Text style={styles.buttonText}>
                        {item.title}
                    </Text>
                    <Text style={styles.buttonMiniText}>
                        {item.tags}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {removeWorkout(item)}}>
                <MaterialIcons
                    name="close"
                    size={24}
                    color={darkModePalette.red}
                />
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
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    workoutInfo: {
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