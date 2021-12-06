import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { MaterialIcons } from '@expo/vector-icons';
import { darkModePalette } from "../styles/DarkModePalette";
import WorkoutDragFlatlistItem from "./WorkoutDragFlatlistItem";
import { WorkoutExercisesContext } from "../providers/WorkoutExercisesProvider";

export default function WorkoutDraggableFlatlist({ navigation, allowEdits }) {
  const editMode = allowEdits ?? false 

  const { workoutExercises, setWorkoutExercises } = useContext(WorkoutExercisesContext);

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