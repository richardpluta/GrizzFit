import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native';

import ExerciseRepoListItem from '../components/ExerciseRepoListItem';
import Loader from '../components/Loader';
import { firestore } from '../../config/config';
import { darkModePalette } from '../styles/DarkModePalette';
import ExerciseRepoFilterButton from '../components/ExerciseRepoFilterButton';
import ExerciseRepoModal from '../components/ExerciseRepoModal';

export default function ExerciseRepo({ route, navigation }) {
  const {fromWorkoutCreator} = route.params ?? false;

  const ExercisesCollectionRef = firestore.collection("exercises");
  const MusclesCollectionRef = firestore.collection("muscles");

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [originalExercises, setOriginalExercises] = useState([])

  const filterSubmitHandler = async (filterText, filterCategories) => {
    // Helper: Given target muscles array, will return whether target muscles is in filter categories
    const filterCategoriesPredicate = exrTargetMuscles => {
      let targetMuscleCategory = -1

      if (exrTargetMuscles.length > 0) {
        const path = exrTargetMuscles[0].split("/muscles/").pop()
        const docSnapshot = querySnapshot.docs.find(x => x.id === path)
        targetMuscleCategory = docSnapshot.get('filterCategory')
      }
      
      return targetMuscleCategory >= 0 && targetMuscleCategory <= 4 && filterCategories[targetMuscleCategory]
    }

    // Helper: Given exercise name, will return whether exercise name is in filter text
    const filterTextPredicate = exrName => {
      return exrName.toLowerCase().search(filterText.toLowerCase()) > -1
    }

    setLoading(true);

    const querySnapshot = await MusclesCollectionRef.get()

    const filteredExercises = originalExercises.filter(exr => (
      filterTextPredicate(exr.name) && filterCategoriesPredicate(exr.targetMuscles)
    ));
    
    setExercises(filteredExercises)

    setLoading(false);
    setModalVisible(false);
  }

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
    setOriginalExercises(exerciseNames)
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
          <ExerciseRepoListItem item={item} navigation={navigation} fromWorkoutCreator={fromWorkoutCreator} />
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
