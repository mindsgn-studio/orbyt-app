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

const WalletContext = createContext<any>(undefined);

function useWallet(): any {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within an WalletProvider');
  }
  return context;
}

const WalletProvider = (props: { children: ReactNode }): ReactElement => {
  return <WalletContext.Provider {...props} value={{}} />;
};

export { WalletProvider, useWallet };
