import { Magic } from '@magic-sdk/react-native-bare';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, WalletProvider } from './src/context/index';
import { network } from './src/constants';
import { Loading, Home, SignIn } from './src/screens';

const MagicKey = new Magic('pk_live_61C2EC6AE4FECCC3');

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider style={styles.screen}>
      <AuthProvider>
        <WalletProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="Loading"
                component={Loading}
                initialParams={{ MagicKey }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                initialParams={{ MagicKey }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                initialParams={{ MagicKey }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <MagicKey.Relayer />
        </WalletProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
