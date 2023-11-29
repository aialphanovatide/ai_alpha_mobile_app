/* eslint-disable prettier/prettier */

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  topTenGainersContainer: {
    height: 400,
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: '#EFEFEF',
  },
  topTenGainersTitle: {
    marginLeft: 10,
    padding: 10,
    color: '#5E6466',
    fontSize: 18,
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  row: {
    height: 100,
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
    // borderColor: '#B8BBBC',
    // borderWidth: 1,
    // backgroundColor: '#B8BBBC',
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
