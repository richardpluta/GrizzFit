import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomCheckBox from '../components/CustomCheckBox';

export default function Test({ navigation }) {
  const [isChestShouldersChecked, setIsChestShouldersChecked] = useState(true)

  return (
    <View style={styles.container}>
      <CustomCheckBox 
        text={"Chest/Shoulders"}
        pressed={isChestShouldersChecked}
        setPressed={setIsChestShouldersChecked}/>
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
