import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { darkModePalette } from '../styles/DarkModePalette'
import { TextInput } from 'react-native-gesture-handler';
import { WorkoutExercisesContext } from '../providers/WorkoutExercisesProvider';

export default function SearchBar({ setFilteredWorkouts }) {
    const [searchTerms, setSearchTerms] = useState('')
    const { workouts } = useContext(WorkoutExercisesContext);

    const handleSearch = () => {
        const searchPredicate = text => {
            return text.toLowerCase().search(searchTerms.toLowerCase()) !== -1
        }

        setFilteredWorkouts(
            workouts.filter(wrk => searchPredicate(wrk.title) || searchPredicate(wrk.tags))
        )
    }

    useEffect(() => {
        console.log('clearing search terms: ', searchTerms)
        setSearchTerms('')
    }, [workouts])

    useEffect(() => {
        handleSearch()
    }, [searchTerms])

    return (
        <View style={styles.searchBox}>
            <MaterialIcons name="search" size={32} color={darkModePalette.white} />
            <TextInput
                placeholder="Search workouts"
                placeholderTextColor={darkModePalette.shadow}
                defaultValue={searchTerms}
                onChangeText={text => setSearchTerms(text)}
                style={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBox: {
        padding: 10,
        backgroundColor: darkModePalette.black,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    input: {
        borderColor: darkModePalette.shadow,
        borderWidth: 2,
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        borderRadius: 8,
        textAlign: 'left',
        padding: 8,
        color: darkModePalette.white
    }
})
