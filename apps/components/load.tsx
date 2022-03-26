import React from 'react';
import { Text, View, } from 'react-native';
import { container } from '../style/container';
import { text } from '../style/text';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { isNew } from '../hooks/authHooks';
//import { getAuthentication } from '../redux/actions';
//import { isNewUser } from '../redux/actions/auth';

const Load = ({ navigation } : { navigation: any }) => {
  const { loading } = useSelector((state: RootStateOrAny) => state.authReducer ); 
  //const dispatch = useDispatch();
  //const getAuthState = async() => dispatch(getAuthentication());
  //const getIsNewUser = async() => dispatch(isNewUser());
  
  React.useEffect(() => {
    isNew(navigation);
  },[]);

  return (
    <View
        style={container.default}>
        <Text
            style={text.logo}>
            ORBYT
        </Text>
    </View>
  );
};

export default Load;
