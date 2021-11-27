import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native';
import Modal from "react-native-modal"
import { darkModePalette } from '../styles/DarkModePalette';

export default function CustomModal({ title, description, isModalVisible, setIsModalVisible }) {
    
    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setIsModalVisible(false)}
            backdropOpacity={0.5}
            animationIn='fadeInDown'
            animationInTiming={300}
            animationOut='fadeOutDown'
            animationOutTiming={300}
            hideModalContentWhileAnimating={true}
        >
            <View style={styles.modal}>
                <Text style={styles.modalTitle}>{title}</Text>
                <Text>{description}</Text>
                <Button title="Close" onPress={() => setIsModalVisible(false)} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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