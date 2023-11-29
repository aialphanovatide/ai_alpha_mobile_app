import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FC5404',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    shadowColor: '#2c3e50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonTextDisable: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ecf0f1',
    position: 'relative',
    bottom: 6, 
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ecf0f1',
  },
  disabledButton: {
    color: 'gray',
    backgroundColor: '#adb5bd',
  },
  iconContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    zIndex: 1,
    margin: 0,
    padding: 0,
  },
});


  
  
  
export default styles;