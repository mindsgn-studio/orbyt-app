import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, NativeModules } from 'react-native';

import { style } from './style';

const Loading = (props: any) => {
  return (
    <View style={style.default}>
      <View>
        <Text
          style={[
            {
              fontFamily: 'SF-Pro-Rounded-Heavy',
              fontSize: 100,
              color: 'white',
            },
          ]}
        >
          ORBYT
        </Text>
        <ActivityIndicator size={'large'} />
      </View>
    </View>
  );
};

export { Loading };
