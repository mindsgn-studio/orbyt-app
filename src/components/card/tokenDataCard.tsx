import React from 'react';
import { View, Animated, Text } from 'react-native';

import { connect } from 'react-redux';

const TokenDataCard = (props: any) => {
  const { tokenData } = props;
  const cardY = React.useRef(new Animated.Value(700)).current;

  React.useEffect(() => {
    if (tokenData) {
      Animated.timing(cardY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(cardY, {
        toValue: 700,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [tokenData]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: '100%',
          backgroundColor: 'black',
          height: '100%',
          bottom: '0%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
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
      <View>
        <Text>Token</Text>
      </View>
    </Animated.View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    tokenData: state.animation.tokenData,
  };
};

export default connect(mapStateToProps)(TokenDataCard);
