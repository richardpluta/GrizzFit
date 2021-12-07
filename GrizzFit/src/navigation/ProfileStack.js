import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../screens/EditProfile";
import Profile from "../screens/Profile";
import { darkModePalette } from "../styles/DarkModePalette";

const Stack = createNativeStackNavigator();

const ProfileStack = ({ navigation }) => {
    return (
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
    )
}

export default ProfileStack;