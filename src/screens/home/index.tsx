import React from 'react';
import { View, Text } from 'react-native';
import {
  WalletCard,
  WalletButtons,
  TransactionContainer,
} from '../../components';
import { style } from './style';

const Home = (props: any) => {
  return (
    <View style={style.default}>
      <WalletCard />
      <WalletButtons />
      <TransactionContainer />
    </View>
  );
};

export { Home };
