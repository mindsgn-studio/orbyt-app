import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { style } from './style';
import Animated from 'react-native-reanimated';
import QRCode from 'react-native-qrcode-svg';


const RecieveBottomSheet = ({ bottomSheetStyle, closeBottomSheet, backgroundStyle } : { bottomSheetStyle: any, closeBottomSheet: any, backgroundStyle: any }) => {
  return (
    <Animated.View style={[style.default, backgroundStyle]}>
      <Animated.View
        style={[style.bottomSheet, bottomSheetStyle]}>
          <View>
            <Text style={style.title}>{"Recieve"}</Text>
          </View>
          <View
            style={style.qrCodeContainer}>
            <QRCode
              value="http://awesome.link.qr"
            />
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

export { RecieveBottomSheet };
