import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Test({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Test page
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272121',
  },
  text: {
    color: "#CCCCCC",
    paddingTop: 15,
    fontSize: 25,
    textAlign: "center"
  }
});
