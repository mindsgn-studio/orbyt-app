
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { container, text, button } from '../style';
import { setIsLoading, createNewWallet } from '../redux/actions';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';


const Create = ({ navigation } : { navigation: any }) => {
  const { loading } = useSelector((state: RootStateOrAny) => state.authReducer ); 
  const dispatch = useDispatch();
  
  const newWallet = async() => {
    await dispatch(setIsLoading(!loading));
    //await dispatch(createNewWallet());
    //await dispatch(setIsLoading(!loading));
  };

  return (
    <View style={container.create}>
      <View>
        <Text style={text.logo}>
          ORBYT
        </Text>
      </View>
      <View>
        <Text style={text.textPrimary}>
          Hello you are one step closer to to total decentralized freedom.
        </Text>
      </View>
      <View style={{
        flex:1
      }}> 
        
      </View>
      <View>
        {
          loading?
          <></>
          :
          <TouchableOpacity
          style={button.buttonPrimary}
          onPress={() => newWallet()}
          disabled={loading}>
          <Text style={text.textSecondary}>
            Create Wallet
          </Text>
        </TouchableOpacity>
        }

      </View>
    </View>
  );
};

export default Create;
