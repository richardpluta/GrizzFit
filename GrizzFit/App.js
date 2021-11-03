import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Platform, Dimensions } from 'react-native';
import { registerUser } from './services/login';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import ExerciseRepo from './screens/ExerciseRepo';
import { darkModePalette } from './styles/DarkModePalette';

import Main from './src/screens/Main';
import DrawerContent from './src/components/DrawerContent';
import Header from './src/components/Header';
import Test from './src/screens/Test';

const Drawer = createDrawerNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Main"
        //drawerContent={navigation => <DrawerContent {...navigation} />}
        screenOptions={({ route }) => ({
          drawerStyle: styles.drawer,
          swipeEdgeWidth: 200,
          headerTitle: () => <Header route={route}/>,
          headerStyle: styles.header,
          headerLeft: () => <DrawerToggleButton tintColor="#CCCCCC"/>,
          drawerActiveTintColor: "#CC9B6D",
          drawerInactiveTintColor: "#CCCCCC"
        })}
        >
          <Drawer.Screen name="Main" component={Main} options={{ title: "Home" }}/>
          <Drawer.Screen name="Test" component={Test}/>
      </Drawer.Navigator>
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
