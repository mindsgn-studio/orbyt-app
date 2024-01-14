import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { style } from './style';

const WalletCard = () => {
  return (
    <TouchableOpacity style={style.default}>
      <TouchableOpacity>
        <Text style={style.amount}>{`R`}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.networkButton} onPress={() => {}}>
        <ActivityIndicator />

        <Text style={style.networkButtonText}>{'BITCOIN'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export { WalletCard };
