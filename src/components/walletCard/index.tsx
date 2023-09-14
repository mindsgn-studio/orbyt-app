import React from 'react';
import { View, Text } from 'react-native';
import { style } from './style';
import { useWallet } from '../../context';

const WalletCard = () => {
  const {} = useWallet();

  return (
    <View style={style.default}>
      <Text style={style.amount}>R 0.00</Text>
    </View>
  );
};

export { WalletCard };
