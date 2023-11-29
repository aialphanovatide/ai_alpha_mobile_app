/* eslint-disable prettier/prettier */

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  topTenGainersContainer: {
    height: 400,
    marginTop: 20,
    marginHorizontal: 20,
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
  coinLogo: {
    width: 70,
    height: 70,
    marginRight: 30,
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 35,
    borderColor: '#B8BBBC',
    borderWidth: 1,
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: '#B8BBBC',
  },
  coinDataContainer: {
    width: 100,
    marginTop: 20,
    marginRight: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinData: {
    color: '#242427',
  },
  coinName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  coinNumbersContainer: {
    width: 100,
    marginLeft: '25%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  coinNumber: {
    textAlign: 'right',
    color: '#B8BBBC',
  },
  greenNumber: {
    color: '#8EED1A',
  },
  redNumber: {
    color: '#FF799F'
  }
});

export default styles;
