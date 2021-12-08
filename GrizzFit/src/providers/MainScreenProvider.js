import React, { createContext, useState } from 'react'

export const MainScreenContext = createContext();

export const MainScreenProvider = ({children}) => {
    const [recordingWorkout, setRecordingWorkout] = useState(null)

    return (
        <MainScreenContext.Provider
            value={{
                recordingWorkout,
                setRecordingWorkout
            }}
        >
            {children}
        </MainScreenContext.Provider>
    );
}