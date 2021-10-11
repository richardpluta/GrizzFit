import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { registerUser } from './services/login';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GrizzFit</Text>
      <Button 
        onPress={registerUser}
        title="Tickle Me"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
  }
});
