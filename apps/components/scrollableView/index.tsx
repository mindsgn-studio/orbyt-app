import React from 'react';
import { ScrollView, View, Image, Animated, Text } from 'react-native';

export const ScrollableView = ({data, title, image, cardType }:{data: any, title: any, image: any, cardType: any}) => {
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}>

      <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
       <Text
        style={{
          color: 'white'
        }}>{title}</Text>
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 200,
          backgroundColor: 'black',
          opacity: scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),
        }}
      />
     {
      (cardType ==="markets") ?
        <>
        </>
      :
      (cardType ==="nft") ?
        <>
        </>
      : 
      null
     }
    </ScrollView>
  );
}