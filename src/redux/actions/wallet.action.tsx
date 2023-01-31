//@ts-ignore
import { COINGECKO_API, CLIENT_ID } from '@env';
import {
  CONNECT,
  DISCONNECT,
  ERROR,
  GET_COINGECKO,
  GET_CHAIN_ID,
  GET_ADDRESS,
  GET_TOKEN_LIST,
  SWITCH_NETWORK,
  //@ts-ignore
} from '@orbyt/constants';
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from '@web3auth/react-native-sdk';
import { Network, Alchemy } from 'alchemy-sdk';
import '@ethersproject/shims';
//@ts-ignore
import { Buffer } from 'buffer';
import { Contract, ethers } from 'ethers';
import React from 'react';

global.Buffer = global.Buffer || Buffer;

const scheme = 'orbyt';
const resolvedRedirectUrl = `${scheme}://openlogin`;

export const WalletAction = (props: any) => {
  // const [alchemy, setAlchemy] = React.useState<any>(new Alchemy(settings));
  //const [providerUrl, setProviderUrl] = React.useState<string>(
  //  'https://rpc.ankr.com/polygon'
  //);
  //sign in with wallet
  const connectWithWeb3Auth = React.useCallback(async () => {
    try {
      const response = await new Web3Auth(WebBrowser, {
        clientId: `${CLIENT_ID}`,
        network: OPENLOGIN_NETWORK.TESTNET,
      });

      const info = await response.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
      });

      props.dispatch({
        type: CONNECT,
        auth: response,
        connected: true,
        ed25519PrivKey: info.ed25519PrivKey,
        privKey: info.privKey,
        sessionId: info.sessionId,
        user: info.userInfo,
      });
    } catch (error: any) {
      props.dispatch({
        type: ERROR,
        error,
      });
    }
  }, []);

  //sign in without wallet
  const testConnection = React.useCallback(async (address: string) => {
    try {
      props.dispatch({
        type: CONNECT,
        auth: null,
        connected: true,
        ed25519PrivKey: null,
        privKey: null,
        sessionId: null,
        user: {
          address,
        },
      });
    } catch (error) {
      props.dispatch({
        type: ERROR,
        error,
      });
    }
  }, []);

  //disconnect wallet
  const disconnectWallet = React.useCallback(async (auth: any) => {
    // console.log('response: ', auth)
    try {
      //@ts-ignore
      const response = await auth.logout();

      props.dispatch({
        type: DISCONNECT,
        connected: false,
        auth: null,
        ed25519PrivKey: null,
        privKey: null,
        sessionId: null,
        user: null,
      });
    } catch (error: any) {
      props.dispatch({
        type: ERROR,
        error,
      });
    }
  }, []);

  //remove error
  const removeError = React.useCallback(async () => {
    props.dispatch({
      type: ERROR,
      error: false,
    });
  }, []);

  //get market data
  const getMarketData = React.useCallback(async () => {
    const response = await fetch(
      `${COINGECKO_API}/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
      {
        method: 'GET',
      }
    )
      .then((success) => {
        success.json().then((data) => {
          props.dispatch({
            type: GET_COINGECKO,
            markets: data,
          });
        });
      })
      .catch((error) => {
        props.dispatch({
          type: ERROR,
          error,
        });
      });
  }, []);

  const getChainId = React.useCallback(async (providerUrl: string) => {
    try {
      const ethersProvider = ethers.getDefaultProvider(providerUrl);
      const networkDetails = await ethersProvider.getNetwork();
      props.dispatch({
        type: GET_CHAIN_ID,
        networkName: networkDetails.name,
        networkID: networkDetails.chainId,
        ens: networkDetails.ensAddress,
      });
    } catch (error) {
      props.dispatch({
        type: ERROR,
        error,
      });
    }
  }, []);

  const getAccount = React.useCallback(async (key: string) => {
    try {
      const wallet = new ethers.Wallet(key);
      const address = await wallet.address;
      props.dispatch({
        type: GET_ADDRESS,
        address,
      });
    } catch (error) {
      props.dispatch({
        type: ERROR,
        error,
      });
    }
  }, []);

  const sendTransaction = React.useCallback(
    async (
      key: string,
      toAddress: string,
      amount: string,
      providerUrl: string
    ) => {
      try {
        const ethersProvider = ethers.getDefaultProvider(providerUrl);
        const wallet = new ethers.Wallet(key, ethersProvider);

        // const destination = '0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56';

        // Convert 1 ether to wei
        const amount = ethers.utils.parseEther('0.001');

        // Submit transaction to the blockchain
        const tx = await wallet.sendTransaction({
          to: toAddress,
          value: amount,
          maxPriorityFeePerGas: '5000000000', // Max priority fee per gas
          maxFeePerGas: '6000000000000', // Max fee per gas
        });

        return tx;
      } catch (error) {
        props.dispatch({
          type: ERROR,
          error,
        });
      }
    },
    []
  );

  const signMessage = React.useCallback(
    async (key: string, providerUrl: string) => {
      try {
        const ethersProvider = ethers.getDefaultProvider(providerUrl);
        const wallet = new ethers.Wallet(key, ethersProvider);

        const originalMessage = 'YOUR_MESSAGE';

        // Sign the message
        const signedMessage = await wallet.signMessage(originalMessage);

        return signedMessage;
      } catch (error) {
        props.dispatch({
          type: ERROR,
          error,
        });
      }
    },
    []
  );

  const getTokenList = React.useCallback(
    async (address: string, settings: any) => {
      try {
        const alchemy = await new Alchemy(settings);
        const balances = await alchemy.core.getTokenBalances(address);

        //const nonZeroBalances = balances.tokenBalances.filter((token: any) => {
        //  return (
        //    token.tokenBalance !==
        //    '0x0000000000000000000000000000000000000000000000000000000000000000'
        //  );
        //});

        const array = [];
        // Loop through all tokens with non-zero balance
        for await (const token of balances) {
          // Get balance of token
          let balance = token.tokenBalance;

          // Get metadata of token
          const metadata = await alchemy.core.getTokenMetadata(
            token.contractAddress
          );

          // Compute token balance in human-readable format
          balance = balance / Math.pow(10, metadata.decimals);
          // console.log(balance);
          // balance = balance.toFixed(2);

          array.push({
            name: `${metadata.name}`,
            balance: `${balance}`,
            symbol: `${metadata.symbol}`,
            contactAddress: token.contractAddress,
          });
        }

        props.dispatch({
          type: GET_TOKEN_LIST,
          tokenList: array,
        });
      } catch (error) {
        console.log(error);
        props.dispatch({
          type: ERROR,
          error,
        });
      }
    },
    []
  );

  const switchToNetwork = React.useCallback((network: any) => {
    try {
      props.dispatch({
        type: SWITCH_NETWORK,
        settings: {
          apiKey: network.keys,
          network: network.network,
        },
        providerUrl: network.url,
      });
    } catch (error: any) {
      props.dispatch({
        type: ERROR,
        error,
      });
    }
  }, []);

  return {
    connectWithWeb3Auth,
    disconnectWallet,
    removeError,
    getMarketData,
    testConnection,
    getChainId,
    sendTransaction,
    signMessage,
    getAccount,
    getTokenList,
    switchToNetwork,
  };
};
