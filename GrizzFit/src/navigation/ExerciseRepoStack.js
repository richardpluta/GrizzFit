import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseRepo from '../screens/ExerciseRepo';
import ExerciseInfo from '../screens/ExerciseInfo';

const Stack = createNativeStackNavigator()

const ExerciseRepoStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="ExerciseRepo" component={ExerciseRepo} />
            <Stack.Screen options={{ headerShown: false }} name="ExerciseInfo" component={ExerciseInfo} />
        </Stack.Navigator>
    )
}

export default ExerciseRepoStack
