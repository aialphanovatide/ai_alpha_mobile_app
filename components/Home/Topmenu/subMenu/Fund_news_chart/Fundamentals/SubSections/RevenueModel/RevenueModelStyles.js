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
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    margin: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemButton: {
    width: 20,
    height: 20,
    margin: 2.5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  itemName: {
    fontSize: responsiveFontSize * 0.7,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginHorizontal: 10,
  },
  charts: {
    flexDirection: 'row',
    padding: 10,
  },
  dataRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataContainer: {
    marginHorizontal: '17.5%',
  },
  text: {
    color: '#5F6466',
    fontSize: responsiveFontSize * 0.8,
    textAlign: 'center',
    alignSelf: 'center',
  },
  year: {
    fontSize: responsiveFontSize,
    fontWeight: 'bold',
    color: '#242427',
  },
  percentageValue: {
    fontSize: responsiveFontSize * 1.25,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  inactive: {
    backgroundColor: '#D9D9D9'
  },
  inactiveText: {
    color: '#D9D9D9'
  }
});

export default styles;
