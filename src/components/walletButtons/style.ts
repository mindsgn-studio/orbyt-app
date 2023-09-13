import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  default: {
    display: 'flex',
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'row',
  },
  sendButton: {
    flex: 1,
    backgroundColor: 'red',
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  recieveButton: {
    flex: 1,
    backgroundColor: 'green',
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomEndRadius: 10,
  },
  buttonText: {
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: 28,
    color: 'white',
  },
});
