/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { AppContext } from './src/context';
import { Loading } from './src/screens';
import initializeDb from './src/utility/db';

const Stack = createNativeStackNavigator();

const App = () => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDB = async () => {
      const _db = await initializeDb();
      setDb(_db);
    };
    initDB().then();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <AppContext.Provider value={{ db }}>
        <Loading />
      </AppContext.Provider>
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
