import React from 'react'
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import Main from '../screens/Main';
import Header from '../components/Header';
import ExerciseRepoStack from './ExerciseRepoStack';
import Profile from '../screens/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from '../screens/EditProfile'
import { darkModePalette } from '../styles/DarkModePalette';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        headerTintColor: darkModePalette.white,
        headerStyle: {
          backgroundColor: darkModePalette.shadowAlt,
          shadowColor: '#272121',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

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
        <Drawer.Screen name="ExerciseRepoStack" component={ExerciseRepoStack} options={{ title: "Exercise Library" }} />
        <Drawer.Screen name="ProfileStack" component={ProfileStack} options={{ title: "Profile" }} />
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