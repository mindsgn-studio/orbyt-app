import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import WalletAction from '../../redux/actions/wallet.action';

const Markets = (props: any) => {
    const { disconnectWallet } = WalletAction(props);
    const { markets } = props;

    React.useEffect(() => {
        disconnectWallet();
    }, []);

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {markets ? (
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text>Hello</Text>
                </View>
            ) : (
                <View></View>
            )}
        </View>
    );
};

const mapStateToProps = (state: any, props: any) => {
    return { markets: state.markets };
};

export default connect(mapStateToProps)(Markets);
