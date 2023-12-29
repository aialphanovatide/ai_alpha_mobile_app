import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  menuContainer: {
    alignSelf: 'center',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#C4CADA'
  },
  menuItem: {
    width: '50%',
    height: 20,
    backgroundColor: 'transparent',
    marginHorizontal: 2,
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  menuItemText: {
    textAlign: 'center',
    fontSize: responsiveFontSize * 0.75,
    color: '#F7F7F7',
    fontWeight: 'bold',
  },
  activeItem: {
    backgroundColor: '#F6F7FB',
    borderColor: '#C4CADA',
    borderWidth: 2,
    borderRadius: 5,
  },
  activeText: {
    fontWeight: 'bold',
    color: '#959BB2'
  },
});

export default styles;
