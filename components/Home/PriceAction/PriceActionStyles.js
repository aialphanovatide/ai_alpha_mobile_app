/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  priceActionContainer: {
    height: 'auto',
    width,
    marginVertical: 15,
    paddingBottom: 30,
    paddingHorizontal: 10,
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
    height: 500,
    marginVertical: 10,
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  tableScrollView: {
    flex: 1,
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
    marginHorizontal: 5,
    padding: 5,
    fontWeight: 'bold',
    fontSize: responsiveFontSize * 0.9,
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
    marginRight: 20,
    color: '#242427',
    fontSize: responsiveFontSize * 0.75,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  greenNumber: {
    color: '#3ADF00',
  },
  redNumber: {
    color: '#EB1F1F',
  },
  displayNone: {
    display: 'none',
  },
  categoriesContainer: {
    height: '15%',
    backgroundColor: '#EFEFEF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#B8BBBC',
  },
  category: {
    marginHorizontal: 10,
    color: '#B8BBBC',
  },
  active: {
    backgroundColor: '#F7F7F7',
  },
  activeText: {
    fontWeight: 'bold',
    color: '#242427',
  },
  categoriesTitle: {
    flex: 1,
    paddingTop: 5,
    fontWeight: 'bold',
    fontSize: responsiveFontSize * 0.9,
    color: '#5F6466',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B8BBBC',
  },
  row: {
    flexDirection: 'row',
  }
});

export default styles;
