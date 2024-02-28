import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { style } from './style';
import Animated from 'react-native-reanimated';

const SendBottomSheet = (
  {
    address, 
    type, 
    bottomSheetStyle, 
    closeBottomSheet, 
    backgroundStyle 
  } : { 
    address: string, 
    type: string,  
    bottomSheetStyle: any, 
    closeBottomSheet: any, 
    backgroundStyle: any 
  }) => {
  return (
    <Animated.View style={[style.default, backgroundStyle]}>
      <Animated.View
        style={[style.bottomSheet, bottomSheetStyle]}>
          <View>
            <Text style={style.title}>{`Send ${type}`}</Text>
          </View>
      
          <TouchableOpacity
            onPress={()=>{
              closeBottomSheet()
            }}
            style={style.closeButton}>
            <Text style={style.buttonText}>CLOSE</Text>
          </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export { SendBottomSheet };
