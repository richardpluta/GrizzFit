import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import Modal from "react-native-modal"
import { darkModePalette } from '../styles/DarkModePalette';

export default function CustomModal({ title, description, children, isModalVisible, setIsModalVisible }) {
    
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
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{title}</Text>
                  {description? <Text style={styles.modalDescr}>{description}</Text> : <View></View>}
                </View>
                <View style={styles.modalChildren}>
                  {children}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
      backgroundColor: darkModePalette.white,
      borderColor: darkModePalette.shadow,
      borderWidth: 2,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalHeader: {
      backgroundColor: darkModePalette.highlight,
      borderTopStartRadius: 7,
      borderTopEndRadius: 7,
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomColor: darkModePalette.shadow,
      borderBottomWidth: 2,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: darkModePalette.shadow,
    },
    modalDescr: {
      fontSize: 15,
      fontStyle: 'italic',
      textAlign: 'center',
      color: darkModePalette.shadow,
    },
    modalButton: {
      margin: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      backgroundColor: darkModePalette.secondary
    },
    modalChildren: {
      padding: 15,
    }
  });