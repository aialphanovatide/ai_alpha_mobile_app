import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  menuContainer: {
    alignSelf: 'center',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
  },
  menuItem: {
    width: '50%',
    height: 20,
    backgroundColor: '#B8BBBC',
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
    backgroundColor: '#898C8D',
  },
  activeText: {
    fontWeight: 'bold',
  },
});

export default styles;
