/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');

const TopTenGainers = () => {
  return (
    <ScrollView>
      <Text style={{marginLeft: 10, padding: 10}}>Top 10 Gainers</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.coinLogo}>
            <Text>Coin logo</Text>
          </View>
          <View styles={styles.coinDataContainer}>
            <Text>Coin name</Text>
            <Text>Coin data</Text>
          </View>
          <View style={styles.coinNumbersContainer}>
            <Text style={styles.coinNumber}>$0.0000</Text>
            <Text style={styles.coinNumber}>+0.00%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#222',
  },
  row: {
    width,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#222',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  coinLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: '#fff',
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinDataContainer: {
    width: 100,
    marginTop: 20,
    marginRight: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});
export default TopTenGainers;
