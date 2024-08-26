/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Platform, View, Text, Image, Animated} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import useTopTenGainersStyles from './TopTenGainersStyle.js';
import {AboutIcon} from '../Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon.js';
import {home_static_data} from '../homeStaticData.js';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../../Loader/SkeletonLoader.js';
import {Top10MoversContext} from '../../../context/TopTenMoversContext.js';
import {AppThemeContext} from '../../../context/themeContext.js';

// Component that renders the table of the top 10 gainer coins. It requires fetching this data from an API.

const Item = ({position, coin, index}) => {
  const styles = useTopTenGainersStyles();
  return (
    <>
      <View style={styles.row}>
        <View style={styles.positionContainer}>
          <Text style={styles.coinPosition}>{position}</Text>
        </View>
        <View style={styles.logoContainer}>
          <FastImage
            style={styles.coinLogo}
            source={{
              uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${coin.symbol.toLowerCase()}.png`,
              // coin.image,
              priority: FastImage.priority.high,
            }}
            resizeMode="contain"
            fallback={true}
          />
        </View>
        <View styles={styles.coinDataContainer}>
          <Text style={[styles.coinName]}>{coin.name}</Text>
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
      {position !== 10 && <View style={[styles.horizontalLine]} />}
    </>
  );
};

const TopTenGainers = ({handleAboutPress}) => {
  const styles = useTopTenGainersStyles();
  const [topTenCoins, setTopTenCoins] = useState([]);
  const {topTenMoversData, loading} = useContext(Top10MoversContext);
  const {isDarkMode} = useContext(AppThemeContext);

  const additionalAboutStyles = {
    marginRight: Platform.OS === 'android' ? 20 : 0,
    top: 24,
  };

  const scrollIndicator = useRef(new Animated.Value(0)).current;
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * 100) /
        completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    (visibleScrollBarHeight / completeScrollBarHeight) - 0.2,
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    setTopTenCoins(topTenMoversData);
    /*
    const fetchTopTenCoins = async () => {
      try {
        const data = await topTenGainersService.getTop10Coins();
        setTopTenCoins(data.top10Gainers);
        console.log('TopTenGainers data:', data);
      } catch (error) {
        console.error('Error fetching top 10 gainers:', error);
      } finally {
        setLoading(false);
      }
    };
    setTopTenCoins(TOP_TEN_GAINERS_MOCK);
    setLoading(false);
    */
    // const fetchTopTenCoinsFromServer = async () => {
    //   try {
    //     const response = await getService(
    //       `api/top-movers?vs_currency=usd&order=price_change_desc&precision=2`,
    //     );
    //     // setTopTenCoins(data.top10Gainers);
    //     const top10CoinsInfo = [];
    //     for (let i = 0; i < response.data.top_10_gainers.length; i++) {
    //       const coin = response.data.top_10_gainers[i];
    //       const coinInfo = {
    //         name: coin.name,
    //         symbol: coin.symbol,
    //         image: coin.image,
    //         currentPrice: coin.current_price,
    //         priceChange24H: coin.price_change_percentage_24h
    //           ? coin.price_change_percentage_24h
    //           : 0.0,
    //       };
    //       top10CoinsInfo.push(coinInfo);
    //     }
    //     setTopTenCoins(top10CoinsInfo);
    //     console.log('TopTenGainers data:', top10CoinsInfo);
    //   } catch (error) {
    //     console.error('Error fetching top 10 gainers:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchTopTenCoinsFromServer();
    // setTopTenCoins(TOP_TEN_GAINERS_MOCK);
    // setLoading(false);
  }, [topTenMoversData]);
  return (
    <View style={styles.topTenGainersContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.topTenGainersTitle}>Top 10 Gainers</Text>
        <AboutIcon
          handleAboutPress={handleAboutPress}
          title={home_static_data.topTenGainers.sectionTitle}
          description={home_static_data.topTenGainers.sectionDescription}
          additionalStyles={additionalAboutStyles}
        />
      </View>
      {loading || topTenCoins.length === 0 ? (
        <ScrollView
          persistentScrollbar={true}
          indicatorStyle={isDarkMode ? 'white' : 'dark'}
          // contentContainerStyle={{paddingRight: 14}}
        >
          <View style={styles.table}>
            <SkeletonLoader quantity={10} />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.itemsContainer}>
          <ScrollView
            style={styles.table}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={height => {
              setCompleteScrollBarHeight(height);
            }}
            onLayout={({
              nativeEvent: {
                layout: {height},
              },
            }) => {
              setVisibleScrollBarHeight(height);
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollIndicator}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={16}>
            {topTenCoins.length > 0 &&
              topTenCoins.map((coin, index) => (
                <Item key={index} coin={coin} position={index + 1} />
              ))}
          </ScrollView>
          <View style={styles.scrollBarContainer}>
            <Animated.View
              style={[
                styles.scrollBar,
                {
                  height: scrollIndicatorSize,
                  transform: [{translateY: scrollIndicatorPosition}],
                },
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default TopTenGainers;
