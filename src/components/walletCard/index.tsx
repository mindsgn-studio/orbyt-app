import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { style } from './style';
import { useWallet } from 'context';
import { numberFormatter } from 'hooks';
import { LineGraph } from '../../components'; 

const WalletCard = () => {
  const { balance, exchangeRate } = useWallet();
  const [formatedBalance, setFormatedBalance] = useState(balance.toFixed(2));

  useEffect(() => {
    setFormatedBalance(numberFormatter(balance * exchangeRate, 1));
  }, [balance]);

  return (
    <View style={style.default}>
      <View>
        <Text style={style.text}>{`Total Balance`}</Text>
        <Text style={style.amount}>{`R ${formatedBalance}`}</Text>
      </View>
    </View>
  );
};

export { WalletCard };
