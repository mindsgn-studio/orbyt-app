import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image } from 'react-native';

import { style } from './style';

const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
const params = {
  vs_currency: 'eur',
  category: 'ethereum-ecosystem',
  order: 'market_cap_desc',
  per_page: 100,
  page: 1,
  sparkline: true,
  locale: 'en',
  precision: 'full',
};

const Swap = (props: any) => {
  const [marketData, setMarketData] = useState<any>([]);

  const getMarketData = () => {
    const url = new URL(apiUrl);
    //@ts-ignore
    Object.keys(params).forEach((key) =>
      //@ts-ignore
      url.searchParams.append(key, params[key])
    );

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMarketData(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  useEffect(() => {
    getMarketData();
  }, []);

  useEffect(() => {
    console.log(marketData[0]);
  }, [marketData]);

  return (
    <View style={style.default}>
      <FlatList
        data={marketData}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              flex: 1,
              width: '95%',
              height: 50,
              backgroundColor: 'white',
              margin: 10,
              padding: 5,
              borderRadius: 10,
              flexDirection: 'row',
            }}
          >
            <Image
              source={{ uri: `${item.image}` }}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{}}>{item.id}</Text>
            <Text style={{}}>{`R ${item.current_price}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

export { Swap };
