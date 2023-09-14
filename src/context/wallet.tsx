import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useAuth } from './auth';
import { ethers } from 'ethers';
import { Alchemy, Network } from 'alchemy-sdk';

/*
const storeData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@orbyt-auth', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@orbyt-auth');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
*/

type WalletContextType = {
  address: string | null;
  transactions: any[] | null;
  setMagic: any | null;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const WalletProvider = (props: { children: ReactNode }): ReactElement => {
  const [provider, setProvider] = useState<any | null>(null);
  const [magic, setMagic] = useState<any | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [transactions, setTransaction] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);

  const getMainToken = (chainId: number) => {
    switch (chainId) {
      case 1:
        return {
          name: 'Ethereum',
          symbol: 'Eth',
          network: 'Ethereum Mainnet',
          mainnet: true,
          layer: 1,
          alchemy: {
            api: '55qEBAztRX87d8qrMzxVZ4tfBEapkIqe',
            https:
              'https://eth-mainnet.g.alchemy.com/v2/55qEBAztRX87d8qrMzxVZ4tfBEapkIqe',
            websocket:
              'wss://eth-mainnet.g.alchemy.com/v2/55qEBAztRX87d8qrMzxVZ4tfBEapkIqe',
          },
        };
      default:
        return null;
    }
  };

  async function getAllTransactions(address: string, settings: any) {
    let config = {
      apiKey: settings.api,
      network: Network.ETH_MAINNET,
    };

    return [];
  }

  const getNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

    const signer = provider.getSigner();

    const address = await signer.getAddress();

    const balance = ethers.utils.formatEther(
      await provider.getBalance('0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5')
    );
    const chainId: number = await signer.getChainId();

    const network = getMainToken(chainId);

    if (network) {
      const transactions = await getAllTransactions(
        '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
        network.alchemy
      );

      setTransaction(transactions);

      setAddress(address);
      setTokens([
        ...tokens,
        {
          ...tokens,
          balance,
        },
      ]);
    }
  };

  useEffect(() => {
    if (magic) {
      getNetwork();
    }
  }, [magic]);

  return (
    <WalletContext.Provider
      {...props}
      value={{ address, transactions, setMagic }}
    />
  );
};

export { WalletProvider, useWallet };
