import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native';
import ExerciseRepoHeader from '../components/ExerciseRepoHeader';
import ExerciseRepoListItem from '../components/ExerciseRepoListItem';
import ExerciseRepoModal from '../components/ExerciseRepoModal';
import { darkModePalette } from '../styles/DarkModePalette';
// import { f, firestore } from '../config/config';

export default function ExerciseRepo() {
  const defaultExercises = [
    {name: 'Barbell Deadlift', isFavorite: true, key: '2'},
    {name: 'Barbell Lying Triceps Extension "Skull Crusher"', isFavorite: false, key: '4'},
    {name: 'Barbell Squat', isFavorite: false, key: '1'},
    {name: 'Dumbbell Bench Press', isFavorite: false, key: '3'},
    {name: 'Close Grip Push-up', isFavorite: true, key: '12'},
    {name: 'Cable Close Grip Pulldown', isFavorite: false, key: '5'},
    {name: 'Cable Lying Leg-Hip Raise', isFavorite: false, key: '6'},
    {name: 'Incline Twisting Sit-up', isFavorite: false, key: '7'},
    {name: 'Sled 45° Calf Press', isFavorite: true, key: '8'},
    {name: 'Cambered Barbell Lying Row', isFavorite: false, key: '9'},
    {name: 'Cable Incline Row', isFavorite: false, key: '10'},
    {name: 'Cable Seated Row', isFavorite: false, key: '11'},
  ];

  const [exercises, setExercises] = useState(defaultExercises);

  const [filteredExercises, setFilteredExercises] = useState();
  const [filterText, setFilterText] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  
  const filterHandler = (text) => {
    setModalVisible(!modalVisible);
    setFilterText(text);
  };

  const favoriteHandler = (key) => {
    setExercises((prevExercises) => {
      var exerciseToToggleFavorite = prevExercises.find(e => e.key == key);
      exerciseToToggleFavorite.isFavorite = !exerciseToToggleFavorite.isFavorite;
      return [exerciseToToggleFavorite, ...prevExercises.filter(e => e.key != key)];
    });
  }

  const listSorter = (a, b) => {
    /* Sort by favorite first */
    if (a.isFavorite && !b.isFavorite) { return -1; } // a before b
    if (!a.isFavorite && b.isFavorite) { return 1; } // b before a

    /* if a & b are both/neither favorites, sort by alphabetical */
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}

    /* 0 means a and b are same favorite status and name */
    return 0;
  }

  useEffect(() => {
    console.log('Exercises has been updated!');

    setFilteredExercises(() => {
      return exercises.filter(e => e.name.toLowerCase().search(filterText) > -1).sort(listSorter);
    });
  }, [exercises]);

  useEffect(() => {
    console.log('Filter text has been changed to: ' + filterText);

    setFilteredExercises(() => {
      var newFilteredExerciseList = exercises.filter(e => e.name.toLowerCase().search(filterText) > -1).sort(listSorter);
      console.log(newFilteredExerciseList.length);
      return newFilteredExerciseList;
    });
  }, [filterText]);

  return (
    <View style={styles.list}>
      <FlatList
        data={filteredExercises}
        ListHeaderComponent={<ExerciseRepoHeader modalVisible={modalVisible} setModalVisible= {setModalVisible}/>}
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => (
          <ExerciseRepoListItem item={item} favoriteHandler={favoriteHandler}/>
        )}
      />
      <ExerciseRepoModal modalVisible={modalVisible} setModalVisible= {setModalVisible} submitHandler={filterHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: darkModePalette.shadowAlt,
  },
});

/* 
Exercise Repo TODO
- [] Add community icon on listitem bottom right corner to indicate if community made
- [] Add checkbox and associated text to filter modal for community
- [] Hook up checkbox logic to filter the listitems
- [] Hook up firestore to initialize list
*/