import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { darkModePalette } from '../styles/DarkModePalette'

export default function WorkoutSetIndicator({ initReps, targetReps }) {
    const [reps, setReps] = useState(initReps)

    const evaluateRepsColor = () => {
        let percentOfTarget = reps / targetReps
        if (percentOfTarget <= 0.5) {
            return 'lightcoral'
        } else if (percentOfTarget <= 0.75) {
            return 'darkkhaki'
        } else if (percentOfTarget <= 0.95) {
            return 'darkseagreen'
        } else if (percentOfTarget <= 1.0) {
            return 'forestgreen'
        } else {
            return darkModePalette.secondary    
        }
    }    

    return (
        <TouchableOpacity 
            style={[styles.exerciseSet,{
                borderColor: targetReps? evaluateRepsColor() : darkModePalette.grey
            }]}
            onPress={() => setReps(reps + 1)}
            onLongPress={() => setReps(0)}
        >
            <Text style={[styles.exerciseSetText,{
                color: targetReps? evaluateRepsColor() : darkModePalette.white
            }]}>{reps}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    exerciseSet: {
        borderWidth: 2,
        marginRight: 8,
        marginVertical: 6, 
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    exerciseSetText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: "center",
    },
})
