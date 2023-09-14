import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  default: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    padding: 10,
  },
  tagContainer: {
    padding: 15,
  },
  phoneNumberContainer: {
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 80,
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 10,
  },

  phoneNumberText: {
    fontFamily: 'SF-Pro-Rounded-Regular',
    fontSize: 21,
    color: 'white',
  },
  phoneCode: {
    padding: 10,
  },
});
