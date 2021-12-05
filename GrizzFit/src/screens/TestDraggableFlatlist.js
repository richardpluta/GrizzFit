import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { darkModePalette } from "../styles/DarkModePalette";

const NUM_EXERCISES = 15;

export default function TestDraggableFlatlist() {
  const intensityToString = (num) => {
    const converter = ['Light','Light - Medium','Medium','Medium - Hard','Hard']
    return converter[num * 2]
  }
  
  const initialExercises = [
    {
      key: '1',
      name: 'Bench Press',
      intensity: intensityToString(1),
      sets: [8,8,8]
    },
    {
      key: '2',
      name: 'Incline Bench Press',
      intensity: intensityToString(1.5),
      sets: [1,3,5,6,7]
    },
    {
      key: '3',
      name: 'Tricep Pulldowns',
      intensity: intensityToString(0.5),
      sets: [12,12,12]
    },
  ]

  const [exercises, setExercises] = useState(initialExercises);

  useEffect(() => {
    setExercises(initialExercises)
  }, [])

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[styles.rowItem, { backgroundColor: isActive ? darkModePalette.black : darkModePalette.shadowAlt }]}
        >
            <MaterialIcons name="drag-handle" size={32} color="dimgrey" />

            <View style={styles.exerciseInfo}>
              <TouchableOpacity onPress={() => console.log(`editting exercise ${item.name}`)}>
                <Text style={styles.exerciseName}>{item.name}</Text>
              </TouchableOpacity>
              <View style={styles.exerciseSets}>
                {item.sets.map((set, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.exerciseSet}
                    onPress={() => console.log(`editting set with ${set} reps ...`)}
                  >
                    <Text style={[styles.text, {fontSize: 13, fontWeight: 'bold'}]}>{set}</Text>
                  </TouchableOpacity>
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
              <MaterialCommunityIcons name="close" size={24} color="darkred" /> 
            </TouchableOpacity>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      ItemSeparatorComponent={() => (
        <View style={{height: 2, backgroundColor: darkModePalette.black}}></View>
      )}
      ListFooterComponent={() => (
        <TouchableOpacity style={styles.footer}>
          <MaterialIcons name="add" size={24} color={darkModePalette.primary} />
          <Text style={styles.footerText}>Add Exercise</Text>
        </TouchableOpacity>
      )}
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
    backgroundColor: darkModePalette.secondary,
    marginRight: 8,
    marginVertical: 6, 
    padding: 3,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addExerciseSet: {
    opacity: 0.5,
    borderWidth: 2,
    borderColor: darkModePalette.secondary,
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