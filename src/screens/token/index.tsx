import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Heading } from '../../components';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '../../constants';

import { style } from './style';

const Token = ({ route, navigation }: { route: any; navigation: any }) => {
  const { item, color = colors.red } = route.params;
  const [token, setTokeData] = useState<any>(null);
  const { sparkline_in_7d } = item;
  const { price } = sparkline_in_7d;

  const getTokenData = async (id: string) => {
    const coingeckoEndpoint = `https://api.coingecko.com/api/v3/coins/${id}`;

    try {
      const response = await fetch(`${coingeckoEndpoint}`);

      if (response.ok) {
        const data = await response.json();

        setTokeData(data);
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
    getTokenData(item.id);
  }, []);

  return (
    <View style={style.default}>
      <Heading
        exit={() => {
          navigation.goBack();
        }}
        title={`${item.name}`}
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
        <View style={style.row}>
          <Text style={style.text}>{token && token.name}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.text}>Rank</Text>
          <Text style={style.text}>{token && token.market_cap_rank}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.text}>{token && token.description['ar']}</Text>
        </View>
      </View>
    </View>
  );
};

export { Token };
