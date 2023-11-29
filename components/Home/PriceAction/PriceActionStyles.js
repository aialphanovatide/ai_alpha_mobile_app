/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  priceActionContainer: {
    height: 'auto',
    marginHorizontal: 20,
    marginVertical: 40,
    backgroundColor: '#DDE1E2',
  },
  title: {
    marginLeft: 10,
    padding: 10,
    color: '#5E6466',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#B8BBBC',
  },
  headerCell: {
    flex: 1,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#B8BBBC',
    color: '#5F6466',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#B8BBBC',
  },
  dataCell: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#B8BBBC',
    color: '#242427'
  },
  greenNumber: {
    color: '#8EED1A',
  },
  redNumber: {
    color: '#FF799F',
  },
});

export default styles;
