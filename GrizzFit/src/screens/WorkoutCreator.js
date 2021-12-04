import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function WorkoutCreator({ navigation }) {
    return (
        <View>
            <Text>WORKOUT CREATOR</Text>
            <Button title={"Back"} onPress={() => navigation.pop()}/>
        </View>
    )
}

const styles = StyleSheet.create({})
