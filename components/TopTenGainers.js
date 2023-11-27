/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');

// Component that renders the table of the top 10 gainer coins. It requires fetching this data from an API.

const TopTenGainers = () => {
  // TODO - Create a function that renders the element below of this comment for each currency that will be displayed in Top 10 Gainers.
  return (
    <ScrollView>
      <Text style={styles.topTenGainersTitle}>Top 10 Gainers</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.coinLogo}>
            <Text>Coin logo</Text>
          </View>
          <View styles={styles.coinDataContainer}>
            <Text style={[styles.coinName, styles.coinData]}>Coin name</Text>
            <Text style={styles.coinData}>Coin data</Text>
          </View>
          <View style={styles.coinNumbersContainer}>
            <Text style={styles.coinNumber}>$0.0000</Text>
            <Text style={[styles.coinNumber, styles.greenNumber]}>+0.00%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    width,
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
});
export default TopTenGainers;
