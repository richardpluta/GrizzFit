import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { firestore } from '../../config/config';
import { AuthContext } from '../providers/AuthProvider';
import { darkModePalette } from '../styles/DarkModePalette';
import { MainScreenContext } from '../providers/MainScreenProvider';
import WorkoutFlatlist from '../components/WorkoutFlatlist';
import Loader from '../components/Loader';

export default function Main({ navigation }) {
  const { user } = useContext(AuthContext)
  const { recordingWorkout, numberOfCreatedWorkouts } = useContext(MainScreenContext)

  const [isLoading, setIsLoading] = useState(true)
  const [userInfo, setUserInfo] = useState('')

  const getUserInfo = async () => {
    const userDoc = await firestore.collection("users").doc(user.uid).get()
    if (!userDoc.exists) { console.log('No such document!'); }
    setUserInfo(userDoc.data())
    setIsLoading(false)
  }

  useEffect(() => {
    getUserInfo()
    navigation.addListener("focus", () => setIsLoading(!isLoading))
  }, [navigation, isLoading])

  if (isLoading) return <Loader />

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.greeting}>Hello</Text>
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("ProfileStack")}>
          <Text style={[styles.greeting, {color: darkModePalette.primary}]}>{" " + (userInfo.name ?? user.email) + " "}</Text>
        </TouchableOpacity>
        <Text style={[styles.greeting, {marginLeft: -5}]}>!</Text>
      </View>

      {numberOfCreatedWorkouts >= 0 && 
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionContentText}>Created Workouts</Text>
          <Text style={[styles.sectionContentText, styles.textAccent]}>{numberOfCreatedWorkouts}</Text>
        </View>
      }

      {recordingWorkout && 
        <View style={styles.sectionHeaderColumn}>
          <Text style={styles.sectionContentHeaderText}>Workout in Progress</Text>
          <Text style={styles.sectionContentContentText}>{recordingWorkout.title}</Text>
          <WorkoutFlatlist workoutExercises={recordingWorkout.exercises} showReps={false}/>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkModePalette.black,
  },
  text: {
    color: "#CCCCCC",
    padding: 15,
    fontSize: 14,
  },
  greeting: {
    color: darkModePalette.white,
    fontSize: 20,
    textAlign: 'center',
  },
  link: {
    color: darkModePalette.white,
    textAlign: 'center',
  },
  welcome: {
    backgroundColor: darkModePalette.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },
  button: {
    borderColor: darkModePalette.white,
    backgroundColor: darkModePalette.black,
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: darkModePalette.shadow,
  },
  sectionHeaderColumn: {  
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: darkModePalette.shadow,
  },
  sectionContentText: {
    fontSize: 16, 
    textAlign: 'center',
    paddingRight: 10,
    color: darkModePalette.white 
  },
  textAccent: {
    color: darkModePalette.highlight,
    fontWeight: 'bold' 
  },
  sectionContentHeaderText: {
    fontSize: 18, 
    textAlign: 'center',
    padding: 10,
    color: darkModePalette.white 
  },
  sectionContentContentText: {
    fontSize: 16, 
    textAlign: 'center',
    paddingBottom: 10,
    color: 'peachpuff',
    borderBottomColor: darkModePalette.black,
    borderBottomWidth: 4,
  }
});
