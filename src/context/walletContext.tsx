import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  DescriptorSecretKey,
  Mnemonic,
  Blockchain,
  Wallet,
  DatabaseConfig,
  Descriptor,
} from 'bdk-rn';
import { WordCount, Network, KeychainKind } from 'bdk-rn/lib/lib/enums';
import { Alert } from 'react-native';
import { useRealm } from './realmContext';

const WalletContext = createContext<any>({
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

  const createNewBitcoinWallet = async () => {};

  return (
    <WalletContext.Provider
      {...props}
      value={{
        createNewBitcoinWallet,
      }}
    />
  );
};

export { WalletProvider, useWallet };
