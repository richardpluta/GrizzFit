import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function WorkoutInfo({ navigation }) {
    return (
        <View>
            <Text>WORKOUT INFO</Text>
            <Button title={"Back"} onPress={() => navigation.pop()}/>
        </View>
    )
}

const styles = StyleSheet.create({})
