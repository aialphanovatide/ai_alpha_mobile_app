import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  menuItemContainer: {
    width: 150,
    margin: 5,
    padding: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemName: {
    marginVertical: 5,
    color: '#B8BBBC',
    textAlign: 'center',
  },
  activeItem: {
    color: '#FB6822',
    fontWeight: 'bold',
  },
  dataContainer: {
    marginVertical: 10,
  },
  dataTitle: {
    color: '#5F6466',
    fontSize: responsiveFontSize * 0.95,
    fontWeight: 'bold',
    padding: 5,
  },
  dataRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9'
  },
  dataText: {
    flex: 1,
    margin: 10,
    color: '#242427',
    fontSize: responsiveFontSize * 0.85,
  },
});

export default styles;
