import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { darkModePalette } from '../styles/DarkModePalette';

export default function ExerciseRepoModal({ modalVisible, setModalVisible, submitHandler }) {
    const [text, setText] = useState('');

    const textHandler = (text) => {
        setText(text);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.bottomView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Filter Exercises</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={textHandler}
                        value={text}
                    />
                    <Pressable style={[styles.button, styles.buttonClose]} onPress={() => submitHandler(text.toLowerCase())}>
                        <Text style={styles.textStyle}>Filter</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    bottomView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    modalView: {
      backgroundColor: darkModePalette.black,
      borderRadius: 5,
      padding: 35,
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      borderBottomColor: darkModePalette.secondary,
      borderBottomWidth: 3,
    },
    button: {
      borderRadius: 5,
      padding: 8,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: darkModePalette.secondary,
    },
    textStyle: {
      color: darkModePalette.white,
      fontWeight: "bold",
      textAlign: "center",
      paddingHorizontal: 15,
      fontSize: 16,
    },
    modalText: {
      color: darkModePalette.secondary,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 18,
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 35,
        paddingVertical: 6,
        minWidth: 200,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: darkModePalette.secondary,
        color: darkModePalette.black,
        backgroundColor: darkModePalette.white
    }
  });