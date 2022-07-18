import React from 'react';
import { View, Animated } from 'react-native';
import { container } from '../../style/container.style';
import { OnboardingButton as Button } from '../../components/onboarding/button';
import { connect } from 'react-redux';
import WalletAction from '../../redux/actions/wallet.action';
import { colors } from '../../constants/index';

const Onboarding = (props: any) => {
    const { connected, navigation, error } = props;
    const { connectWallet } = WalletAction(props);
    
    //animations
    const progress = React.useRef(new Animated.Value(0)).current;
    const scale = React.useRef(new Animated.Value(0)).current;

    const createNewWallet = React.useCallback(() => {
        navigation.navigate('Create');
    },[]);
    
    const importWallet = React.useCallback(() => {
        navigation.navigate('Import');
    },[]);

    React.useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            useNativeDriver: true
        }).start();
        Animated.timing(scale, { toValue: 0.4, useNativeDriver: true }).start();
    }, []);

    React.useEffect(() => {
        if (connected) navigation.navigate('Home');
    }, [connected]);

    React.useEffect(() => {
        if (error) navigation.navigate('Error');
    }, [error]);

    return (
        <View 
            style={container.onboarding}>
            <View>
                <Animated.Text
                    style={[
                        {
                            color: `${colors.white}`,
                            fontSize: 50,
                            width: 300,
                            fontFamily: 'SF-Pro-Rounded-Heavy'
                        },
                        {
                            opacity: progress
                        }
                    ]}
                >
                    Set up your wallet
                </Animated.Text>
            </View>
            <View>
                <Animated.Text
                    style={[
                        {
                            color: `${colors.gray}`,
                            fontSize: 25,
                            width: 300,
                            fontFamily: 'SF-Pro-Rounded-Bold'
                        }
                    ]}
                >
                    welcome to the world of web3, you just one step closer to
                    total fincancial freedom.
                </Animated.Text>
            </View>
            <View
                style={{
                    width: '90%',
                    flex: 1,
                    padding: 10,
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Button
                    color={'#4C4C4C'}
                    onPress={() => connectWallet()}
                    text={'CONNECT WALLET'}
                />
                <Button
                    color={'#39B54A'}
                    onPress={() => createNewWallet()}
                    text={'CREATE NEW WALLET'}
                />
            </View>
            <View
                style={{
                    width: '90%',
                    flex: 1,
                    padding: 10,
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                <Button
                    color={'#F15A24'}
                    onPress={() => importWallet()}
                    text={'IMPORT WALLET'}
                />
            </View>
        </View>
    );
};

const mapStateToProps = (state: any, props: any) => {
    return {
        connected: state.connected,
        error: state.error
    };
};

export default connect(mapStateToProps)(Onboarding);
