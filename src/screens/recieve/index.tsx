import React from 'react';
import { View } from 'react-native';

import { style } from './style';
import { Heading } from '../../components/Heading';

const Recieve = (props: any) => {
  const { navigation } = props;
  return (
    <View style={style.default}>
      <Heading
        title="Recieve"
        exit={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export { Recieve };
