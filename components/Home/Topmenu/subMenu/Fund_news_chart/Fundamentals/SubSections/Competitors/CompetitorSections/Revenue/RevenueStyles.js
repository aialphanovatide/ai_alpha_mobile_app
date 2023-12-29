import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  selectorContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectorItem: {
    width: width * 0.2,
    marginHorizontal: 5,
    padding: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  itemText: {
    color: '#F7F7F7',
    fontSize: responsiveFontSize * 0.7,
    fontWeight: 'bold',
  },
});

export default styles;
