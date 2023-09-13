import React from 'react';
import { View, Text } from 'react-native';
import { TransactionCard } from '../transactionCard';
import { style } from './style';

const transactions: any = [
  {
    type: 'Deposit',
    date: '2 days ago',
    amount: 200,
  },
  {
    type: 'Sent R300 to Jen',
    date: '3 days ago',
    amount: 300,
  },
  {
    type: 'Recieved R300 to Jen',
    date: '10 days ago',
    amount: 300,
  },
];

const TransactionContainer = () => {
  return (
    <View style={style.default}>
      <Text style={style.title}>Transactions</Text>
      <View style={style.transactionCardList}>
        {transactions.map((item: any) => {
          return (
            <TransactionCard
              icon={''}
              date={item.date}
              type={item.type}
              amount={item.amount}
            />
          );
        })}
      </View>
    </View>
  );
};

export { TransactionContainer };
