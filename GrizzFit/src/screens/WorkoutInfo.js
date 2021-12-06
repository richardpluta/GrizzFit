import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import WorkoutDraggableFlatlist from '../components/WorkoutDraggableFlatlist'

export default function WorkoutInfo({ navigation }) {
    return (
        <WorkoutDraggableFlatlist navigation={navigation}/>
    )
}

const styles = StyleSheet.create({})
