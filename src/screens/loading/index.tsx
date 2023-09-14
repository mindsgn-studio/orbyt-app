import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { style } from './style';

const Loading = (props: any) => {
  const { navigation, route } = props;
  const { params } = route;
  const { MagicKey } = params;

  const isauth = async () => {
    const isLoggedIn = await MagicKey.user.isLoggedIn();
    if (isLoggedIn) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('SignIn');
    }
  };

  useEffect(() => {
    isauth();
  }, []);

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
      </View>
    </View>
  );
};

export { Loading };
