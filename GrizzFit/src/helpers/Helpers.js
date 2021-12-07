import React from 'react'
import { View, Text } from 'react-native'

export const intensityToString = (num) => {
    const converter = ['Light','Light - Medium','Medium','Medium - Heavy','Heavy']
    return converter[num * 2]
}