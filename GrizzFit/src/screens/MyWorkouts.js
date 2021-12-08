import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { darkModePalette } from '../styles/DarkModePalette';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkoutsListItem from '../components/WorkoutsListItem';
import { WorkoutExercisesContext } from "../providers/WorkoutExercisesProvider";
import SearchBar from '../components/SearchBar';

export default function MyWorkouts({ navigation }) {
    const { workouts, setWorkouts } = useContext(WorkoutExercisesContext);
    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts)

    useEffect(() => {
        setFilteredWorkouts(workouts)
    }, [workouts])

    return (
        <SafeAreaView style={styles.list}>
            <SearchBar workouts={workouts} setFilteredWorkouts={setFilteredWorkouts}/>
            <FlatList
                ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                ListEmptyComponent={() => <Text style={styles.emptyText}>No search results!</Text>}
                data={filteredWorkouts}
                ListHeaderComponent={<View></View>/* TODO */}
                renderItem={({ item }) => (
                    <WorkoutsListItem item={item} navigation={navigation}/>
                )}
            />
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.push('WorkoutCreator')}>
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
    },
    emptyText: {
        padding: 30,
        fontSize: 18,
        textAlign: 'center',
        color: darkModePalette.highlight
    }
});