import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AppContainer from './screens/index'
export default function App() {
  return (
    <AppContainer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});
