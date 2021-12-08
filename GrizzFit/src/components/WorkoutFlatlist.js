import React from "react";
import { View, FlatList } from "react-native";
import { darkModePalette } from "../styles/DarkModePalette";
import WorkoutFlatlistItem from "./WorkoutFlatlistItem";

export default function WorkoutFlatlist({ workoutExercises, showReps }) {
  const shouldShowReps = showReps ?? true

  const renderItem = ({ item }) => {
    return (
      <WorkoutFlatlistItem workoutExercise={item} showReps={showReps}/>
    );
  };

  return (
    <FlatList
      ItemSeparatorComponent={() => (
        <View style={{height: 2, backgroundColor: darkModePalette.black}}></View>
      )}
      data={workoutExercises}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      style={[{height: shouldShowReps? '100%' : '50%'}]}
    />
  );
}