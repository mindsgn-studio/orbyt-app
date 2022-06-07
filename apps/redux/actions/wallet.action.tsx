import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React from 'react'
import { CONNECT, ERROR } from '../../constants';
// import {COINGECKO_API} from "@env";
import { connect } from 'react-redux';

export const WalletAction = (props: any) => {

    const connector = useWalletConnect();

    const connectWallet = React.useCallback(async () => {
        try{
            connector.connect().then((success: any) => {
                console.log(success)
                props.dispatch({
                    type: CONNECT,
                    connected: true,
                    address: success.accounts[0],
                    chainId: success.chainId,
                    peerId: success.peerId,
                    peerMeta: success.peerMeta,
                });
            }).catch((error) => {
                console.log(error)
                props.dispatch({
                    type: ERROR,
                    connected: false,
                });
            });
        }catch(error: any){
            props.dispatch({
                type: ERROR,
                error: true,
            });
        }
    },[]);

    const disconnectWallet = React.useCallback(async () => {
        try{
            connector.killSession().then((success: any) => {
                props.dispatch({
                    type: CONNECT,
                    connected: false,
                    address: "",
                    chainId: null,
                    peerId: null,
                    peerMeta: null
                });
            }).catch((error) => {
                props.dispatch({
                    type: ERROR,
                    error: true,
                });
            });
        }catch(error: any){
            props.dispatch({
                type: ERROR,
                error: true,
            });
        }
    },[]);

    const removeError = () => {
        props.dispatch({
            type: ERROR,
            error: false,
        });
    };

    const getMarketData = React.useCallback(async() => {
        /*console.log("data")
        return fetch(`${COINGECKO_API}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
            {method: 'POST'}
        )
        .then((success) => {
            console.log('error: ', success)
        }).catch(error => { 
            console.log('error: ', error)
        });*/
    },[])

    React.useEffect(() => {
        //console.log(connector.connected)
        //if(connector.connected){
        //    getMarketData();
        //}
    })

    return {
        connectWallet,
        disconnectWallet,
        removeError,
        getMarketData
    }
}
  
  export default WalletAction