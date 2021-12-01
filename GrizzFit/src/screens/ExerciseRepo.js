import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Button } from 'react-native';

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

  function getDocumentsFromQuery(querySnapshot) {
    const exerciseNames = [];

    querySnapshot.forEach(documentSnapshot => {
      exerciseNames.push({
        name: documentSnapshot.get('name'),
        instructions: documentSnapshot.get('instructions'),
        formGifUrl: documentSnapshot.get('formGifUrl'),
        synergistMuscles: documentSnapshot.get('SynergistMuscles'),
        targetMuscles: documentSnapshot.get('targetMuscles'),
        key: documentSnapshot.id
      });
    });

    setExercises(exerciseNames)
    setLoading(false)
  }

  useEffect(() => {
    // Query firestore, show all exercises
    const subscriber = ExercisesCollectionRef
      .onSnapshot(qsnpsht => getDocumentsFromQuery(qsnpsht));

    // Unsubscribe from events when no longer in use
    return () => {
      subscriber()
      setLoading(true)
    };
  }, [])
  
  const alphabeticalOrder = (a, b) => {
    /* sort by alphabetical */
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}

    /* 0 means a and b are same name */
    return 0;
  }

  if (loading) return <Loader/>

  return (
    <View style={styles.list}>
      <FlatList
        data={exercises.sort(alphabeticalOrder)}
        ListHeaderComponent={<ExerciseRepoFilterButton setModalVisible={setModalVisible}/>}
        renderItem={({ item }) => (
          <ExerciseRepoListItem item={item} navigation={navigation} />
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
- [X] Favoriting exercises
  X add users collection
  X create user document on registration
- [] Back button from ExerciseInfo screen in header (Richard)

==FEATURES==
- [X] ExerciseInfo screen
- [] Filter by muscle category
*/