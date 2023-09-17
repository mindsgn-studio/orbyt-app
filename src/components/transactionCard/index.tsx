import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useWallet } from '../../context';
import { style } from './style';
import { ethers } from 'ethers';
import TimeAgo from 'javascript-time-ago';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const TransactionCard = ({
  icon,
  type,
  date,
  amount,
  label,
}: {
  icon: string;
  type: string;
  date: number;
  amount: string;
  label: string;
}) => {
  const { exhangeRate } = useWallet();
  const [fiat, setFiat] = useState<any>(0);
  const [time, setTime] = useState<any>(new Date());

  const convertToFiat = () => {
    const weiValue = ethers.BigNumber.from(amount);
    const etherValue = ethers.utils.formatEther(weiValue);
    setFiat((parseFloat(etherValue) * exhangeRate).toFixed(2));
  };

  const convertTimestamp = () => {
    const time = timeAgo.format(new Date(date * 1000));
    setTime(time);
  };

  useEffect(() => {
    convertToFiat();
    convertTimestamp();
  }, [amount]);

  return (
    <TouchableOpacity style={style.default}>
      <View style={style.transactionDetails}>
        <View style={style.icon}>
          {label === 'payment' ? (
            <Icon name="arrow-up-outline" size={40} color={colors.red} />
          ) : (
            <Icon name="arrow-down-outline" size={40} color={colors.green} />
          )}
        </View>
        <View>
          <Text style={style.type}>
            {label === 'payment' ? 'Sent' : 'Recieved'}
          </Text>
          <Text style={style.date}>{`${time}`}</Text>
        </View>
      </View>
      <View>
        <Text style={style.amount}>R {`${fiat}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { TransactionCard };
