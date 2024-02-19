import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { style } from './style';
import { useWallet } from '../../context';

const TokenContainer = () => {
  const { walletList } = useWallet();

  const getBalance = ({address, type, network}:{address: string, type?: string, network: string}) => {
    const url = `https://test-insight.bitpay.com/api/addr/${address}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        return "0.00"
      })
      .catch(error => {
        return "0.00"
      });
  }

  return (
    <View style={style.default}>
      <Text style={style.title}>Tokens</Text>
      <View>
        <FlatList
          data={walletList}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => 
            <TouchableOpacity style={style.token}>
              <View style={style.tokenDetails}>
                <View style={style.tokenDetailsImage}/>
                <View>
                  <Text style={style.tokenTitle}>{(item.type).toUpperCase()}</Text>
                </View>
              </View>

              <View style={style.tokenBalance}>
                <Text style={style.tokenBalanceFiat}>{`R 0.00`}</Text>
                <Text style={style.tokenBalanceCrypto}>{`0 BTC`}</Text>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
};

export { TokenContainer };
