import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import * as Keychain from 'react-native-keychain';

interface AuthContext {
  auth: boolean;
}

const AuthContext = createContext<AuthContext>({
  auth: false,
});

function useAuth(): any {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
  const [auth] = useState(false);

  const getAuth = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      {...props}
      value={{
        auth,
      }}
    />
  );
};

export { AuthProvider, useAuth };
