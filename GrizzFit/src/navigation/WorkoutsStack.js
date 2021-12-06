import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyWorkouts from '../screens/MyWorkouts'
import WorkoutCreator from '../screens/WorkoutCreator'
import ImportWorkouts from '../screens/ImportWorkouts'
import WorkoutInfo from '../screens/WorkoutInfo'
import ExerciseRepo from '../screens/ExerciseRepo'
import { StyleSheet, Text } from 'react-native'
import { darkModePalette } from '../styles/DarkModePalette'
import ExerciseInfo from '../screens/ExerciseInfo'

const Stack = createNativeStackNavigator()

export default function WorkoutsStack() {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {backgroundColor: darkModePalette.highlight},
                headerTintColor: darkModePalette.black,
                drawerActiveTintColor: "#CC9B6D",
                drawerInactiveTintColor: "#CCCCCC"
            })}
        >
            <Stack.Screen options={{ headerShown: false }} name="MyWorkouts" component={MyWorkouts} />
            <Stack.Screen options={{ headerShown: false }} name="WorkoutCreator" component={WorkoutCreator} />
            <Stack.Screen options={{ headerShown: false }} name="ImportWorkouts" component={ImportWorkouts} />
            <Stack.Screen options={{ headerShown: false }} name="WorkoutInfo" component={WorkoutInfo} />
            <Stack.Screen options={{ headerShown: true}} name="Add Exercise" component={ExerciseRepo} />
            <Stack.Screen options={{ headerShown: true}} name="Add Exercise Info" component={ExerciseInfo} />
        </Stack.Navigator>
    )
}