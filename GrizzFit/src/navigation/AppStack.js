import React from 'react'
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import Main from '../screens/Main';
import ExerciseRepo from '../screens/ExerciseRepo';
import Test from '../screens/Test';
import TestFirestore from '../screens/TestFirestore';
import Header from '../components/Header';

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
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
      </Drawer.Navigator>
    )
}

export default AppStack;

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