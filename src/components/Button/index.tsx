import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { style } from './style';

const Button = ({ title, onPress }: { title: string; onPress: any }) => {
  return (
    <TouchableOpacity style={style.default} onPress={onPress}>
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export { Button };
