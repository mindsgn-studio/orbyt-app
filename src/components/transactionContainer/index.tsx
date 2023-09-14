import React from 'react';
import { View, Text } from 'react-native';
import { TransactionCard } from '../transactionCard';
import { style } from './style';
import { useWallet } from '../../context';

const TransactionContainer = () => {
  const { transactions } = useWallet();
  return (
    <View style={style.default}>
      <Text style={style.title}>Transactions</Text>
      <View style={style.transactionCardList}>
        {transactions &&
          transactions.map((item: any, index: number) => {
            return (
              <TransactionCard
                key={`${item.name}-${index}`}
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
