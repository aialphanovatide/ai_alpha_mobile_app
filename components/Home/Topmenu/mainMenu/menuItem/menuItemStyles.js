import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  button: {
    minWidth: 60,
    minHeight: 60,
    borderRadius: 30,
    // backgroundColor: '#B8BBBC',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    // shadowColor: '#2c3e50',
    // shadowOffset: { 
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 3,
    overflow: 'hidden',
  },
  buttonText: {
    maxWidth: 60,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5F6466',
    textTransform: 'capitalize',
  },
  disabledButton: {
    color: 'gray',
    backgroundColor: '#adb5bd',
  },
  imageIcon: {
    flex: 1,
  },
});

export default styles;
