/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Dimensions, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './TopTenGainersStyle.js';
import {Image} from 'react-native-svg';
import topTenGainersService from '../../../services/TopTenGainersService.js';

const {height, width} = Dimensions.get('window');

// Component that renders the table of the top 10 gainer coins. It requires fetching this data from an API.

const Item = ({position, coin}) => {
  return (
    <View key={position} style={[styles.row, width]}>
      <View style={styles.coinLogo}>
        <Image href={coin.image} />
      </View>
      <View styles={styles.coinDataContainer}>
        <Text style={[styles.coinName, styles.coinData]}>{coin.name}</Text>
        <Text style={styles.coinData}>Coin data</Text>
      </View>
      <View style={styles.coinNumbersContainer}>
        <Text style={styles.coinNumber}>${coin.currentPrice}</Text>
        <Text
          style={[
            styles.coinNumber,
            coin.priceChange24H >= 0 ? styles.greenNumber : styles.redNumber,
          ]}>
          {coin.priceChange24H >= 0 ? '+' : '-' + coin.priceChange24H}
        </Text>
      </View>
    </View>
  );
};

const TopTenGainers = () => {
  const [topTenCoins, setTopTenCoins] = useState([]);

  useEffect(() => {
    const fetchTopTenCoins = async () => {
      try {
        const data = await topTenGainersService.getTop10Coins();
        setTopTenCoins(data);
      } catch (error) {
        console.error('Error fetching top 10 coins:', error);
      }
    };
    fetchTopTenCoins();
  }, []);

  return (
    <View style={[styles.topTenGainersContainer, width]}>
      <ScrollView>
        <Text style={styles.topTenGainersTitle}>Top 10 Gainers</Text>
        <View style={styles.table}>
          {topTenCoins.length > 0 &&
            topTenCoins.map((coin, index) => (
              <Item key={index} coin={coin} position={index + 1} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TopTenGainers;
