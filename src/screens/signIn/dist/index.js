"use strict";
exports.__esModule = true;
//@ts-ignore
var components_1 = require("@orbyt/components");
//@ts-ignore
var constants_1 = require("@orbyt/constants");
//@ts-ignore
var redux_1 = require("@orbyt/redux");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_redux_1 = require("react-redux");
// import { OnboardingButton as Button } from '../../components/onboarding/button';
var style_1 = require("./style");
var SignIn = function (props) {
    var connected = props.connected, navigation = props.navigation, marketTokenList = props.marketTokenList, privKey = props.privKey, address = props.address, providerUrl = props.providerUrl, settings = props.settings;
    var _a = redux_1.WalletAction(props), connectWithWeb3Auth = _a.connectWithWeb3Auth, getChainId = _a.getChainId, getAccount = _a.getAccount, getTokenList = _a.getTokenList, getMarketList = _a.getMarketList;
    var progress = react_1["default"].useRef(new react_native_1.Animated.Value(0)).current;
    var scale = react_1["default"].useRef(new react_native_1.Animated.Value(0)).current;
    react_1["default"].useEffect(function () {
        react_native_1.Animated.timing(progress, {
            toValue: 1,
            useNativeDriver: true
        }).start();
        react_native_1.Animated.timing(scale, { toValue: 0.4, useNativeDriver: true }).start();
    }, []);
    react_1["default"].useEffect(function () {
        if (connected && marketTokenList.length === 0) {
            getChainId(providerUrl);
            getAccount(privKey);
            getMarketList();
        }
        if (marketTokenList.length > 0) {
            getTokenList(address, settings);
            navigation.navigate('Home');
        }
    }, [connected]);
    return (react_1["default"].createElement(react_native_1.View, { style: style_1.style["default"] },
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.Text, { style: [
                    {
                        color: "" + constants_1.colors.white,
                        fontSize: 50,
                        width: 300,
                        fontFamily: 'SF-Pro-Rounded-Heavy'
                    },
                ] }, "Sign in your wallet")),
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.Animated.Text, { style: [
                    {
                        color: "" + constants_1.colors.gray,
                        fontSize: 25,
                        width: 300,
                        fontFamily: 'SF-Pro-Rounded-Bold'
                    },
                ] }, "welcome to the world of decentralized finance, you just one step closer to total fincancial freedom.")),
        react_1["default"].createElement(react_native_1.View, { style: {
                width: '90%',
                flex: 1,
                padding: 10,
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            } },
            react_1["default"].createElement(components_1.SignInButton, { color: "#F15A24", onPress: function () { return connectWithWeb3Auth(); }, text: "SIGN IN WITH GOOGLE" }))));
};
var mapStateToProps = function (state, props) {
    return {
        connected: state.wallet.connected,
        privKey: state.wallet.privKey,
        address: state.wallet.address,
        providerUrl: state.wallet.providerUrl,
        settings: state.wallet.settings,
        marketTokenList: state.wallet.marketTokenList
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps)(SignIn);
