import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, } from 'react-native';
import { container } from '../../../style/container.style';
import Card from '../../../components/card';
import { connect } from 'react-redux';
import { colors } from '../../../constants';
import RPC from './../../../lib/rpc';
import WalletAction from '../../../redux/actions/wallet.action';

const Wallet = (props: any) => {
    const { privKey } = props;

    const getChainId = async () => {
        const networkDetails = await RPC.getChainId();
        // console.log(networkDetails)
    };
      
    const sendTransaction = async () => {
        const tx = await RPC.sendTransaction(privKey);
        // console.log(tx)
    };
      
    const signMessage = async () => {
        const message = await RPC.signMessage(privKey);
        // console.log(message)
    };

    React.useEffect( () => {
        if(privKey){
        //    getAccounts()
        }
    }, [privKey])

    return (
        <ScrollView 
            style={container.home}>
            <Card />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    padding: 10,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent:'space-evenly',
                    marginVertical: 5,
                }}>
                <TouchableOpacity
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems:'center',
                        backgroundColor:`${colors.orange}`,
                        width: '50%',
                        height: 60,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10
                    }}>
                    <Text
                        style={{
                            color: "white",
                            fontFamily: 'SF-Pro-Rounded-Bold',
                            fontSize: 25
                        }}>
                            Send
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems:'center',
                        backgroundColor:`${colors.green}`,
                        width: '50%',
                        height: 60,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10
                    }}>
                    <Text
                        style={{
                            color: "white",
                            fontFamily: 'SF-Pro-Rounded-Bold',
                            fontSize: 25,
                        }}>
                        Receive
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    margin: 10
                }}>
                <Text
                    style={{
                        fontFamily: 'SF-Pro-Rounded-Bold',
                        fontSize: 25,
                        color: colors.orange
                    }}
                >
                    TOKENS
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    margin: 10,
                    minHeight: 250,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:`${colors.gray}`,
                    borderRadius: 10 
                }}
            >
                <Text
                    style={{
                        fontFamily: 'SF-Pro-Rounded-Bold',
                        position: 'absolute',
                    }}
                >
                    NO TOKENS
                </Text>
            </View>
        </ScrollView>
    );
};

const mapStateToProps = (state: any, props: any) => {
    return {
        connected: state.connected,
        privKey: state.privKey,
        error: state.error
    };
};

export default connect(mapStateToProps)(Wallet);