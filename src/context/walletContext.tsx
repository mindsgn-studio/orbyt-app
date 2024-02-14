import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import {Alert} from 'react-native'
import { useRealm } from './realmContext';
import { BIP32Interface, fromSeed as bip32FromSeed } from 'bip32';
import ecc from 'tiny-secp256k1';
import bip39 from 'react-native-bip39';
import bitcoin from 'react-native-bitcoinjs-lib';

const network = bitcoin.networks.testnet;
const path = `m/44'/1'/0'/0`;

const WalletContext = createContext<any>({
  balance: 0,
  exchangeRate: 1,
  createNewBitcoinWallet: () => {},
});

function useWallet(): any {
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


  const createNewBitcoinWallet = async () => {
    try{
      

      let mnemonic = await bip39.generateMnemonic();
      const seedBuffer = await bip39.mnemonicToSeed(mnemonic);
      let root: BIP32Interface = bip32FromSeed(seedBuffer, network);

      let account = root.derivePath(path);
      let node = account.derive(0).derive(0);

      let btcAddress = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: network,
      }).address;

      Alert.alert(`${mnemonic}`)
      
    }catch(error: any){

    }
  };

  return (
    <WalletContext.Provider
      {...props}
      value={{
        balance,
        exchangeRate,
        createNewBitcoinWallet,
      }}
    />
  );
};

export { WalletProvider, useWallet };
