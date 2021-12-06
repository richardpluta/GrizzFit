import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { ScaleDecorator } from 'react-native-draggable-flatlist'
import { darkModePalette } from '../styles/DarkModePalette'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkoutSetIndicator from './WorkoutSetIndicator'

export default function WorkoutDragFlatlistItem({ item, drag, isActive, editMode }) {
    return (
        <ScaleDecorator>
        {editMode?
          <TouchableOpacity
            onLongPress={drag}
            disabled={isActive}
            style={[styles.rowItem, { backgroundColor: isActive ? darkModePalette.black : darkModePalette.shadowAlt }]}
          >
              <MaterialIcons name="drag-handle" size={32} color={darkModePalette.grey} />

              <View style={styles.exerciseInfo}>
                <TouchableOpacity onPress={() => console.log(`editting exercise ${item.name}`)}>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                </TouchableOpacity>
                <View style={styles.exerciseSets}>
                  {item.sets.map((set, index) => (
                    <WorkoutSetIndicator key={index} initReps={set.targetReps} />
                  ))}
                  <TouchableOpacity style={styles.addExerciseSet} onPress={() => console.log('adding exer set...')}>
                    <MaterialIcons name="add" size={20} color={darkModePalette.white} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => console.log(`editting intensity ${item.intensity}`)}>
                  <Text style={[styles.text, {fontSize: 14}]}>{item.intensity}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => console.log(`removing exercise ${item.name}`)}>
                <MaterialCommunityIcons name="close" size={24} color={darkModePalette.red} /> 
              </TouchableOpacity>
          </TouchableOpacity>
          :
          <TouchableWithoutFeedback
            disabled={isActive}
          >
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
              <TouchableOpacity onPress={() => console.log(`edit user weight...`)}>
                <Text style={[styles.text, {fontSize: 16}]}>{"145 lbs"}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        }
      </ScaleDecorator>
    )
}

const styles = StyleSheet.create({
    rowItem: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
        width: '100%',
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
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
        borderColor: darkModePalette.white,
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
