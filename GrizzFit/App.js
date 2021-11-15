import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Platform, Dimensions } from 'react-native';
import { registerUser } from './services/login';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './src/screens/Main';
import DrawerContent from './src/components/DrawerContent';
import Header from './src/components/Header';
import ExerciseRepo from './src/screens/ExerciseRepo';
import Test from './src/screens/Test';
import darkModePalette from './src/styles/DarkModePalette';
import TestFirestore from './src/screens/TestFirestore';
import LoginScreen from './src/screens/LoginScreen';
import Register from './src/screens/Register';
import { auth } from './config/config';

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            console.log(isLoggedIn)
            setIsLoggedIn(!isLoggedIn)
        }
    })

    return unsubscribe
}, [])

  return (
    <NavigationContainer>
      {!isLoggedIn &&
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      }
      {isLoggedIn && 
      <Drawer.Navigator
        initialRouteName="Main"
        //drawerContent={navigation => <DrawerContent {...navigation} />}
        screenOptions={({ route }) => ({
          drawerStyle: styles.drawer,
          swipeEdgeWidth: 200,
          headerTitle: () => <Header route={route} />,
          headerStyle: styles.header,
          headerLeft: () => <DrawerToggleButton tintColor="#CCCCCC" />,
          drawerActiveTintColor: "#CC9B6D",
          drawerInactiveTintColor: "#CCCCCC"
        })}
      >
        <Drawer.Screen name="Main" component={Main} options={{ title: "Home" }} />
        <Drawer.Screen name="ExerciseRepo" component={ExerciseRepo} options={{ title: "Exercise Library" }} />
        <Drawer.Screen name="Test" component={Test} />
        <Drawer.Screen name="FirestoreTest" component={TestFirestore} options={{ title: "Firestore Test" }} />
      </Drawer.Navigator>}
    </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  drawer: {
    width: "66%",
    backgroundColor: '#333333'
  },
  header: {
    backgroundColor: '#333333',
    borderBottomColor: '#CC9B6D',
    borderBottomWidth: 3
  }
});
