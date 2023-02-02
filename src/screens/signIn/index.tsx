//@ts-ignore
import { SignInButton } from '@orbyt/components';
//@ts-ignore
import { colors } from '@orbyt/constants';
//@ts-ignore
import { WalletAction } from '@orbyt/redux';
import React from 'react';
import { View, Animated, Text } from 'react-native';
import { connect } from 'react-redux';

// import { OnboardingButton as Button } from '../../components/onboarding/button';

import { style } from './style';

const SignIn = (props: any) => {
  const {
    connected,
    navigation,
    marketTokenList,
    privKey,
    address,
    providerUrl,
    settings,
  } = props;
  const {
    connectWithWeb3Auth,
    getChainId,
    getAccount,
    getTokenList,
    getMarketList,
  } = WalletAction(props);
  const progress = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    Animated.timing(scale, { toValue: 0.4, useNativeDriver: true }).start();
  }, []);

  React.useEffect(() => {
    if (connected && marketTokenList.length === 0) {
      getChainId(providerUrl);
      getAccount(privKey);
      getMarketList();
    }

    if (marketTokenList.length > 0) {
      getTokenList(address, settings, marketTokenList);
      navigation.navigate('Home');
    }
  }, [connected]);

  return (
    <View style={style.default}>
      <View>
        <Text
          style={[
            {
              color: `${colors.white}`,
              fontSize: 50,
              width: 300,
              fontFamily: 'SF-Pro-Rounded-Heavy',
            },
          ]}
        >
          Sign in your wallet
        </Text>
      </View>
      <View>
        <Animated.Text
          style={[
            {
              color: `${colors.gray}`,
              fontSize: 25,
              width: 300,
              fontFamily: 'SF-Pro-Rounded-Bold',
            },
          ]}
        >
          welcome to the world of decentralized finance, you just one step
          closer to total fincancial freedom.
        </Animated.Text>
      </View>
      <View
        style={{
          width: '90%',
          flex: 1,
          padding: 10,
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <SignInButton
          color="#F15A24"
          onPress={() => connectWithWeb3Auth()}
          text="SIGN IN WITH GOOGLE"
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return {
    connected: state.wallet.connected,
    privKey: state.wallet.privKey,
    address: state.wallet.address,
    providerUrl: state.wallet.providerUrl,
    settings: state.wallet.settings,
    marketTokenList: state.wallet.marketTokenList,
  };
};

export default connect(mapStateToProps)(SignIn);
