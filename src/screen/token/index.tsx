import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { LineGraph } from "../../components" 
import { style } from './style';

const Token = () => {

  const data = Array.from({ length: 20 }).map(
    (unused, i) => i + (i + 1) * Math.random()
  )

  return (
    <View style={style.default}>
      <LineGraph 
        data={data}
      />
      <View>
        <Text
        style={{color: "white"}}>Home</Text>
      </View>
    </View>
  );
};

export { Token };