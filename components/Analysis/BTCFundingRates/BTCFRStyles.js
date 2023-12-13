import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  mainSection: {
    flex: 1,
    height,
  },
  titleContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  title: {
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    color: '#5F6466',
    fontSize: responsiveFontSize * 1.2,
    fontWeight: 'bold',
  },
  tableContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    width: width - 30,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeader: {
    backgroundColor: '#EFEFEF',
  },
  logoContainer: {
    width: 30,
    height: 30,
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exchangeLogo: {
    width: '100%',
    height: '100%',
  },
  dataRow: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCell: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: width * 0.05,
    fontSize: responsiveFontSize,
    backgroundColor: '#EDF0F3',
  },
  dataCell: {
    height: 30,
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginVertical: 20,
    flex: 1,
    color: '#242427',
    fontSize: responsiveFontSize,
  },
  exchangeName: {
    color: '#242427',
    fontSize: responsiveFontSize,
    fontWeight: 'bold',
  },
});

export default styles;
