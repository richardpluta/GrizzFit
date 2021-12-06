import React, { createContext, useState } from 'react'

export const WorkoutExercisesContext = createContext();

export const WorkoutExercisesProvider = ({children}) => {
    const [workoutExercises, setWorkoutExercises] = useState([]);

    return (
        <WorkoutExercisesContext.Provider
            value={{
                workoutExercises,
                setWorkoutExercises,
                intensityToString: (num) => {
                    const converter = ['Light','Light - Medium','Medium','Medium - Hard','Hard']
                    return converter[num * 2]
                },
            }}
        >
            {children}
        </WorkoutExercisesContext.Provider>
    );
}