import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  WalletCard,
  WalletButtons,
  TransactionContainer,
} from '../../components';
import { style } from './style';
import { useWallet } from '../../context';

const Home = (props: any) => {
  const { route } = props;
  const { params } = route;
  const { MagicKey } = params;
  const { setMagic } = useWallet();

  useEffect(() => {
    setMagic(MagicKey);
  });

  return (
    <View style={style.default}>
      <WalletCard />
      <WalletButtons />
      <TransactionContainer />
    </View>
  );
};

export { Home };
