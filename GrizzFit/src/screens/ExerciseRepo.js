import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native';

import ExerciseRepoListItem from '../components/ExerciseRepoListItem';
import Loader from '../components/Loader';
import { firestore } from '../../config/config';
import { darkModePalette } from '../styles/DarkModePalette';

export default function ExerciseRepo({ navigation }) {
  const ExercisesCollectionRef = firestore.collection("exercises");

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const subscriber = ExercisesCollectionRef
      .onSnapshot((querySnapshot) => {
        const exerciseNames = [];

        querySnapshot.forEach(documentSnapshot => {
          exerciseNames.push({
            name: documentSnapshot.get('name'),
            instructions: documentSnapshot.get('instructions'),
            formGifUrl: documentSnapshot.get('formGifUrl'),
            key: documentSnapshot.id,
          });
        });

        setExercises(exerciseNames);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [])
  
  if (loading) return <Loader/>
  
  return (
    <View style={styles.list}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseRepoListItem item={item} navigation={navigation} favoriteHandler={() => console.log('favorite me: ' + item.name)}/>
          )}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: darkModePalette.shadowAlt,
    flex: 1,
  },
});

/* 
Exercise Repo TODO
- [] Add community icon on listitem bottom right corner to indicate if community made
- [] Add checkbox and associated text to filter modal for community
- [] Hook up checkbox logic to filter the listitems
- [X] Hook up firestore to initialize list
*/