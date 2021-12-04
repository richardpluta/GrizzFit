import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function ImportWorkouts({ navigation }) {
    return (
        <View>
            <Text>IMPORT WORKOUTS</Text>
            <Button title={"Back"} onPress={() => navigation.pop()}/>
        </View>
    )
}

const styles = StyleSheet.create({})
