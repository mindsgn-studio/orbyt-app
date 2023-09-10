import React from 'react';
import { View, Text } from 'react-native';

import { style } from './style';

const Loading = (props: any) => {
  return (
    <View style={style.default}>
      <View>
        <Text
          style={[
            {
              fontFamily: 'SF-Pro-Rounded-Heavy',
              fontSize: 60,
              color: 'white',
            },
          ]}
        >
          ORBYT
        </Text>
      </View>
    </View>
  );
};

export default Loading;
