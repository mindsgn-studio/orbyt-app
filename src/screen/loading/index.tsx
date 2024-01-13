import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { APP_NAME } from '@env';
import { style } from './style';
import { useEffect } from 'react';
import { useAuth } from 'context';

const Loading = (props: any) => {
  const { navigation } = props;
  const { auth } = useAuth();

  const getAuth = () => {
    setTimeout(() => {
      navigation.replace('Passcode');
    }, 1000);
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <View style={style.default}>
      <View>
        <Text
          style={[
            {
              fontFamily: 'SF-Pro-Rounded-Heavy',
              fontSize: 80,
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
