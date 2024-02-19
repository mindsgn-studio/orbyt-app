import { StyleSheet } from 'react-native';
import { colors, fontSize } from '../../constants'

export const style = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: colors.black,
    width: '100%',
    borderWidth: 4,
  },
  title: {
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: fontSize.medium,
    color: colors.white,
  },
  transactionCardList: {
    flex: 1,
  },
  token: {
    flex: 1,
    width: '100%',
    height: 100,
    color: colors.white,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginVertical: 10,
  },
  tokenDetails:{
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  tokenDetailsImage:{
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    margin: 5,
  },
  tokenTitle: {
    color: 'white',
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: fontSize.small,
  },
  tokenBalanceFiat: {
    color: 'white',
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: fontSize.small,
  },
  tokenBalanceCrypto: {
    color: 'gray',
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: fontSize.extraSmall,
    marginTop: -10,
  },
});
