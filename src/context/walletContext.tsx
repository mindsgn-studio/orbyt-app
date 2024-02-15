import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { APP_API } from '@env';
import {Alert} from 'react-native'
import { useRealm } from './realmContext';
import { BIP32Interface, fromSeed as bip32FromSeed } from 'bip32';
import ecc from 'tiny-secp256k1';
import bip39 from 'react-native-bip39';
import bitcoin from 'react-native-bitcoinjs-lib';
import {BSON} from 'realm';

const network = bitcoin.networks.testnet;
const path = `m/44'/1'/0'/0`;

const WalletContext = createContext<any>({
  balance: 0,
  exchangeRate: 1,
  createNewBitcoinWallet: () => {},
  walletHasError: false
});

const useWallet: any = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within an WalletProvider');
  }
  return context;
}

const WalletProvider = (props: { children: ReactNode }): ReactElement => {
  const realm = useRealm();
  const [exchangeRate] = useState(1);
  const [balance] = useState(0);
  const [walletHasError, setWalletHasError] = useState(false);

  const saveWallet = async (data: any) => {
    try {
      realm.write(() => {
        realm.create('Wallet', {
          _id: new BSON.ObjectId(),
          ...data
        });
      });

      return true
    } catch (error) {
      return false
    }
  };

  const createNewBitcoinWallet = async (network: string) => {
    try{
      fetch(`${APP_API}bitcoin?network=${network}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(async(data) => {
        const response = await saveWallet(data);
        return response;
      })
      .catch(error => { 
        return false
      });
    }catch(error: any){
      return false
    }
  };

  return (
    <WalletContext.Provider
      {...props}
      value={{
        balance,
        exchangeRate,
        createNewBitcoinWallet,
        walletHasError
      }}
    />
  );
};

export { WalletProvider, useWallet };
