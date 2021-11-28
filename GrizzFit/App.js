import 'react-native-gesture-handler';
import React from 'react';
import Routes from './src/navigation/Routes';
import { AuthProvider } from './src/providers/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  )
}