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

type WalletContextType = {
  address: string | null;
  transactions: any[] | null;
  setMagic: any | null;
  exhangeRate: number;
  balance: number;
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
  const [balance, setBalance] = useState<number>(0);
  const [address, setAddress] = useState<string | null>(null);
  const [transactions, setTransaction] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);
  const [exhangeRate, setExchangeRate] = useState(0);

  const getMainToken = (chainId: number) => {
    switch (chainId) {
      case 1:
        return {
          name: 'Ethereum',
          symbol: 'Eth',
          ids: 'ethereum',
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

  const getAllTransactions = async (address: string) => {
    const etherscanEndpoint = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=9QCTW7Y2RUMTXJ3F44UVGQV1WGR5X1NXJJ`;
    try {
      const response = await fetch(etherscanEndpoint);

      if (!response.ok) {
        throw new Error(`Etherscan API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === '1') {
        return data.result;
      } else {
        console.error('Etherscan API error:', data.message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  };

  const getNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

    const signer = provider.getSigner();

    const address = await signer.getAddress();

    const balance = ethers.utils.formatEther(
      await provider.getBalance('0xc70ae19b5feaa5c19f576e621d2bad9771864fe2')
    );

    const chainId: number = await signer.getChainId();

    const network = getMainToken(chainId);

    if (network) {
      const exchangeRateResponse = await fetchEthToZarExchangeRate();

      const transactionsData = await getAllTransactions(
        '0xc70ae19b5feaa5c19f576e621d2bad9771864fe2'
      );

      setExchangeRate(exchangeRateResponse);
      setBalance(balance * exchangeRateResponse);
      setTransaction(transactionsData);
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

  const fetchEthToZarExchangeRate = async () => {
    const coingeckoEndpoint = 'https://api.coingecko.com/api/v3/simple/price';

    // Parameters for the API request
    const queryParams = new URLSearchParams({
      ids: 'ethereum',
      vs_currencies: 'zar',
    });

    try {
      const response = await fetch(`${coingeckoEndpoint}?${queryParams}`);

      if (response.ok) {
        const data = await response.json();

        if (data?.ethereum?.zar) {
          return data.ethereum.zar;
        } else {
          console.error(
            'Error: CoinGecko API response does not contain exchange rate'
          );
        }
      } else {
        console.error(
          'Error fetching exchange rate from CoinGecko:',
          response.statusText
        );
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
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
      value={{ address, transactions, setMagic, exhangeRate, balance }}
    />
  );
};

export { WalletProvider, useWallet };
