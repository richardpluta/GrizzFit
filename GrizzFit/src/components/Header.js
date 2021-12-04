import React from "react"
import { StyleSheet, Text } from "react-native"

const headerTitles = {
    Main: ["Grizz", "Fit"],
    ExerciseRepoStack: ["Exercise", "Library"],
<<<<<<< HEAD
    ProfileStack: ["Profile", ""],
    MyWorkouts: ["My", "Workouts"]
=======
    Test: ["Test", "Page"],
    FirestoreTest: ["Firestore", "Test"],
    WorkoutsStack: ["My", "Workouts"]
>>>>>>> 615db0c (+ WorkoutStack and navigation)
}

function Header({ route }) {
    return (
        <Text style={styles.title1}>
            {headerTitles[route.name][0]}
            <Text style={styles.title2}>
            {headerTitles[route.name][1]}
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    title1: {
        //fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: 32,
        color: "#CC9B6D",
        paddingBottom: 5
    },
    title2: {
        //fontFamily: "Poppins",
        fontSize: 32,
        color: "#DDDDDD"
    }
})

export default Header