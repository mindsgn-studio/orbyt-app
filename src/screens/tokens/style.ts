import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

export const style = StyleSheet.create({
  default: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'black',
  },
  tokenCard: {
    flex: 1,
    width: '95%',
    height: 50,
    backgroundColor: 'white',
    margin: 10,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  cardImage: {
    width: 40,
    height: 40,
  },
  cardName: {
    fontFamily: 'SF-Pro-Rounded-Heavy',
  },
  tokenPriceNegative: {
    color: colors.red,
    fontFamily: 'SF-Pro-Rounded-Regular',
  },
  tokenPricePositive: {
    color: colors.green,
    fontFamily: 'SF-Pro-Rounded-Regular',
  },
});
