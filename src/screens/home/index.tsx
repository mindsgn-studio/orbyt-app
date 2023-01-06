//@ts-ignore
import { Wallet } from '@orbyt/screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: () => <Icon name="wallet" size={20} />,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: () => <Icon name="wallet" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};
