import { ALCHEMY_SDK_MAINNET } from '@env';
import {
  CONNECT,
  DISCONNECT,
  ERROR,
  GET_COINGECKO,
  GET_STATE,
  GET_CHAIN_ID,
  GET_ADDRESS,
  GET_TOKEN_LIST,
  SWITCH_NETWORK,
  //@ts-ignore
} from '@orbyt/constants';
import { Network } from 'alchemy-sdk';

import { walletState } from '../../interface';

const initialState: walletState = {
  connected: false,
  ed25519PrivKey: null,
  privKey: null,
  sessionId: null,
  user: null,
  error: false,
  auth: null,
  markets: [],
  address: null,
  networkName: null,
  networkID: null,
  ens: null,
  providerUrl: 'https://rpc.ankr.com/eth',
  tokenList: [],
  currency: 'zar',
  currencySymbol: 'R',
  settings: {
    apiKey: ALCHEMY_SDK_MAINNET,
    network: Network.ETH_MAINNET,
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CONNECT:
      return {
        ...state,
        connected: action.connected,
        ed25519PrivKey: action.ed25519PrivKey,
        privKey: action.privKey,
        sessionId: action.sessionId,
        user: action.user,
        error: action.error,
        auth: action.auth,
      };
    case DISCONNECT:
      return {
        ...state,
        connected: action.connected,
      };
    case GET_STATE:
      return {
        ...state,
      };
    case GET_COINGECKO:
      return {
        ...state,
        markets: action.markets,
      };
    case GET_CHAIN_ID:
      return {
        ...state,
        networkName: action.networkName,
        networkID: action.networkID,
      };
    case GET_ADDRESS:
      return {
        ...state,
        address: action.address,
      };
    case GET_TOKEN_LIST:
      return {
        ...state,
        tokenList: action.tokenList,
      };
    case SWITCH_NETWORK:
      return {
        ...state,
        settings: action.settings,
        providerUrl: action.providerUrl,
      };
    case ERROR:
      return {
        ...state,
        action,
      };
    default:
      return state;
  }
};
