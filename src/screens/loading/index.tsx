import React from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';

SplashScreen.show();

export const Load = (props: any) => {
  return <View />;
};

const mapStateToProps = (state: any, props: any) => {
  return { connected: state.connected, markets: state.markets };
};

export default connect(mapStateToProps)(Load);
