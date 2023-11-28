/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainScrollView: {
    width: 400,
    height: 500,
    backgroundColor: 'transparent',
    flex: 1,
  },
  chartsContainer: {
    flex: 1,
    marginHorizontal: 10,
    width: 500,
    height: 500,
    backgroundColor: 'transparent',
  },
  apiContainer: {
    display: 'flex',
    width: '600',
    height: '400',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartsTitle: {
    marginVertical: 15,
    color: '#5F6466',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  // Non Fundamental Coin styles - If theres the same thing to display on all types of cryptos this should be deleted
  currencyTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pricesBarContainer: {
    backgroundColor: 'transparent',
    width: 600,
    height: 35,
    marginTop: 20,
  },
  topStoriesContainer: {
    backgroundColor: '#EFEFEF',
    height: 400,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  analysisContainer: {
    backgroundColor: '#EFEFEF',
    height: 100,
    marginTop: 10,
    marginHorizontal: 20,
  },
  sectionText: {
    marginTop: 5,
    padding: 2.5,
    color: '#5F6466',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;
