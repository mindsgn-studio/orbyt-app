import React from 'react';
import { View } from 'react-native';
import { Heading } from '../../components/Heading';

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
    </View>
  );
};

export { Send };
