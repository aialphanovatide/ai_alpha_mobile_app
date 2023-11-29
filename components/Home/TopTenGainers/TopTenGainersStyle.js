/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window'); 
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  topTenGainersContainer: {
    height: 400,
    width,
    marginVertical: 40,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
  topTenGainersTitle: {
    marginLeft: 10,
    padding: 10,
    color: '#282828',
    fontSize: responsiveFontSize,
    fontWeight: 'bold',
  },
  table: {
    paddingTop: 10,
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  row: {
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#EFEFEF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoContainer: {
    width: 50,
    height: 50,
    marginRight: 25,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  coinLogo: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  coinDataContainer: {
    width: 100,
    marginTop: 20,
    marginRight: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinPosition: {
    marginRight: 10,
    paddingLeft: 5,
    paddingVertical: 10,
    color: '#242427',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coinData: {
    color: '#242427',
  },
  coinName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  coinNumbersContainer: {
    width: 'auto',
    marginLeft: '20%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  coinNumber: {
    textAlign: 'right',
    color: '#B8BBBC',
    fontWeight: 'bold',
  },
  greenNumber: {
    color: '#8EED1A',
  },
  redNumber: {
    color: '#FF799F'
  }
});

export default styles;
