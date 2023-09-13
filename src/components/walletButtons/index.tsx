import React from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';

import { style } from './style';

const WalletButtons = () => {
  return (
    <View style={style.default}>
      <TouchableOpacity style={style.sendButton}>
        <Text style={style.buttonText}>SEND</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.recieveButton}>
        <Text style={style.buttonText}>RECIEVE</Text>
      </TouchableOpacity>
    </View>
  );
};

export { WalletButtons };
