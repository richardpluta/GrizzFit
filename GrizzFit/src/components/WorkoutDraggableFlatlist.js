import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { MaterialIcons } from '@expo/vector-icons';
import { darkModePalette } from "../styles/DarkModePalette";
import WorkoutDragFlatlistItem from "./WorkoutDragFlatlistItem";
import { WorkoutExercisesContext } from "../providers/WorkoutExercisesProvider";

export default function WorkoutDraggableFlatlist({ navigation, allowEdits }) {
  const editMode = allowEdits ?? false 

  const {workoutExercises, setWorkoutExercises, intensityToString} = useContext(WorkoutExercisesContext);

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

  useEffect(() => {
    setWorkoutExercises(initialExercises)
  }, [])

  const renderItem = ({ item, drag, isActive, index }) => {
    return (
      <WorkoutDragFlatlistItem item={item} drag={drag} isActive={isActive} editMode={editMode}/>
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
            <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate("Add Exercise", {fromWorkoutCreator: true})}>
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
      data={workoutExercises}
      onDragEnd={({ data }) => setWorkoutExercises(data)}
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