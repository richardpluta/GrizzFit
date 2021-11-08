import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExerciseRepo from './screens/ExerciseRepo';
import { darkModePalette } from './styles/DarkModePalette';

export default function App() {
  return (
    <View style={styles.container}>
      <ExerciseRepo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkModePalette.shadowAlt,
  },
});