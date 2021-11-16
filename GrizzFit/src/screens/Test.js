import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Test({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.formGifTest}
        source={{
          uri: 'https://assets.menshealth.co.uk/main/assets/71-Dumbbell-bench-press.gif?mtime=1526399424',
        }}
      />
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
  },
  formGifTest: {
    width: '100%',
    height: '33%',
  },
});
