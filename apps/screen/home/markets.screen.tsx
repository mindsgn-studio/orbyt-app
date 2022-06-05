import React from 'react';
import { View, Text, } from 'react-native';
import { connect } from 'react-redux';

const Markets = (props: any) => {
    const { markets } = props
    return (
      <View
        style={{
          flex:1
        }}>
          {
            markets ?
            <View
              style={{
                flex:1
              }}>
                <Text>Hello</Text>
            </View> 
            :
            <View>
            </View>
          }
      </View>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return { market: state.market };
}

export default connect(mapStateToProps)(Markets);
