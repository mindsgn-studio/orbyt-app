import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useRef
} from 'react';
import socketIOClient from 'socket.io-client';
import { APP_API, APP_NETWORK, APP_SOCKET_SERVER } from '@env';
import { useRealm } from './realmContext';
import {BSON} from 'realm';

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'],
};

interface WalletContext {
  
}

const WalletContext = createContext<any>({
  balance: 0,
  exchangeRate: 1,
  walletList: [],
  settings: {},
  createNewBitcoinWallet: () => {},
  allExchangeRates: () => {},
  walletHasError: false,
  walletHasSuccess: false,
  toast: {type: "", message: ""},
  socket: null,
});

const useWallet: any = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within an WalletProvider');
  }
  return context;
}

const WalletProvider = (props: { children: ReactNode }): ReactElement => {
  const realm = useRealm();
  const [exchangeRate] = useState(1);
  const [settings, setSettings] = useState<any>(null);
  const [balance] = useState(0);
  const [toast, setToast] = useState({
    type: "", 
    message: ""
  });
  const [walletHasError, setWalletHasError] = useState(false);
  const [walletHasSuccess, setWalletHasSuccess] = useState(false);
  const [walletList, setWalletList] = useState<any []>([]);
  const socket = useRef(socketIOClient(APP_SOCKET_SERVER, connectionConfig));

  const saveWallet = async (data: any) => {
    try {
      realm.write(() => {
        realm.create('Wallet', {
          _id: new BSON.ObjectId(),
          createdAt: new Date(),
          ...data
        });
      });
      setToast({type: "Success", message: "new wallet created"})
      setWalletHasSuccess(true);
      setTimeout(()=> {
        setWalletHasSuccess(false)
      }, 2000);
    } catch (error) {
      setToast({type: "Error", message: "Failed to create wallet. please try again"})
      setWalletHasError(true);
      setTimeout(()=> {
        setWalletHasError(false)
      }, 2000);
    }
  };

  const createNewBitcoinWallet = async (network: string) => {
    try{
      fetch(`${APP_API}bitcoin?network=${network}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(async(data) => {
        await saveWallet(data);
      })
      .catch(error => { 
        setWalletHasError(true);
        setTimeout(()=> {
          setWalletHasError(false)
        }, 2000);
      });
    }catch(error: any){
      setWalletHasError(true);
      setTimeout(()=> {
        setWalletHasError(false)
      }, 2000);
    }
  };

  const getExchangeRates = async () => {
    await fetch('https://theforexapi.com/api/latest?base=USD')
      .then(async (response) => {
        return await response.json();
      })
      .then(async (response) => {
        // setRates(response);
      })
      .catch((error) => {
        return null;
      });

    return null;
  };

  const getSettings = () => {
    const settingsObject: any = realm.objects('Settings')
    
    if(settingsObject.length === 0){
      realm.write(() => {
        realm.create('Settings', {
          _id: new BSON.ObjectId(),
          currency: "ZAR",
          currencySymbol: "R",
          createdAt: new Date(),
        });
      });

      getSettings();
    }else{
      setSettings(settingsObject[0])
    }
  }

  useEffect(()=>{
    const walletObject: any = realm.objects('Wallet')
    setWalletList(walletObject);

    if(walletObject.length == 0){
      createNewBitcoinWallet(APP_NETWORK)
    }

    const listener = () => {
      
    };

    walletObject?.addListener(listener);

    return () => {
      walletObject?.removeListener(listener);
    };
  },[realm])


  useEffect(()=> {
    if(!settings){
      getSettings()
    } 
  },[])

  useEffect(()=>{
    getExchangeRates();
  },[])

  useEffect(() => {
    socket.current.on('connect', () => {
      setToast({type: "Success", message: "socket connected"})
      setWalletHasSuccess(true);
      setTimeout(()=> {
        setWalletHasSuccess(false)
      }, 2000);
    });

    socket.current.on('disconnect', msg => {
      setToast({type: "Error", message: msg})
      socket.current = socketIOClient(APP_SOCKET_SERVER, connectionConfig);
      setWalletHasError(true);
      setTimeout(()=> {
        setWalletHasError(false)
      }, 2000);
    });

    return () => {
      if (socket && socket.current) {
        socket?.current?.removeAllListeners();
        socket?.current?.close();
      }
    };
  }, [APP_SOCKET_SERVER]);

  return (
    <WalletContext.Provider
      {...props}
      value={{
        socket: socket.current,
        balance,
        exchangeRate,
        createNewBitcoinWallet,
        walletHasError,
        walletHasSuccess,
        walletList,
        getExchangeRates,
        settings,
        toast
      }}
    />
  );
};

export { WalletProvider, useWallet };
