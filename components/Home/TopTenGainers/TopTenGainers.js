/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Platform, View, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import useTopTenGainersStyles from './TopTenGainersStyle.js';
import topTenGainersService from '../../../services/TopTenGainersService.js';
import Loader from '../../Loader/Loader.js';
import TOP_TEN_GAINERS_MOCK from './TopTenGainersMock.js';
import {AboutIcon} from '../Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon.js';
import {home_static_data} from '../homeStaticData.js';
import FastImage from 'react-native-fast-image';

// Component that renders the table of the top 10 gainer coins. It requires fetching this data from an API.

const Item = ({position, coin}) => {
  const styles = useTopTenGainersStyles();
  return (
    <View key={position} style={styles.row}>
      <View style={styles.positionContainer}>
        <Text style={styles.coinPosition}>{position}</Text>
      </View>
      <View style={styles.logoContainer}>
        <FastImage
          style={styles.coinLogo}
          source={{uri: coin.image, priority: FastImage.priority.high}}
          resizeMode="contain"
          fallback={true}
        />
      </View>
      <View styles={styles.coinDataContainer}>
        <Text style={[styles.coinName, styles.coinData]}>{coin.name}</Text>
        <Text style={styles.coinData}>{coin.symbol.toUpperCase()}</Text>
      </View>
      <View style={styles.coinNumbersContainer}>
        <Text style={styles.coinNumber}>${coin.currentPrice}</Text>
        <Text
          style={[
            styles.coinNumber,
            coin.priceChange24H &&
              (coin.priceChange24H >= 0
                ? styles.greenNumber
                : styles.redNumber),
          ]}>
          {coin.priceChange24H && coin.priceChange24H.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const TopTenGainers = ({handleAboutPress}) => {
  const styles = useTopTenGainersStyles();
  const [topTenCoins, setTopTenCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const additionalAboutStyles = {
    marginRight: Platform.OS === 'android' ? 20 : 0,
  };

  useEffect(() => {
    const fetchTopTenCoins = async () => {
      try {
        const data = await topTenGainersService.getTop10Coins();
        setTopTenCoins(data);
        // console.log('TopTenGainers data:', data);
      } catch (error) {
        console.error('Error fetching top 10 gainers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopTenCoins();
    /*
    setTopTenCoins(TOP_TEN_GAINERS_MOCK);
    setLoading(false);
    */
  }, []);
  return (
    <View style={styles.topTenGainersContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.topTenGainersTitle}>Top 10 Gainers</Text>
        <AboutIcon
          handleAboutPress={handleAboutPress}
          description={home_static_data.topTenGainers.sectionDescription}
        />
      </View>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          <View style={styles.table} showsVerticalScrollIndicator={false}>
            {topTenCoins.length > 0 &&
              topTenCoins.map((coin, index) => (
                <Item key={index} coin={coin} position={index + 1} />
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default TopTenGainers;
