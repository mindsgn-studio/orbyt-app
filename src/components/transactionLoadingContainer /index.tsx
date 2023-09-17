import React from 'react';
import { View, Text } from 'react-native';

import { style } from './style';

const TransactionLoadingContainer = () => {
  return (
    <View style={style.default}>
      <Text style={style.text}>No Transaction</Text>
    </View>
  );
};

export { TransactionLoadingContainer };
