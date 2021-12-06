import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { darkModePalette } from '../styles/DarkModePalette';
import { AuthContext } from '../providers/AuthProvider';
import { firestore } from '../../config/config';

export default function ExerciseRepoListItem({ item, navigation, fromWorkoutCreator }) {
    const showAddIcons = fromWorkoutCreator ?? false
    const iconSize = 30;
    
    const UsersCollectionRef = firestore.collection("users");
    const { user } = useContext(AuthContext);

    const [favorite, setFavorite] = useState(false)

    const favoriteHandler = async () => {
        const userDocRef = UsersCollectionRef.doc(user.uid)
        const userDoc = await userDocRef.get()
        if (!userDoc.exists) { console.log('No such document!'); }

        // get old array of favorite exercises
        const userFavoriteExercises = userDoc.get('favoriteExercises')

        let updatedArray = []

        // if favorite state is true, we need to remove from array
        if (favorite) {
            console.log('unfavoriting');
            setFavorite(false)
            updatedArray = userFavoriteExercises.filter(x => x !== item.key)
        } else { // else favorite state is false, we need to add to the array
            console.log('favoriting');
            setFavorite(true)
            updatedArray = [...userFavoriteExercises, item.key]
        }

        console.log(updatedArray);
        await userDocRef.update({favoriteExercises: updatedArray});
    }

    useEffect(() => {
        async function compareExerciseToUserFavoritesList() {
            const userDoc = await UsersCollectionRef.doc(user.uid).get()
            if (!userDoc.exists) { console.log('No such document!'); }
            const userFavoriteExercises = userDoc.get('favoriteExercises')

            userFavoriteExercises.forEach(ufe => {
                if (ufe === item.key) {
                    setFavorite(true)
                }
            })
        }

        compareExerciseToUserFavoritesList()
    }, [])

    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={favoriteHandler}>
                {!favorite && <MaterialIcons 
                    name="star-border" 
                    size={iconSize} 
                    color={darkModePalette.white}
                />}
                {favorite && <MaterialIcons 
                    name="star" 
                    size={iconSize} 
                    color={darkModePalette.primary}
                />}
            </TouchableOpacity>
        <TouchableOpacity 
            style={styles.flex} 
            onPress={() => {
                fromWorkoutCreator?
                    navigation.push("Add Exercise Info", {item: item})
                    :
                    navigation.push("ExerciseInfo", {item: item})
            }}
        >
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                {showAddIcons && <MaterialIcons 
                    name="add" 
                    size={iconSize} 
                    color={darkModePalette.secondary}
                />}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderColor: darkModePalette.black,
        borderRadius: 8,
        borderBottomWidth: 1,
        backgroundColor: darkModePalette.shadowAlt,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        marginLeft: 12,
        color: darkModePalette.white,
    },
    flex: {
        flex: 1,
    }
});