import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { APP_NAME } from '@env';
import { style } from './style';

const Loading = () => {
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
          {APP_NAME}
        </Text>
        <ActivityIndicator size={'large'} />
      </View>
    </View>
  );
};

export { Loading };
