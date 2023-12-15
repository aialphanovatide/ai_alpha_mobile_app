import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectorItem: {
    width: width * 0.2,
    marginHorizontal: 5,
    padding: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2.5,
  },
  itemText: {
    color: '#B8BBBC',
    fontSize: responsiveFontSize * 0.68,
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  activeCryptoValue: {
    marginVertical: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#5F6466',
    fontWeight: 'bold',
    fontSize: responsiveFontSize * 0.9,
    borderWidth: 2,
    borderColor: '#5F6466',
  },
});

export default styles;
