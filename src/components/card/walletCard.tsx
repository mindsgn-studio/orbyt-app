//@ts-ignore
import { ETHLogo } from '@orbyt/assets';
import React from 'react';
import { View, Text, Animated } from 'react-native';
import { connect } from 'react-redux';

import RPC from '../../lib/rpc';

const WalletCard = (props: any) => {
  const cardOpacity = React.useRef(new Animated.Value(0)).current;
  const { privKey } = props;
  const [address, setAddress] = React.useState<any>('');
  const [balance, setBalance] = React.useState<number>(0);
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

  const getAccounts = async () => {
    const address = await RPC.getAccounts(privKey);
    setAddress(address);
  };

  const getBalance = async () => {
    const balance: any = await RPC.getBalance(privKey);
    setBalance(balance);
  };

  const truncateEthAddress = (address: string) => {
    if (address === '') return null;
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  React.useEffect(() => {
    getAccounts();
    getBalance();
    Animated.timing(cardOpacity, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        minHeight: 200,
        opacity: cardOpacity,
        display: 'flex',
        backgroundColor: 'black',
        borderRadius: 10,
        margin: 10,
        padding: 20,
        borderColor: 'white',
        borderWidth: 2,
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: 'SF-Pro-Rounded-Bold',
            color: 'white',
            fontSize: 20,
          }}
        >
          {truncateEthAddress(address)}
        </Text>
      </View>
      <View
        style={{
          marginTop: -20,
        }}
      >
        <Text
          style={{
            fontFamily: 'SF-Pro-Rounded-Heavy',
            color: 'white',
            fontSize: 45,
          }}
        >
          R {balance}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          right: '2%',
          bottom: '4%',
          borderRadius: 100,
          minWidth: 50,
          minHeight: 50,
          maxWidth: 50,
          maxHeight: 50,
        }}
      >
        <ETHLogo width={50} height={50} />
      </View>
    </Animated.View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    connected: state.connected,
    privKey: state.privKey,
    user: state.user,
    error: state.error,
  };
};

export default connect(mapStateToProps)(WalletCard);
