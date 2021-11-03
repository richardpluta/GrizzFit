import React from "react"
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"

function DrawerContent({ navigation }) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Text>Main</Text> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default DrawerContent