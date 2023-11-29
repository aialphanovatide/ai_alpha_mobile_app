/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  priceActionContainer: {
    height: '600',
    marginHorizontal: 10,
    marginVertical: 40,
    backgroundColor: '#EFEFEF',
  },
  title: {
    marginLeft: 10,
    padding: 10,
    color: '#5E6466',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableContainer: {
    height: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#B8BBBC',
  },
  logoContainer: {
    width: 20,
    height: 20,
    marginTop: 10,
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
    // borderBottomWidth: 2,
    // borderBottomColor: '#B8BBBC',
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
