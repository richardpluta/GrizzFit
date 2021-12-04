import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyWorkouts from '../screens/MyWorkouts'
import WorkoutCreator from '../screens/WorkoutCreator'
import ImportWorkouts from '../screens/ImportWorkouts'
import WorkoutInfo from '../screens/WorkoutInfo'

const Stack = createNativeStackNavigator()

export default function WorkoutsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="MyWorkouts" component={MyWorkouts} />
            <Stack.Screen options={{ headerShown: false }} name="WorkoutCreator" component={WorkoutCreator} />
            <Stack.Screen options={{ headerShown: false }} name="ImportWorkouts" component={ImportWorkouts} />
            <Stack.Screen options={{ headerShown: false }} name="WorkoutInfo" component={WorkoutInfo} />
        </Stack.Navigator>
    )
}
