import { Heading } from '@orbyt/components';
import { colors } from '@orbyt/constants';
import { useWallet } from '@orbyt/context';
import { GlobalStyle } from '@orbyt/style';
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { style } from './style';

const Token = ({ route, navigation }: { route: any; navigation: any }) => {
  const { item, color = colors.red } = route.params;
  const [token, setTokeData] = useState<any>(null);
  const { rates: exchangeRate } = useWallet();
  const { rates } = exchangeRate;

  const { sparkline_in_7d, image } = item;
  const { price } = sparkline_in_7d;

  const getTokenData = async (id: string) => {
    const coingeckoEndpoint = `https://api.coingecko.com/api/v3/coins/${id}`;

    try {
      const response = await fetch(`${coingeckoEndpoint}`);

      if (response.ok) {
        const data = await response.json();

        // setTokeData(data);
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
    // getTokenData(item.id);
    console.log(rates.ZAR);
    // console.log(item);
  }, []);

  return (
    <View style={style.default}>
      <Heading
        exit={() => {
          navigation.goBack();
        }}
        title={``}
      />

      <View style={style.chart}>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: [...price],
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={300}
          yAxisLabel="R"
          yAxisInterval={1}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          withInnerLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withShadow={false}
          chartConfig={{
            backgroundColor: colors.red,
            decimalPlaces: 1,
            color: (opacity = 1) => color,
            labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '0',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
          }}
        />
      </View>
      <View style={style.summary}>
        <View style={GlobalStyle.row}>
          <Image source={{ uri: `${image}` }} style={style.image} />
          <View>
            <Text style={style.title}>{item.name}</Text>
            <Text style={style.title}>{`R ${(
              parseFloat(item.current_price) * rates.ZAR
            ).toFixed(2)} `}</Text>
          </View>
        </View>
        <View style={GlobalStyle.column}>
          <Text style={style.subTitle}>{`Circulating Supply`}</Text>
          <Text style={style.title}>{`R ${(
            parseFloat(item.circulating_supply) * rates.ZAR
          ).toFixed(2)}`}</Text>
        </View>
      </View>
    </View>
  );
};

export { Token };
