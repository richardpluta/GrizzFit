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
  const {user, logout} = useContext(AuthContext)
  const { recordingWorkout } = useContext(MainScreenContext)

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
        <Text style={styles.greeting}>Hello {userInfo.name}!</Text>
      </View>

      {recordingWorkout && 
        <View>
          <Text style={styles.sectionHeader}>Workout in Progress</Text>
          <Text style={styles.workoutHeader}>{recordingWorkout.title}</Text>
          <WorkoutFlatlist workoutExercises={recordingWorkout.exercises} showReps={false}/>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkModePalette.shadowAlt,
  },
  text: {
    color: "#CCCCCC",
    padding: 15,
    fontSize: 14,
  },
  greeting: {
    color: darkModePalette.white,
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  welcome: {
    backgroundColor: darkModePalette.shadowAlt,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: darkModePalette.black,
    color: darkModePalette.white  
  },
  workoutHeader: {
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    borderBottomColor: darkModePalette.black,
    borderBottomWidth: 2,
    backgroundColor: darkModePalette.shadow,
    color: darkModePalette.highlight  
  }
});
