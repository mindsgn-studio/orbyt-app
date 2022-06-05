import React from 'react';
import { TouchableOpacity, Text } from 'react-native'

const Button = (
  {
    text, 
    onPress, 
    color, 
    fontColor,
    flex,
    minHeight,
    disabled,
    align,
    justify,
    size,
  } 
  : 
  {
    text:string, 
    onPress: any,
    color?: string,
    fontColor?: string,
    flex?: number,
    minHeight?: number,
    disabled?: boolean,
    align?: string,
    justify?: string,
    size?: number
  }
) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
            backgroundColor: `${color? color : 'white'}`,
            borderRadius: 10,
            padding: 10,
            minHeight: minHeight,
            margin: 10,
            flex: flex,
            alignItems: `${align? align : 'flex-start'}`,
            justifyContent: `${justify? justify : 'flex-start'}`,
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Text
                style={{
                    color: `${fontColor? fontColor : 'black'}`,
                    fontFamily:'SF-Pro-Rounded-Heavy',
                    fontSize: size? size : 15
                }}>
                {text}
            </Text>
    </TouchableOpacity>
  );
};

export default Button;
