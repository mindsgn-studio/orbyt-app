import { network } from '@orbyt/constants';
import { AnimationAction } from '@orbyt/redux';
import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

const SwitchNetworkCard = (prop: any) => {
  const { switchNetwork } = prop;
  const { updateSwitchNetwork } = AnimationAction(prop);
  const cardOpacity = React.useRef(new Animated.Value(0)).current;
  const cardY = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (switchNetwork) {
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(cardY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(cardY, {
        toValue: 700,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [switchNetwork]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: '100%',
          backgroundColor: 'black',
          height: '80%',
          padding: 10,
          zIndex: 1,
        },
        {
          opacity: cardOpacity,
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
          updateSwitchNetwork(!switchNetwork);
        }}
      >
        <Icon color="white" name="close" size={40} />
      </TouchableOpacity>
      <View
        style={{
          padding: 10,
        }}
      >
        {network.map((item) => {
          return (
            <TouchableOpacity
              style={{
                margin: 10,
              }}
            >
              <Text
                style={{
                  color: 'white',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    switchNetwork: state.animation.switchNetwork,
  };
};

export default connect(mapStateToProps)(SwitchNetworkCard);
