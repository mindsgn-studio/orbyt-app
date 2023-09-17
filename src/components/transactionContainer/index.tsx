import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { style } from './style';
import { useWallet } from '../../context';
import { TransactionCard } from '../transactionCard';

const TransactionContainer = () => {
  const { transactions } = useWallet();

  return (
    <View style={style.default}>
      <Text style={style.title}>Transactions</Text>
      <View style={style.transactionCardList}>
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <TransactionCard
              key={`${item.blockHash}`}
              icon={``}
              date={item.timeStamp}
              type={``}
              label={item.label}
              amount={`${item.value}`}
            />
          )}
        />
      </View>
    </View>
  );
};

export { TransactionContainer };
