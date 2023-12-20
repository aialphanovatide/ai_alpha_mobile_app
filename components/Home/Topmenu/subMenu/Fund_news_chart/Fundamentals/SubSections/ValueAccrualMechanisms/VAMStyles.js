import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    alignSelf: 'center',
    backgroundColor: '#EFEFEF',
  },

  menuItemContainer: {
    width: width * 0.45,
    margin: 5,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
  },
  menuContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuItemName: {
    marginVertical: 5,
    color: '#B8BBBC',
    textAlign: 'center',
  },
  iconContainer: {
    width: 20,
    height: 20,
    margin: 5,
    alignSelf: 'center',
  },
  itemIcon: {
    flex: 1,
    tintColor: '#B8BBBC',
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
    backgroundColor: '#F7F7F7',
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataImage: {
    flex: 1,
  },
  dataText: {
    flex: 1,
    padding: 10,
    margin: 10,
    color: '#242427',
    fontSize: responsiveFontSize * 0.85,
  },
});

export default styles;
