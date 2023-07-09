import React from 'react';
import { TextInput as Input, View, Text } from 'react-native';

export const TextInput = ({
  placeholder,
  flex = 1,
  title = 'brody',
}: {
  placeholder?: string;
  flex?: number;
  title?: string;
}) => {
  return (
    <View
      style={{
        borderWidth: 4,
        flex: flex,
        margin: 5,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontFamily: 'SF-Pro-Rounded-Heavy',
        }}
      >
        {title}
      </Text>
      <View
        style={{
          borderRadius: 10,
          borderColor: 'white',
          borderWidth: 1,
          padding: 5,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontFamily: 'SF-Pro-Rounded-Heavy',
          }}
        >
          {placeholder}
        </Text>
      </View>
    </View>
  );
};
