import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { ScaleDecorator } from 'react-native-draggable-flatlist'
import { darkModePalette } from '../styles/DarkModePalette'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkoutSetIndicator from './WorkoutSetIndicator'
import { WorkoutExercisesContext } from '../providers/WorkoutExercisesProvider';
import CustomModal from './CustomModal';
import CustomCheckBox from './CustomCheckBox';
import { intensityToString } from '../helpers/Helpers';

export default function WorkoutDragFlatlistItem({ item, drag, isActive }) {
  const { removeExerciseFromWorkout, addSetToExercise, removeSetFromExercise } = useContext(WorkoutExercisesContext)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalDescription, setModalDescription] = useState("")
  const [modalChildren, setModalChildren] = useState(<View></View>)

  const [isLightChecked, setIsLightChecked] = useState(false)
  const [isMediumChecked, setIsMediumChecked] = useState(false)
  const [isHeavyChecked, setIsHeavyChecked] = useState(false)
  const [intensity, setIntensity] = useState(item.intensity)

  const helper = () => {
    let sum = 0
    let n = 0

    if (isLightChecked) { n++; }
    if (isMediumChecked) { sum += 1; n++; }
    if (isHeavyChecked) { sum += 2; n++; }

    return n > 0? intensityToString(sum/n) : 'Light'
  }

  useEffect(() => {
    // 'Light','Light - Medium','Medium','Medium - Heavy','Heavy'
    if ( intensity.search('Light') !== -1 ) { setIsLightChecked(true) }
    if ( intensity.search('Medium') !== -1 ) { setIsMediumChecked(true) }
    if ( intensity.search('Heavy') !== -1 ) { setIsHeavyChecked(true) }
  }, [])

  useEffect(() => {
    setIntensity(helper)
    setModalChildren(
      <View style={styles.exerciseSets}>
        <CustomCheckBox 
          text={"Light"}
          textColor={darkModePalette.green}
          pressed={isLightChecked}
          setPressed={setIsLightChecked}/>
        <CustomCheckBox 
          text={"Medium"}
          pressed={isMediumChecked}
          setPressed={setIsMediumChecked}/>
        <CustomCheckBox 
          text={"Heavy"}
          pressed={isHeavyChecked}
          setPressed={setIsHeavyChecked}/>
      </View>
    )
  }, [isLightChecked, isMediumChecked, isHeavyChecked])

  useEffect(() => {
    setModalDescription(intensity)
  }, [intensity])

  const changeIntensity  = () => {
    setModalTitle("Edit Exercise Intensity")
    setIsModalVisible(true)      
  }

  return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[styles.rowItem, { backgroundColor: isActive ? darkModePalette.black : darkModePalette.shadowAlt }]}
        >
          <CustomModal 
            title={modalTitle}
            description={modalDescription}
            children={modalChildren}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
          <MaterialIcons name="drag-handle" size={32} color={darkModePalette.grey} />

          <View style={styles.exerciseInfo}>
            <TouchableOpacity disabled={true}>
              <Text style={styles.exerciseName}>{item.name}</Text>
            </TouchableOpacity>
            <ScrollView horizontal={true}>
              {item.sets.map((set, index) => (
                <WorkoutSetIndicator key={index} initReps={set.targetReps} />
              ))}
              <TouchableOpacity style={styles.removeExerciseSet} onPress={() => removeSetFromExercise(item)}>
                <MaterialCommunityIcons name="minus" size={20} color={darkModePalette.red} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addExerciseSet} onPress={() => addSetToExercise(item)}>
                <MaterialIcons name="add" size={20} color={darkModePalette.green} />
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity onPress={changeIntensity}>
              <Text style={[styles.text, {fontSize: 14}]}>{intensity}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => removeExerciseFromWorkout(item)}>
            <MaterialCommunityIcons name="close" size={24} color={darkModePalette.red} /> 
          </TouchableOpacity>
        </TouchableOpacity>
    </ScaleDecorator>
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
  addExerciseSet: {
    opacity: 0.5,
    borderWidth: 2,
    borderColor: darkModePalette.green,
    marginRight: 8,
    marginVertical: 6, 
    padding: 1,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignContent: 'center',
  },
  removeExerciseSet: {
    opacity: 0.5,
    borderWidth: 2,
    borderColor: darkModePalette.red,
    marginRight: 8,
    marginVertical: 6, 
    padding: 1,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignContent: 'center',
  },
})
