import React from 'react';
import { View } from 'react-native';
import { style } from './style';
import {
  WalletCard,
  WalletButtons,
  TransactionContainer,
} from '../../components';

const Home = () => {
  return (
    <View style={style.default}>
      <WalletCard />
      <WalletButtons />
      <TransactionContainer />
    </View>
  );
};

export { Home };
