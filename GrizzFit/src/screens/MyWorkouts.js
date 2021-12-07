import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { darkModePalette } from '../styles/DarkModePalette';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkoutsListItem from '../components/WorkoutsListItem';
import { intensityToString } from '../helpers/Helpers';

export default function MyWorkouts({ navigation }) {
    const [workouts, setWorkouts] = useState([])

    const exampleWorkoutExercises = [
        {
            key: '1',
            name: 'Bench Press',
            intensity: intensityToString(1),
            sets: [
                {actualReps: 0, targetReps: 8},
                {actualReps: 0, targetReps: 8},
                {actualReps: 0, targetReps: 8}
            ]
        },
        {
            key: '2',
            name: 'Incline Bench Press',
            intensity: intensityToString(1.5),
            actualSets: [1,3,5,6,7],
            sets: [
                {actualReps: 0, targetReps: 1},
                {actualReps: 0, targetReps: 3},
                {actualReps: 0, targetReps: 5},
                {actualReps: 0, targetReps: 7},
            ]
        },
        {
            key: '3',
            name: 'Tricep Pulldowns',
            intensity: intensityToString(0.5),
            sets: [
                {actualReps: 0, targetReps: 12},
                {actualReps: 0, targetReps: 12},
                {actualReps: 0, targetReps: 12}
            ]
        },
    ]

    const temp = [{
        key: "1",
        title: "Dan's Back & Biceps",
        tags: "#back #biceps #pullday",
        exercises: [...exampleWorkoutExercises],
        isFavorite: true
    },
    {
        key: "2",
        title: "Sick Arms by Jim Stoppani",
        tags: "#triceps #biceps #arms",
        exercises: [[...exampleWorkoutExercises].pop()],
        isFavorite: false
    },
    {
        key: "3",
        title: "Built By Science Back Day",
        tags: "#back #builtbyscience",
        exercises: [...exampleWorkoutExercises].filter(wrk => wrk.key === "2"),
        isFavorite: false
    }]

    useEffect(() => {
        setWorkouts(temp)
    }, [])

    return (
        <SafeAreaView style={styles.list}>
            <FlatList
                ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                data={workouts}
                ListHeaderComponent={<View></View>/* TODO */}
                renderItem={({ item }) => (
                    <WorkoutsListItem item={item} navigation={navigation}/>
                )}
            />
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.push('WorkoutCreator', {"workouts": workouts, "setWorkouts": setWorkouts})}>
                    <MaterialIcons name="add" size={32} color="white" />
                    <Text style={styles.footerText}>  Create</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.push('ImportWorkouts')}>
                    <MaterialCommunityIcons name="import" size={32} color="white" />
                    <Text style={styles.footerText}>  Import</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: darkModePalette.shadowAlt,
        flex: 1,
    },
    separator: {
        height: 7
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderTopColor: darkModePalette.primary,
        borderTopWidth: 3
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
    }
});