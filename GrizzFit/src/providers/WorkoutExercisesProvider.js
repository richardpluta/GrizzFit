import React, { createContext, useState } from 'react'
import {intensityToString} from '../helpers/Helpers'

export const WorkoutExercisesContext = createContext();

const initialExercises = [
    {
      key: '1',
      name: 'Bench Press',
      intensity: intensityToString(1),
      sets: [
        {actualReps: 0, targetReps: 8},
        {actualReps: 0, targetReps: 8},
        {actualReps: 0, targetReps: 8}
      ]
    },
    {
      key: '2',
      name: 'Incline Bench Press',
      intensity: intensityToString(1.5),
      actualSets: [1,3,5,6,7],
      sets: [
        {actualReps: 0, targetReps: 1},
        {actualReps: 0, targetReps: 3},
        {actualReps: 0, targetReps: 5},
        {actualReps: 0, targetReps: 7},
      ]
    },
    {
      key: '3',
      name: 'Tricep Pulldowns',
      intensity: intensityToString(0.5),
      sets: [
        {actualReps: 0, targetReps: 12},
        {actualReps: 0, targetReps: 12},
        {actualReps: 0, targetReps: 12}
      ]
    },
]

export const WorkoutExercisesProvider = ({children}) => {
    const [workoutExercises, setWorkoutExercises] = useState(initialExercises);
    
    const DEFAULT_SETS = 3
    const DEFAULT_REPS = 6
    const DEFAULT_INTENSITY = 1

    return (
        <WorkoutExercisesContext.Provider
            value={{
                workoutExercises,
                setWorkoutExercises,
                addExerciseToWorkout: (newExercise) => {
                    setWorkoutExercises([
                        ...workoutExercises, 
                        {
                            key: newExercise.key,
                            name: newExercise.name,
                            intensity: intensityToString(DEFAULT_INTENSITY),
                            actualSets: [DEFAULT_REPS,DEFAULT_REPS,DEFAULT_REPS],
                            sets: [...Array(DEFAULT_SETS)].map((s) => {
                                return {actualReps: 0, targetReps: DEFAULT_REPS}
                            })
                        }
                        
                    ])
                },
                removeExerciseFromWorkout: (exerciseToRemove) => {
                    setWorkoutExercises(
                        [...workoutExercises].filter(exr => exr.key !== exerciseToRemove.key)
                    )
                },
                addSetToExercise: (exerciseToUpdate) => {
                    setWorkoutExercises(
                      [...workoutExercises].map(exr => {
                        if (exr.key === exerciseToUpdate.key) {
                          let newExercise = {...exr}
                          newExercise.sets = [...exr.sets, {actualReps: 0, targetReps: DEFAULT_REPS}]
                          return newExercise
                        } else {
                          return exr
                        }
                      })
                    )
                },
                removeSetFromExercise: (exerciseToUpdate) => {
                    setWorkoutExercises(
                      [...workoutExercises].map(exr => {
                        if (exr.key === exerciseToUpdate.key) {
                          let newExercise = {...exr}
                          newExercise.sets.pop()
                          return newExercise
                        } else {
                          return exr
                        }
                      })
                    )
                }
            }}
        >
            {children}
        </WorkoutExercisesContext.Provider>
    );
}