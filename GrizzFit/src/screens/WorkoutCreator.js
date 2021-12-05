import React, { useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { darkModePalette } from '../styles/DarkModePalette';
import CustomModal from '../components/CustomModal';
import TestDraggableFlatlist from './TestDraggableFlatlist';

export default function WorkoutCreator({ navigation }) {
    const [workoutTitle, setWorkoutTitle] = useState('')
    const [workoutTags, setWorkoutTags] = useState('')
    const [workoutExercises, setWorkoutExercises] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalDescription, setModalDescription] = useState("")
    const [modalChildren, setModalChildren] = useState(<View></View>)
    
    // export: add a field for the social scope of the workout 0-user, 1-friends, 2-local/global area
    // export: get currently logged in user and when exporting workout, add author field

    // CustomModal({ title, description, body, callback, isModalVisible, setIsModalVisible })

    const changeWorkoutTitle = () => {
        setModalTitle("Edit Workout Name")
        setModalDescription("")
        setModalChildren(
            <TextInput
                placeholder="Enter your workout name..."
                defaultValue={workoutTitle}
                onChangeText={text => setWorkoutTitle(text)}
                style={styles.input}
            />
        )
        setIsModalVisible(true)
    }
    const changeWorkoutTags = () => {
        setModalTitle("Edit Workout Tags")
        setModalDescription("")
        setModalChildren(
            <TextInput
                placeholder="Enter your workout tags (ex: #legs #lower)..."
                defaultValue={workoutTags}
                onChangeText={text => setWorkoutTags(text)}
                style={styles.input}
            />
        )
        setIsModalVisible(true)
    }

    return (
        <SafeAreaView style={styles.background}>
            <CustomModal 
                title={modalTitle}
                description={modalDescription}
                children={modalChildren}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
            <View>
                <Text style={styles.title}>Workout Creator</Text>
                <View style={styles.workoutInfo}>
                    <TouchableOpacity onPress={changeWorkoutTitle}>
                        <Text style={workoutTitle? styles.workoutInfoText : styles.workoutInfoTextEmpty}>
                            {workoutTitle? workoutTitle : "Click to set a workout name ..."}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={changeWorkoutTags}>
                        <Text style={workoutTags? styles.workoutInfoText : styles.workoutInfoTextEmpty}>
                            {workoutTags? workoutTags : "Click to set workout tags ..."}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.exercisesList}>
                <TestDraggableFlatlist />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.pop()}>
                    <MaterialIcons name="close" size={32} color="white" />
                    <Text style={styles.footerText}>  Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => console.log('exporting...')}>
                    <MaterialCommunityIcons name="export" size={32} color="white" />
                    <Text style={styles.footerText}>  Export</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: darkModePalette.shadowAlt,
        flex: 1,
    },
    exercisesList: {
        paddingHorizontal: 5,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: darkModePalette.shadowAlt,
        backgroundColor: darkModePalette.primary,
        textAlign: 'center',
        padding: 10,
    },
    workoutInfo: {
        backgroundColor: darkModePalette.black,
        alignItems: 'center',
        padding: 5,
        marginBottom: 5,
    },
    workoutInfoText: {
        fontSize: 15,
        padding: 5,
        color: darkModePalette.white,
        textAlign: 'center',
    },
    workoutInfoTextEmpty: {
        fontSize: 15,
        fontStyle: 'italic',
        padding: 5,
        color: 'dimgrey',
        textAlign: 'center',
    },
    separator: {
        height: 2,
        margin: 10,
        backgroundColor: darkModePalette.black,
        opacity: 0.5
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderTopColor: darkModePalette.primary,
        borderTopWidth: 2,
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
    input: {
        borderRadius: 5,
        textAlign: 'center',
    }
})
