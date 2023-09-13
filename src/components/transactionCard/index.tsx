import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { style } from './style';

const TransactionCard = ({
  icon,
  type,
  date,
  amount,
}: {
  icon: string;
  type: string;
  date: string;
  amount: string;
}) => {
  return (
    <TouchableOpacity style={style.default}>
      <View style={style.transactionDetails}>
        <View style={style.icon} />
        <View>
          <Text style={style.type}>{`${type}`}</Text>
          <Text style={style.date}>{`${date}`}</Text>
        </View>
      </View>
      <View>
        <Text style={style.amount}>R {`${amount}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { TransactionCard };
