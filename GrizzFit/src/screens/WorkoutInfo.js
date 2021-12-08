import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import WorkoutFlatlist from '../components/WorkoutFlatlist';
import { darkModePalette } from '../styles/DarkModePalette';
import { MainScreenContext } from '../providers/MainScreenProvider';

export default function WorkoutInfo({ route, navigation }) {
    const { workout } = route.params;
    const workoutTitle = workout.title;
    const workoutTags = workout.tags;
    const workoutExercises = workout.exercises;

    const { setRecordingWorkout } = useContext(MainScreenContext)

    const [isRecording, setIsRecording] = useState(false)

    const recordHandler = () => {
        setRecordingWorkout(workout)
        setIsRecording(true)
    }

    const finishHandler = () => {
        setRecordingWorkout(null)
        setIsRecording(false)
        navigation.pop()
    }

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.title}>{workoutTitle ?? "No title found"}</Text>
                <View style={styles.workoutInfo}>
                    <Text style={styles.workoutInfoText}>
                        {workoutTags ?? "No tags found"}
                    </Text>
                </View>
            </View>

            <View style={styles.exercisesList}>
                <WorkoutFlatlist workoutExercises={workoutExercises} navigation={navigation} />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.pop() }>
                    <MaterialIcons name="arrow-back" size={32} color={darkModePalette.primary} />
                    <Text style={styles.footerText}>  Back</Text>
                </TouchableOpacity>
                {isRecording?
                    <TouchableOpacity style={styles.footerButton} onPress={finishHandler}>
                        <MaterialIcons name="stop" size={32} color={darkModePalette.primary} />
                        <Text style={styles.footerText}>   Finish</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.footerButton} onPress={recordHandler}>
                        <MaterialIcons name="play-arrow" size={32} color={darkModePalette.primary} />
                        <Text style={styles.footerText}>  Record</Text>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: darkModePalette.shadowAlt,
        flex: 1,
    },
    exercisesList: {
        paddingHorizontal: 5,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: darkModePalette.black,
        backgroundColor: darkModePalette.green,
        textAlign: 'center',
        padding: 10,
    },
    workoutInfo: {
        backgroundColor: darkModePalette.black,
        alignItems: 'center',
        padding: 5,
        marginBottom: 5,
    },
    workoutInfoText: {
        fontSize: 15,
        padding: 5,
        color: darkModePalette.white,
        textAlign: 'center',
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderTopColor: darkModePalette.primary,
        borderTopWidth: 2,
    },
    footerButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 40
    },
    footerText: {
        fontSize: 18,
        color: darkModePalette.white
    },
})
