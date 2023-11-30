/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  priceActionContainer: {
    height: '500',
    width,
    marginVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: '#282828',
    fontSize: responsiveFontSize,
    fontWeight: 'bold',
  },
  tableContainer: {
    height: '100%',
    marginVertical: 10,
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  tableScrollView: {
    height: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#B8BBBC',
  },
  logoContainer: {
    width: 20,
    height: 20,
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinLogo: {
    width: '100%',
    height: '100%',
  },
  headerCell: {
    flex: 1,
    padding: 2.5,
    borderBottomWidth: 1,
    borderBottomColor: '#B8BBBC',
    fontWeight: 'bold',
    fontSize: 10,
    color: '#5F6466',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#B8BBBC',
  },
  dataCell: {
    flex: 1,
    padding: 5,
    color: '#242427',
    fontSize: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  greenNumber: {
    color: '#8EED1A',
  },
  redNumber: {
    color: '#FF799F',
  },
});

export default styles;
