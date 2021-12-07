import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { darkModePalette } from '../styles/DarkModePalette'
import CustomModal from './CustomModal'
import WorkoutSetIndicator from './WorkoutSetIndicator'

export default function WorkoutFlatlistItem({ workoutExercise }) {
    const item = workoutExercise

    const [exerciseWeight, setExerciseWeight] = useState(0)
    const [usingBarbell, setUsingBarbell] = useState(true)
    const [sideWeightText, setSideWeightText] = useState("")

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalDescription, setModalDescription] = useState("")
    const [modalChildren, setModalChildren] = useState(<View></View>)

    useEffect(() => {
        setModalDescription("Using " + (usingBarbell? "Barbell" : "No Barbell"))
    }, [usingBarbell])

    useEffect(() => {
        setSideWeightText(calculateSides())
        setModalChildren(
            <View style={styles.weightModal}>
                <TouchableOpacity style={styles.modalButton} onPress={() => adjustExerciseWeight(45)}>
                    <MaterialCommunityIcons name="chevron-triple-up" size={24} color={darkModePalette.black} />
                    <Text style={styles.chevronText}>45</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => adjustExerciseWeight(25)}>
                    <MaterialCommunityIcons name="chevron-double-up" size={24} color={darkModePalette.black} />
                    <Text style={styles.chevronText}>25</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => adjustExerciseWeight(5)}>
                    <MaterialCommunityIcons name="chevron-up" size={24} color={darkModePalette.black} />
                    <Text style={styles.chevronText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.input} 
                    onPress={toggleUsingBarbell} 
                    onLongPress={resetExerciseWeight}
                >
                    <Text style={{textAlign: 'center', fontSize: 17}}>
                        {exerciseWeight > 0? exerciseWeight + ' lbs' : 'BW'}
                    </Text>
                    {sideWeightText? 
                        <Text style={{textAlign: 'center', fontSize: 12, color: darkModePalette.secondary}}>
                            {sideWeightText}
                        </Text> : <View></View>}
                    
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => adjustExerciseWeight(-5)}>
                    <MaterialCommunityIcons name="chevron-down" size={24} color={darkModePalette.black} />
                    <Text style={styles.chevronText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => adjustExerciseWeight(-25)}>
                    <MaterialCommunityIcons name="chevron-double-down" size={24} color={darkModePalette.black} />
                    <Text style={styles.chevronText}>25</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => adjustExerciseWeight(-45)}>
                    <MaterialCommunityIcons name="chevron-triple-down" size={24} color={darkModePalette.black} />
                    <Text style={styles.chevronText}>45</Text>
                </TouchableOpacity>
            </View>
        )
    }, [exerciseWeight, usingBarbell, sideWeightText])

    const toggleUsingBarbell = () => {
        setUsingBarbell(!usingBarbell)
    }

    const calculateSides = () => {
        if (exerciseWeight > 0) {
            const sideWeight = usingBarbell? (exerciseWeight - 45) / 2 : exerciseWeight / 2
            return sideWeight + " lbs/side"
        }
        return ""
    }

    const resetExerciseWeight = () => { setExerciseWeight(0) }

    const adjustExerciseWeight = (amount) => {
        if ((exerciseWeight + amount) >= 0) {
            setExerciseWeight(exerciseWeight + amount)
        } else {
            setExerciseWeight(0)
        }
    }

    const changeExerciseWeight = () => {
        setModalTitle("Edit Exercise Weight")
        setIsModalVisible(true)
    }

    return (
        <View>
            <CustomModal 
                title={modalTitle}
                description={modalDescription}
                children={modalChildren}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
            <View style={styles.rowItem}>
            <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <View style={styles.exerciseSets}>
                {item.sets.map((set, index) => (
                    <WorkoutSetIndicator key={index} initReps={set.actualReps} targetReps={set.targetReps}/>
                ))}
                </View>
                <Text style={[styles.text, {fontSize: 14}]}>{item.intensity}</Text>
            </View>
            <TouchableOpacity onPress={changeExerciseWeight}>
                <Text style={[styles.text, {fontSize: 16}]}>
                    {exerciseWeight > 0? exerciseWeight + ' lbs' : 'BW'}
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rowItem: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text: {
        color: darkModePalette.white,
        textAlign: "left",
    },
    exerciseInfo: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    exerciseName: {
        color: darkModePalette.primary,
        fontWeight: '700',
        textAlign: "left",
        fontSize: 18,
    },
    exerciseSets: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        width: 100,
        marginHorizontal: 10,
        alignSelf: 'center',
    },
    weightModal: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    modalButton: {
        alignItems: 'center',
        padding: 5,
    },
    chevronText: {
        fontSize: 12,
        color: darkModePalette.shadow
    }
})
