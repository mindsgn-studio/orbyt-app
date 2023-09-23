import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image } from 'react-native';

import { style } from './style';
import { colors } from '../../constants';

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

const Tokens = (props: any) => {
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

  const isNegative = (price: number) => {
    if (price < 0) return true;
    return false;
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
        renderItem={({ item }) => {
          const { name, image, current_price, price_change_24h } = item;

          console.log(price_change_24h);

          return (
            <View key={item.id} style={style.tokenCard}>
              <Image source={{ uri: `${image}` }} style={style.cardImage} />
              <Text style={style.cardName}>{name}</Text>
              {isNegative(parseFloat(price_change_24h)) ? (
                <Text
                  style={style.tokenPriceNegative}
                >{`R ${current_price}`}</Text>
              ) : (
                <Text
                  style={style.tokenPricePositive}
                >{`R ${current_price}`}</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export { Tokens };
