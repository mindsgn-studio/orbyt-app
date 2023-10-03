import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

export const style = StyleSheet.create({
  default: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'black',
  },
  summary: {
    flex: 1,
    padding: 30,
  },
  chart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: -50,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  text: {
    color: colors.white,
  },
});
