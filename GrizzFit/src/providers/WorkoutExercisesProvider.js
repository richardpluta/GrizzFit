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

const exampleWorkouts = [{
  key: "1",
  title: "Dan's Back & Biceps",
  tags: "#back #biceps #pullday",
  exercises: [...initialExercises],
  isFavorite: true
},
{
  key: "2",
  title: "Sick Arms by Jim Stoppani",
  tags: "#triceps #biceps #arms",
  exercises: [[...initialExercises].pop()],
  isFavorite: false
},
{
  key: "3",
  title: "Built By Science Back Day",
  tags: "#back #builtbyscience",
  exercises: [...initialExercises].filter(wrk => wrk.key === "2"),
  isFavorite: false
}]

export const WorkoutExercisesProvider = ({children}) => {
    const [workoutExercises, setWorkoutExercises] = useState(initialExercises);
    const [workouts, setWorkouts] = useState(exampleWorkouts)
    
    const DEFAULT_SETS = 3
    const DEFAULT_REPS = 6
    const DEFAULT_INTENSITY = 1

    return (
        <WorkoutExercisesContext.Provider
            value={{
                workoutExercises,
                setWorkoutExercises,
                workouts,
                setWorkouts,
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
                addSetToExercise: (exerciseToUpdate, targetReps) => {
                    let reps = targetReps? targetReps : DEFAULT_REPS
                    setWorkoutExercises(
                      [...workoutExercises].map(exr => {
                        if (exr.key === exerciseToUpdate.key) {
                          let newExercise = {...exr}
                          newExercise.sets = [...exr.sets, {actualReps: 0, targetReps: reps}]
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
                },
                updateTargetRepsInExercise: (exerciseToUpdate, setIndex, newReps) => {
                  setWorkoutExercises(
                    [...workoutExercises].map(exr => {
                      if (exr.key === exerciseToUpdate.key) {
                        let newExercise = {...exr}
                        newExercise.sets[setIndex] = {actualReps: 0, targetReps: newReps}
                        return newExercise
                      } else {
                        return exr
                      }
                    })
                  )
                },
                removeWorkout: workout => setWorkouts(workouts.filter(item => item !== workout))
            }}
        >
            {children}
        </WorkoutExercisesContext.Provider>
    );
}