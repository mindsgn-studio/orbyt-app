import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../../constants';
import { Home, Swap, Contact, Profile } from '../../screens';

const Tab = createBottomTabNavigator();

const HomeTabs = (props: any) => {
  const { route } = props;
  const { params } = route;
  const { MagicKey } = params;

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 20,
          height: 60,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ MagicKey }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                padding: 10,
                borderRadius: 50,
                backgroundColor: focused ? colors.green : colors.white,
              }}
            >
              <Icon
                name="home-outline"
                size={focused ? 30 : 20}
                color={focused ? colors.white : colors.gray}
              />
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: () => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="Swap"
        component={Swap}
        initialParams={{ MagicKey }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                padding: 10,
                borderRadius: 50,
                backgroundColor: focused ? colors.green : colors.white,
              }}
            >
              <Icon
                name="swap-vertical-outline"
                size={focused ? 30 : 20}
                color={focused ? colors.white : colors.gray}
              />
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: () => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      {/*
      
      <Tab.Screen
        name="Contacts"
        component={Contact}
        initialParams={{ MagicKey }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                padding: 10,
                borderRadius: 50,
                backgroundColor: focused ? colors.green : colors.white,
              }}
            >
              <Icon
                name="person-outline"
                size={focused ? 30 : 20}
                color={focused ? colors.white : colors.gray}
              />
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: () => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ MagicKey }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                padding: 10,
                borderRadius: 50,
                backgroundColor: focused ? colors.green : colors.white,
              }}
            >
              <Icon
                name="settings-outline"
                size={focused ? 30 : 20}
                color={focused ? colors.white : colors.gray}
              />
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: () => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      */}
    </Tab.Navigator>
  );
};

export { HomeTabs };
