import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useWallet } from '../../context';
import { style } from './style';
import { ethers } from 'ethers';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const TransactionCard = ({
  icon,
  type,
  date,
  amount,
}: {
  icon: string;
  type: string;
  date: string;
  amount: string;
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
    const unixTimestamp = parseInt(date);
    const time = timeAgo.format(new Date(unixTimestamp * 1000));
    setTime(time);
  };

  useEffect(() => {
    convertToFiat();
    convertTimestamp();
  }, [amount]);

  return (
    <TouchableOpacity style={style.default}>
      <View style={style.transactionDetails}>
        <View style={style.icon} />
        <View>
          <Text style={style.type}>{`${type}`}</Text>
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
