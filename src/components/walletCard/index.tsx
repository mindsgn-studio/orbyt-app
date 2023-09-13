import React from 'react';
import { View, Text } from 'react-native';

import { style } from './style';

const WalletCard = () => {
  return (
    <View style={style.default}>
      <Text style={style.amount}>R 0.00</Text>
    </View>
  );
};

export { WalletCard };
