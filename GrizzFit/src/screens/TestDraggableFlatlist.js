import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Text, StyleSheet, TouchableOpacity, TouchableHighlight } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { darkModePalette } from "../styles/DarkModePalette";

const NUM_EXERCISES = 15;

const initialData = [...Array(NUM_EXERCISES)].map((d, index) => {
  return {
    key: `item-${index}`,
    label: String(index) + "",
  };
});

const initialExercises = [
  {
    key: ""
  },
  {},
  {},
]

export default function TestDraggableFlatlist() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData)
  }, [])

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[styles.rowItem, { backgroundColor: isActive ? darkModePalette.secondary : darkModePalette.shadow }]}
        >
            <MaterialIcons name="drag-handle" size={32} color={darkModePalette.white} />
            <TouchableOpacity onPress={() => console.log(item.label)}>
              <Text style={styles.text}>{item.label}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('deleting!')}>
              <MaterialCommunityIcons name="trash-can-outline" size={32} color={darkModePalette.white} /> 
            </TouchableOpacity>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      ItemSeparatorComponent={() => (
        <View style={{borderBottomColor: darkModePalette.black, borderBottomWidth: 1}}></View>
      )}
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      style={{backgroundColor: darkModePalette.black}}
    />
  );
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
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});