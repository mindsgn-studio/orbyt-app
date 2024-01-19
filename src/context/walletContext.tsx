import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from 'react';

const WalletContext = createContext<any>(undefined);

function useWallet(): any {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const WalletProvider = (props: { children: ReactNode }): ReactElement => {
  return <WalletContext.Provider {...props} value={{}} />;
};

export { WalletProvider, useWallet };
