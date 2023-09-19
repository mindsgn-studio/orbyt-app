import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';

import { style } from './style';
import { useAuth } from '../../context';

const SignIn = (props: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode] = useState('+27');
  const { navigation, route } = props;
  const { auth, setAuth } = useAuth();
  const { params } = route;
  const { MagicKey } = params;

  const connectWithMagic = async () => {
    try {
      const response = await MagicKey.auth.loginWithSMS({
        phoneNumber: `${phoneCode}${phoneNumber}`,
      });
      await setAuth(response);
    } catch (error) {
      await setPhoneNumber('');
      await setAuth(null);
    }
  };

  useEffect(() => {
    if (auth) {
      navigation.navigate('Home');
    }
  }, [auth]);

  useEffect(() => {
    if (phoneNumber.length === 9) {
      connectWithMagic();
    }
  }, [phoneNumber]);

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
        <View style={style.tagContainer}>
          <Text
            style={[
              {
                fontFamily: 'SF-Pro-Rounded-Regular',
                fontSize: 16,
                color: 'white',
              },
            ]}
          >
            Welcome, To get Started, Sign in using your phone number.
          </Text>
        </View>
      </View>

      <View style={style.phoneNumberContainer}>
        <View>
          <Text style={style.phoneNumberText}>+27</Text>
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          {phoneNumber.length === 9 ? (
            <ActivityIndicator size="large" />
          ) : (
            <TextInput
              value={phoneNumber}
              multiline={false}
              numberOfLines={1}
              maxLength={9}
              style={[
                {
                  fontSize: 21,
                  color: 'white',
                  fontFamily: 'SF-Pro-Rounded-Regular',
                },
              ]}
              onChangeText={(value) => {
                setPhoneNumber(value);
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export { SignIn };
