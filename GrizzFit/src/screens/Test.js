import React, { useState } from 'react';
import Modal from "react-native-modal"
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { darkModePalette } from '../styles/DarkModePalette';
import { Button } from 'react-native-elements';
import CustomModal from '../components/CustomModal';

export default function Test({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Pressable style={styles.modalButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.text}>Show Modal</Text>
      </Pressable>
      <CustomModal 
        title={"Modal Title"}
        description={"Modal Description"} 
        children={<Button title={'Modal Children'} onPress={() => console.log('That\'s me!')}/>}
        isModalVisible={isModalVisible} 
        setIsModalVisible={setIsModalVisible}/>
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
    fontSize: 16,
    textAlign: "center"
  },
  modal: {
    backgroundColor: "#ffffff",
    padding: 15,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 20
  },
  modalButton: {
    margin: 10,
    padding: 10,
    borderColor: darkModePalette.shadow,
    borderWidth: 2,
    backgroundColor: darkModePalette.secondary
  }
});
