import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { darkModePalette } from "../styles/DarkModePalette";
import WorkoutSetIndicator from "./WorkoutSetIndicator";

export default function WorkoutDraggableFlatlist({ allowEdits }) {
  const editMode = allowEdits ?? false 

  const intensityToString = (num) => {
    const converter = ['Light','Light - Medium','Medium','Medium - Hard','Hard']
    return converter[num * 2]
  }
  
  const initialExercises = [
    {
      key: '1',
      name: 'Bench Press',
      intensity: intensityToString(1),
      sets: [
        {actualReps: 0, targetReps: 8},
        {actualReps: 0, targetReps: 8},
        {actualReps: 0, targetReps: 8}
      ]
    },
    {
      key: '2',
      name: 'Incline Bench Press',
      intensity: intensityToString(1.5),
      actualSets: [1,3,5,6,7],
      sets: [
        {actualReps: 0, targetReps: 1},
        {actualReps: 0, targetReps: 3},
        {actualReps: 0, targetReps: 5},
        {actualReps: 0, targetReps: 7},
      ]
    },
    {
      key: '3',
      name: 'Tricep Pulldowns',
      intensity: intensityToString(0.5),
      sets: [
        {actualReps: 0, targetReps: 12},
        {actualReps: 0, targetReps: 12},
        {actualReps: 0, targetReps: 12}
      ]
    },
  ]

  const [exercises, setExercises] = useState(initialExercises);

  useEffect(() => {
    setExercises(initialExercises)
  }, [])

  const renderItem = ({ item, drag, isActive, index }) => {
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
    );
  };

  return (
    <DraggableFlatList
      ItemSeparatorComponent={() => (
        <View style={{height: 2, backgroundColor: darkModePalette.black}}></View>
      )}
      ListFooterComponent={() => 
        (
          editMode? 
            <TouchableOpacity style={styles.footer}>
              <MaterialIcons name="add" size={24} color={darkModePalette.primary} />
              <Text style={styles.footerText}>Add Exercise</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity style={styles.footer}>
              <MaterialIcons name="check" size={24} color={darkModePalette.primary} />
              <Text style={styles.footerText}>Finish Workout</Text>
            </TouchableOpacity>
        )
      }
      data={exercises}
      onDragEnd={({ data }) => setExercises(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      style={styles.flatlist}
    />
  );
}

const styles = StyleSheet.create({
  flatlist: {
    backgroundColor: darkModePalette.shadowAlt,
    height: '100%'
  },
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
  exerciseSet: {
    borderColor: darkModePalette.secondary,
    borderWidth: 2,
    marginRight: 8,
    marginVertical: 6, 
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  exerciseSetText: {
    fontSize: 12,
    fontWeight: 'bold', 
    color: darkModePalette.white,
    textAlign: "center",
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: darkModePalette.black
  },
  footerText: {
    color: darkModePalette.primary,
    fontSize: 18,
    marginLeft: 10
  }
});