import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  cryptoCalendarTitle: {
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    color: '#424445',
    fontSize: responsiveFontSize * 0.85,
  },
  container: {
    flex: 1,
    width: width - 20,
    backgroundColor: '#F6F7FB',
  },
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  itemIconContainer: {
    width: 60,
    height: 45,
    marginRight: '5%',
  },
  itemIconImage: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2.5,
    marginVertical: 2,
    borderRadius: 27.5,
  },
  coinName: {
    color: '#5F6466',
    fontSize: responsiveFontSize * 0.75,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemInfo: {
    fontSize: responsiveFontSize * 0.8,
    color: '#D9D9D9',
    marginHorizontal: 2.5,
  },
  topDataRow: {
    position: 'relative',
    paddingVertical: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  date: {
    position: 'absolute',
    right: 5,
    flexDirection: 'row',
  },
  partnerShip: {
    position: 'absolute',
    left: 5,
    flexDirection: 'row',
  },
  timeIconContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeIcon: {
    flex: 1,
    tintColor: '#D9D9D9',
  },
  itemTitle: {
    paddingVertical: 10,
    marginHorizontal: width * 0.05,
    fontSize: responsiveFontSize,
    color: '#5F6466',
    fontWeight: 'bold',
  },
  dataColumn: {
    width: '90%',
  },
  cryptoFilter: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    paddingVertical: 5,
    backgroundColor: '#C4CADA',
    borderRadius: 5,
  },
  cryptoItem: {
    width: width * 0.125,
    marginVertical: 2.5,
    marginHorizontal: 5,
    padding: 2.5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cryptoIconContainer: {
    width: 35,
    height: 35,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cryptoIcon: {
    flex: 1,
  },
  activeCryptoItem: {
    backgroundColor: '#F7F7F7',
  },
  activeCryptoName: {
    color: '#5F6466',
  },
  cryptoName: {
    fontSize: responsiveFontSize * 0.7,
    color: '#F6F7FB',
    textAlign: 'center',
  },
  messageContainer: {
    width: '80%',
    marginVertical: 20,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#5F6466',
    borderWidth: 2,
  },
  emptyEventsMessage: {
    textAlign: 'center',
    padding: 10,
    color: '#5F6466',
    fontSize: responsiveFontSize * 0.9,
    fontWeight: 'bold',
  },
});

export default styles;
