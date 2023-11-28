/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './TopTenGainersStyle.js'

const {height, width} = Dimensions.get('window');

// Component that renders the table of the top 10 gainer coins. It requires fetching this data from an API.

const TopTenGainers = () => {
  // TODO - Create a function that renders the element below of this comment for each currency that will be displayed in Top 10 Gainers.
  return (
    <View style={[styles.topTenGainersContainer, width]}>
      <ScrollView>
        <Text style={styles.topTenGainersTitle}>Top 10 Gainers</Text>
        <View style={styles.table}>
          <View style={[styles.row, width]}>
            <View style={styles.coinLogo}>
              <Text>Coin logo</Text>
            </View>
            <View styles={styles.coinDataContainer}>
              <Text style={[styles.coinName, styles.coinData]}>Coin name</Text>
              <Text style={styles.coinData}>Coin data</Text>
            </View>
            <View style={styles.coinNumbersContainer}>
              <Text style={styles.coinNumber}>$0.0000</Text>
              <Text style={[styles.coinNumber, styles.greenNumber]}>
                +0.00%
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TopTenGainers;
