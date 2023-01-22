import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ShareCard } from './shareCard';

export const ReceiveCard = ({ show: display }: { show: boolean }) => {
  const [show, setShow] = React.useState(display);
  const cardY: any = React.useRef(new Animated.Value(700)).current;

  const close = () => {
    Animated.timing(cardY, {
      toValue: 700,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    if (show) {
      Animated.timing(cardY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [show]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: '100%',
          backgroundColor: 'black',
          height: '80%',
          bottom: '0%',
          padding: 10,
        },
        {
          transform: [
            {
              translateY: cardY,
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          close();
        }}
      >
        <Icon color="white" name="close" size={40} />
      </TouchableOpacity>
      <View
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            borderWidth: 4,
            borderRadius: 10,
            borderColor: 'white',
            margin: 50,
          },
        ]}
      />
      <View
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
          },
        ]}
      >
        <ShareCard title="Whatsapp" icon="wallet" link="" />
        <ShareCard title="Email" icon="wallet" link="" />
        <ShareCard title="Twitter" icon="wallet" link="" />
        <ShareCard title="FaceBook" icon="wallet" link="" />
      </View>
    </Animated.View>
  );
};
