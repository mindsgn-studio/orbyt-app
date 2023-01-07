import React from 'react';
import { View, Animated } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';

import { WalletAction } from '../../redux/actions';
import { style } from './style';

SplashScreen.show();

const Load = (props: any) => {
  const { connected, navigation } = props;
  const progress = React.useRef(new Animated.Value(0)).current;
  const { getMarketData } = WalletAction(props);

  const isConnected = async () => {
    Animated.timing(progress, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    if (connected) {
      await getMarketData();
    } else {
      navigation.navigate('SignIn');
    }
  };

  React.useEffect(() => {
    if (connected) {
      navigation.navigate('Home');
    }
  }, [connected]);

  React.useEffect(() => {
    SplashScreen.hide();
    Animated.timing(progress, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setTimeout(isConnected, 5000);
  }, [connected]);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={style.default}>
      <View>
        <Animated.Text
          style={[
            {
              fontFamily: 'SF-Pro-Rounded-Heavy',
              fontSize: 60,
              color: 'white',
            },
            {
              opacity: progress,
            },
          ]}
        >
          ORBYT
        </Animated.Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return { connected: state.connected, markets: state.markets };
};

export default connect(mapStateToProps)(Load);
