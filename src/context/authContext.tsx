import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';

interface AuthContext {
  auth: boolean;
  ready: boolean;
  isNew: boolean;
  authHasError: boolean;
  unlock: (passcode: string) => boolean;
  setAuthenticationPasscode: (username: string, password: string) => void;
}

const AuthContext = createContext<AuthContext>({
  auth: false,
  ready: false,
  isNew: false,
  authHasError: false,
  unlock: (passcode: string) => false,
  setAuthenticationPasscode: (username: string, password: string) => {},
});

function useAuth(): any {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
  const [auth, setAuth] = useState(false);
  const [ready, setReady] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [authHasError, setHasError] = useState(false);

  const getAuth = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setReady(true);
      } else {
        setIsNew(true);
        setReady(true);
      }
    } catch (error) {
      setHasError(true);
    }
  };

  const unlock = async (passcode: string) => {
    try {
      const credentials: any = await Keychain.getGenericPassword();
      const { password } = credentials;

      if (password === passcode) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const setAuthenticationPasscode = async (
    username: string,
    password: string
  ) => {
    try {
      await Keychain.setGenericPassword(username, password);
      setAuth(true);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <AuthContext.Provider
      {...props}
      value={{
        auth,
        ready,
        isNew,
        authHasError,
        unlock,
        setAuthenticationPasscode,
      }}
    />
  );
};

export { AuthProvider, useAuth };
