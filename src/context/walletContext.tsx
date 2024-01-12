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
  const unlock = () => {};

  const createNewUnlock = () => {};

  return (
    <WalletContext.Provider
      {...props}
      value={{
        unlock,
        createNewUnlock,
      }}
    />
  );
};

export { WalletProvider, useWallet };
