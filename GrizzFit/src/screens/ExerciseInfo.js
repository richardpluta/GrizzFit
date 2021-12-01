import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { firestore } from '../../config/config';
import Loader from '../components/Loader';
import { darkModePalette } from '../styles/DarkModePalette';

export default function ExerciseInfo({ route, navigation }) {
    const {item} = route.params;

    const MusclesCollectionRef = firestore.collection("muscles");

    const [tmLoading, setTMLoading] = useState(true)
    const [smLoading, setSMLoading] = useState(true)

    const [showCommonName, setShowCommonName] = useState(false)
    const [targetMusclesInfo, setTargetMusclesInfo] = useState(new Map())
    const [targetMusclesTextArray, setTargetMusclesTextArray] = useState([["N/A", "N/A"]])
    const [synergistMusclesInfo, setSynergistMusclesInfo] = useState(new Map())
    const [synergistMusclesTextArray, setSynergistMusclesTextArray] = useState([["N/A", "N/A"]])
    const [instructions, setInstructions] = useState(["N/A"])

    useEffect(() => {
        let instructionsTextArray = []
        item.instructions.trim().split(". ").map(
            (value, index) => {
                let str = (index+1) + ') \t' + value
                instructionsTextArray.push(str)
            }
        )
        setInstructions(instructionsTextArray)

        async function getMuscleInfo() {
            const tmpaths = item?.targetMuscles?.map(
                element => element.split("/muscles/").pop()
            )

            if (tmpaths) {
                tmpaths.forEach(async (path, index) => {
                    if (path) {
                        const muscleDoc = await MusclesCollectionRef.doc(path).get();
                        if (muscleDoc.exists) {
                            const scienceName = muscleDoc.id.replace(/_/g, " ");
                            const commonName = muscleDoc.get('commonName');
    
                            setTargetMusclesInfo(targetMusclesInfo.set(
                                index, { scienceName: scienceName, commonName: commonName }
                            ));
    
                            let textArray = [];
                            targetMusclesInfo.forEach( 
                                value => textArray.push([value.commonName, value.scienceName])
                            );
                            setTargetMusclesTextArray(textArray);
                            setTMLoading(false)
                        }
                    }
                });
            }

            const smpaths = item?.synergistMuscles?.map(
                element => element.split("/muscles/").pop()
            )

            if (smpaths) {
                smpaths.forEach(async (path, index) => {
                    if (path) {
                        const muscleDoc = await MusclesCollectionRef.doc(path).get();
                        if (muscleDoc.exists) {
                            const scienceName = muscleDoc.id.replace(/_/g, " ");
                            const commonName = muscleDoc.get('commonName');
    
                            setSynergistMusclesInfo(synergistMusclesInfo.set(
                                index, { scienceName: scienceName, commonName: commonName }
                            ));

                            let textArray = [];
                            synergistMusclesInfo.forEach( 
                                value => textArray.push([value.commonName, value.scienceName])
                            );
                            setSynergistMusclesTextArray(textArray);
                            setSMLoading(false)
                        }
                    }
                });
            }
        }

        getMuscleInfo()
    }, [])

    if (tmLoading || smLoading) return <Loader/>

    return (
        <ScrollView style={styles.container} contentContainerStyle={{
            justifyContent: 'center',}}>
            <View style={styles.imageBorder}>
                <Image style={styles.formGif} source={{uri: item.formGifUrl}} />
            </View>

            <Text style={styles.exerciseName}>{item.name}</Text>

            <Text style={styles.bodyHeader}>Instructions</Text>
            {instructions.map(
                element => (
                    <Text style={styles.bodyText}>{element}</Text>
                ))}

            <View style={styles.seperator}></View>

            <TouchableWithoutFeedback onPress={() => setShowCommonName(!showCommonName)}>
                <Text style={styles.bodyHeader}>Target Muscles</Text>
            </TouchableWithoutFeedback>
            {targetMusclesTextArray.map(
                    element => (
                        <Text style={styles.bodyText}>{showCommonName? element[0] : element[1] }</Text>
                    ))}

            <TouchableWithoutFeedback onPress={() => setShowCommonName(!showCommonName)}>
                <Text style={styles.bodyHeader}>Synergist Muscles</Text>
            </TouchableWithoutFeedback>
            {synergistMusclesTextArray.map(
                    element => (
                        <Text style={styles.bodyText}>{showCommonName? element[0] : element[1] }</Text>
                    ))}

            <View>
                <TouchableWithoutFeedback style={styles.button}
                    onPress={() => navigation.pop()}
                >
                    <Text style={{color: darkModePalette.black}}>Back</Text>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkModePalette.shadowAlt,
    },
    seperator: {
        height: 1,
        backgroundColor: darkModePalette.black,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    exerciseName: {
        padding: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: darkModePalette.black,
        color: darkModePalette.white,
    },
    bodyText: {
        paddingBottom: 10,
        paddingHorizontal: 30,
        fontSize: 16,
        color: darkModePalette.white,
    },
    bodyHeader: {
        paddingLeft: 15,
        paddingBottom: 10,
        fontSize: 18,
        fontStyle: 'italic',
        color: darkModePalette.highlight
    },
    formGif: {
        width: 500,
        height: 250,
    },
    imageBorder: {
        borderBottomWidth: 3,
        borderBottomColor: darkModePalette.black,
    },
    button: {
        backgroundColor: darkModePalette.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        margin: 20,
    }
});