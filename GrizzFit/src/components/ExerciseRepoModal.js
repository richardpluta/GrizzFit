import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TextInput, Pressable } from 'react-native';
import { darkModePalette } from '../styles/DarkModePalette';
import CheckBox from 'react-native-check-box';

export default function ExerciseRepoModal({ modalVisible, submitHandler }) {
    const [text, setText] = useState('');
    const [isFavoritesChecked, setIsFavoritesChecked] = useState(true);

    const textHandler = (text) => {
        setText(text);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.bottomView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Filter Exercises</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={textHandler}
                        value={text}
                    />
                    <View style={styles.checkboxRow}>
                        <CheckBox
                            uncheckedCheckBoxColor={darkModePalette.white}
                            checkedCheckBoxColor={darkModePalette.secondary}
                            onClick={() => setIsFavoritesChecked(!isFavoritesChecked)}
                            isChecked={isFavoritesChecked}
                        />
                        <Text style={styles.checkboxText}>Favorites</Text>
                    </View>
                    
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
      alignItems: 'flex-end',
    },
    modalView: {
      backgroundColor: darkModePalette.black,
      borderRadius: 5,
      padding: 35,
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      borderTopColor: darkModePalette.secondary,
      borderTopWidth: 3,
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
        marginBottom: 15,
        paddingHorizontal: 35,
        paddingVertical: 6,
        minWidth: 200,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: darkModePalette.secondary,
        color: darkModePalette.black,
        backgroundColor: darkModePalette.white
    },
    checkboxRow: {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxText: {
        color: darkModePalette.white,
        marginLeft: 5,
        marginRight: 10,
    }
  });