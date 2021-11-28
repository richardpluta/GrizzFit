import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { darkModePalette } from '../styles/DarkModePalette';

function Loader() {
    return (
        <ActivityIndicator style={styles.loader} size="large" color={darkModePalette.highlight}/>
    )
}

const styles = StyleSheet.create({
    loader: {
      backgroundColor: darkModePalette.shadowAlt,
      flex: 1,
    },
  });

export default Loader