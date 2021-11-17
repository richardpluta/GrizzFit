import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { darkModePalette } from '../styles/DarkModePalette';

export default function ExerciseRepoFilterButton({ setModalVisible }) {
    const iconSize = 28;
    const iconColor = darkModePalette.white;

    return (
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="filter-list" size={iconSize} color={iconColor} />
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: darkModePalette.black,
  }
});