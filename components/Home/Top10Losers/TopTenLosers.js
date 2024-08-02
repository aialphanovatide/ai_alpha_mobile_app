/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {Platform, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import useTopTenLosersStyles from './TopTenLosersStyle.js';
import topTenGainersService from '../../../services/TopTenGainersService.js';
import Loader from '../../Loader/Loader.js';
import {AboutIcon} from '../Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon.js';
import {home_static_data} from '../homeStaticData.js';
import FastImage from 'react-native-fast-image';
import {TOP_TEN_LOSERS_MOCK} from './TopTenLosersMock.js';
import SkeletonLoader from '../../Loader/SkeletonLoader.js';
import {Top10MoversContext} from '../../../context/TopTenMoversContext.js';

// Component that renders the table of the top 10 gainer coins. It requires fetching this data from an API.

const Item = ({position, coin}) => {
  const styles = useTopTenLosersStyles();
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

const TopTenLosers = ({handleAboutPress}) => {
  const styles = useTopTenLosersStyles();
  const [topTenCoins, setTopTenCoins] = useState([]);
  // const [loading, setLoading] = useState(true);
  const {topTenLosersData, loading} = useContext(Top10MoversContext);

  const additionalAboutStyles = {
    marginRight: Platform.OS === 'android' ? 20 : 0,
  };

  useEffect(() => {
    /*
    const fetchTopTenLosers = async () => {
      try {
        const data = await topTenGainersService.getTop10Coins();
        setTopTenCoins(data.top10Losers);
        console.log('TopTenLosers data:', data.top10Losers);
      } catch (error) {
        console.error('Error fetching top 10 losers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopTenLosers();
    setTopTenCoins(TOP_TEN_LOSERS_MOCK);
    setLoading(false);
    */
    setTopTenCoins(topTenLosersData);
  }, [topTenLosersData]);
  return (
    <View style={styles.topTenGainersContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.topTenGainersTitle}>Top 10 Losers</Text>
        <AboutIcon
          handleAboutPress={handleAboutPress}
          description={home_static_data.topTenGainers.sectionDescription}
        />
      </View>
      {loading || topTenCoins.length === 0 ? (
        <ScrollView>
          <View style={styles.table} showsVerticalScrollIndicator={false}>
            <SkeletonLoader quantity={10} />
          </View>
        </ScrollView>
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

export default TopTenLosers;
