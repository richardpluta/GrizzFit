import React from 'react'
import { View, Text } from 'react-native'

export const intensityToString = (num) => {
    const converter = ['Light','Light - Medium','Medium','Medium - Hard','Hard']
    return converter[num * 2]
}