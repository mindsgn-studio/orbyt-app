import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Loading, Home } from './src/screens';

const App = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
