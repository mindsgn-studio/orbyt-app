import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as Keychain from 'react-native-keychain';

const WalletContext = createContext<any>(undefined);

function useWallet(): any {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const WalletProvider = (props: { children: ReactNode }): ReactElement => {
  const [auth] = useState(null);

  const unlock = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.username
        );
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };

  const createNewUnlock = () => {};

  useEffect(() => {
    unlock();
  }, []);

  return (
    <WalletContext.Provider
      {...props}
      value={{
        auth,
        unlock,
        createNewUnlock,
      }}
    />
  );
};

export { WalletProvider, useWallet };
