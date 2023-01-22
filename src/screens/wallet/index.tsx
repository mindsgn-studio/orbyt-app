//@ts-ignore
import { WalletCard, TokenContainer, ReceiveCard } from '@orbyt/components';
//@ts-ignore
import { colors } from '@orbyt/constants';
//@ts-ignore
import { WalletAction } from '@orbyt/redux';
import { Qrcode } from '@walletconnect/react-native-dapp';
import { ethers } from 'ethers';
import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import RPC from '../../lib/rpc';
import { style } from './style';

const Wallet = (props: any) => {
  const { privKey, navigation } = props;
  const [displayRecieveCard, setDisplayRecieveCard] = React.useState(false);

  const getChainId = async () => {
    const networkDetails = await RPC.getChainId();
    //console.log(networkDetails);
  };

  const sendTransaction = async () => {
    const tx = await RPC.sendTransaction(privKey);
    // console.log(tx)
  };

  const signMessage = async () => {
    const message = await RPC.signMessage(privKey);
    // console.log(message)
  };

  const openQR = () => {};

  React.useEffect(() => {
    if (privKey) {
    }
  }, [privKey]);

  return (
    <View style={style.default}>
      <WalletCard />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          padding: 10,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginVertical: 5,
        }}
      >
        <TouchableOpacity
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${colors.orange}`,
            width: '50%',
            height: 60,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'SF-Pro-Rounded-Bold',
              fontSize: 25,
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDisplayRecieveCard(true);
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${colors.green}`,
            width: '50%',
            height: 60,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'SF-Pro-Rounded-Bold',
              fontSize: 25,
            }}
          >
            Receive
          </Text>
        </TouchableOpacity>
      </View>
      <TokenContainer />
    </View>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return {
    connected: state.wallet.connected,
    privKey: state.wallet.privKey,
  };
};

export default connect(mapStateToProps)(Wallet);
