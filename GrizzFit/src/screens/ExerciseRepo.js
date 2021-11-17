import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native';

import ExerciseRepoListItem from '../components/ExerciseRepoListItem';
import Loader from '../components/Loader';
import { firestore } from '../../config/config';
import { darkModePalette } from '../styles/DarkModePalette';
import ExerciseRepoFilterButton from '../components/ExerciseRepoFilterButton';
import ExerciseRepoModal from '../components/ExerciseRepoModal';

export default function ExerciseRepo({ navigation }) {
  const ExercisesCollectionRef = firestore.collection("exercises");

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  const filterSubmitHandler = (filterText) => {
    console.log('Filtering by text: ' + filterText);
    setLoading(true);

    // Query firestore and add exercises with the name containing the filterText string
    ExercisesCollectionRef.get()
      .then(querySnapshot => {
        const exerciseNames = [];

        querySnapshot.forEach(documentSnapshot => {
          const exerciseNameInLowercase = documentSnapshot.get('name').toLowerCase();
          
          if (exerciseNameInLowercase.search(filterText) > -1) {
            exerciseNames.push({
              name: documentSnapshot.get('name'),
              instructions: documentSnapshot.get('instructions'),
              formGifUrl: documentSnapshot.get('formGifUrl'),
              key: documentSnapshot.id,
            });
          }
        });

        setExercises(exerciseNames);
        setLoading(false);
      })

    setModalVisible(false);
  };

  useEffect(() => {
    // Query firestore, show all exercises
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
        ListHeaderComponent={<ExerciseRepoFilterButton setModalVisible={setModalVisible}/>}
        renderItem={({ item }) => (
          <ExerciseRepoListItem item={item} navigation={navigation} favoriteHandler={() => console.log('favorite me: ' + item.name)}/>
          )}
      />
      <ExerciseRepoModal modalVisible={modalVisible} submitHandler={filterSubmitHandler}/>
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

==FIX==
- [X] Filter by name
- [] Favoriting exercises
  - add users collection
  - create user document on registration

==FEATURES==
- [] ExerciseInfo screen
- [] Filter by muscle category
*/