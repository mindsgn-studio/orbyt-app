import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { style } from './style';
import { useWallet } from '../../context';
import { numberFormatter } from "../../hooks"

const TokenContainer = ({ navigation }: { navigation: any }) => {
  const { walletList, socket, setTotalBalance } = useWallet();
  const [ isReady, setIsReady ] = useState(false);
  const [ balanceData, setBalanceData ] = useState<any>([]);
  const [ balance, setBalance ] = useState<any>({
    zar: 0,
    btc: 0
  });

  useEffect(() => {
    const getBalance = async () => {
      setIsReady(true)
    };

    getBalance();

    return () => {
    };
  }, []);

  useEffect(() => {
    walletList.map((wallet: any) => {
      socket.emit("get-wallet-data", {
        address: wallet.address,
        socketID: socket.id
      })

      socket.once("wallet-data", (data: any, error: any) => {
        const { ZAR, BTC } = data
        let balanceList: any = [];
        
        setBalance(
          {
            ...balance, 
            zar: ZAR[ZAR.length - 1].balance,
            btc: BTC[BTC.length - 1].balance
          }
        )

        ZAR.map((item: any) => {
          balanceList.push(item.balance);
        })

        setBalanceData(balanceList);
        setTotalBalance(ZAR[ZAR.length - 1].balance,)
      })
    })

    return () => {
    };
  }, [walletList]);

  return (
    <View style={style.default}>
      <Text style={style.title}>My Crypto</Text>
      <View>
        <FlatList
          data={walletList}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <>
              {
                isReady ?
                  <TouchableOpacity style={style.token}
                    onPress={() => {
                      navigation.navigate("Token", {
                        balanceData,
                        balance: balance.zar,
                        ...item,
                      });
                    }}>
                    <View style={style.tokenDetails}>
                      <Image
                        style={style.tokenDetailsImage}
                        source={require('../../assets/bitcoin.png')} />
                      <View>
                        <Text style={style.tokenTitle}>{(item.type).toUpperCase()}</Text>
                      </View>
                    </View>

                    <View>
                      <Text style={style.tokenBalanceFiat}>{`R ${numberFormatter(balance.zar, 1)}`}</Text>
                      <Text style={style.tokenBalanceCrypto}>{`${balance.btc} BTC`}</Text>
                    </View>
                  </TouchableOpacity>
                  :
                  null
              }
            </>
          )}
        />
      </View>
    </View>
  );
};

export { TokenContainer };