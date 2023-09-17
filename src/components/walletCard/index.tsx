import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { style } from './style';
import { useWallet } from '../../context';

const WalletCard = () => {
  const { balance, exhangeRate } = useWallet();
  const [formatedBalance, setFormatedBalance] = useState(balance.toFixed(2));

  const nFormatter = (num: any, digits: any) => {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];

    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
      : '0';
  };

  useEffect(() => {
    setFormatedBalance(nFormatter(balance * exhangeRate, 1));
  }, [balance]);

  return (
    <View style={style.default}>
      <Text style={style.amount}>{`R ${formatedBalance}`}</Text>
    </View>
  );
};

export { WalletCard };
