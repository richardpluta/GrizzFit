import React, { createContext, useState } from 'react'

export const MainScreenContext = createContext();

export const MainScreenProvider = ({children}) => {
    const [recordingWorkout, setRecordingWorkout] = useState(null)
    const [numberOfCreatedWorkouts, setNumberOfCreatedWorkouts] = useState(0)

    return (
        <MainScreenContext.Provider
            value={{
                recordingWorkout,
                setRecordingWorkout,
                numberOfCreatedWorkouts,
                setNumberOfCreatedWorkouts
            }}
        >
            {children}
        </MainScreenContext.Provider>
    );
}