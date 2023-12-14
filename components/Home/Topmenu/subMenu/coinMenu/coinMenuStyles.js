import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  menu: {
    justifyContent: 'space-between',
    borderRadius: 20,
    width: '96%',
  },
  subMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e5e5e5',
    padding: 10,
    borderRadius: 30
  },
  subMenuButton: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'gray',
    height: 30,
  },
  activeButton: {
    backgroundColor: '#E6007A',
    color: '#fff'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonImage: {
    width: 15, 
    height: 15, 
    marginRight: 8, 
  },
  buttonText: {
    color: 'gray'
  },
  activeButtonText: {
    color: '#fff',
  },
});

export default styles;
