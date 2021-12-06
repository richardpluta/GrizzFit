import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { darkModePalette } from '../styles/DarkModePalette'
import WorkoutSetIndicator from './WorkoutSetIndicator'

export default function WorkoutFlatlistItem({ workoutExercise }) {
    const item = workoutExercise

    return (
        <View>
            <View style={styles.rowItem}>
            <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <View style={styles.exerciseSets}>
                {item.sets.map((set, index) => (
                    <WorkoutSetIndicator key={index} initReps={set.actualReps} targetReps={set.targetReps}/>
                ))}
                </View>
                <Text style={[styles.text, {fontSize: 14}]}>{item.intensity}</Text>
            </View>
            <TouchableOpacity onPress={() => console.log(`edit user weight...`)}>
                <Text style={[styles.text, {fontSize: 16}]}>{"145 lbs"}</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rowItem: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text: {
        color: darkModePalette.white,
        textAlign: "left",
    },
    exerciseInfo: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    exerciseName: {
        color: darkModePalette.primary,
        fontWeight: '700',
        textAlign: "left",
        fontSize: 18,
    },
    exerciseSets: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})
