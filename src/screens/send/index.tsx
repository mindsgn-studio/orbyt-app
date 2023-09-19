import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Heading, Button } from '../../components';
import { style } from './style';

const Send = (props: any) => {
  const { navigation } = props;
  return (
    <View style={style.default}>
      <Heading
        title="Send"
        exit={() => {
          navigation.navigate('Home');
        }}
      />
      <View style={style.sendContainer}>
        <View></View>
        <View></View>
        <Button title={'SEND'} onPress={() => {}} />
      </View>
    </View>
  );
};

export { Send };
