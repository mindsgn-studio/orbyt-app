import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React from 'react'
import { CONNECT, ERROR } from '../../constants';
import {COINGECKO_API} from "@env";

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

    React.useEffect(() => {
        console.log(COINGECKO_API)
    },[])

    return {
        connectWallet,
        disconnectWallet,
        removeError
    }
}
  
export default WalletAction;