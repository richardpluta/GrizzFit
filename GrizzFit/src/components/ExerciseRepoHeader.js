import React from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { darkModePalette } from '../styles/DarkModePalette';

export default function ExerciseRepoHeader({ modalVisible, setModalVisible }) {
    const iconSize = 36;
    const iconColor = darkModePalette.white;

    return (
      <View>
        <StatusBar backgroundColor={darkModePalette.black} style="dark"/>
        <View style={styles.header}>
            {/* <MaterialIcons name="menu" size={iconSize} color={iconColor} /> */}
            {/* <Text style={styles.title}>Exercise Library</Text> */}
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <MaterialIcons name="filter-list" size={iconSize} color={iconColor} />
            </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: darkModePalette.black,
    height: 70,
    paddingHorizontal: 15,
    borderColor: darkModePalette.highlight,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    color: darkModePalette.primary,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  }
});