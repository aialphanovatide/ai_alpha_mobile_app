/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Platform,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import useTopTenGainersStyles from './TopTenGainersStyle.js';
import {AboutIcon} from '../Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon.js';
import {home_static_data} from '../homeStaticData.js';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../../Loader/SkeletonLoader.js';
import {Top10MoversContext} from '../../../context/TopTenMoversContext.js';
import {AppThemeContext} from '../../../context/themeContext.js';
import {useNavigation} from '@react-navigation/core';
import {TopMenuContext} from '../../../context/topMenuContext.js';
import {CategoriesContext} from '../../../context/categoriesContext.js';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer.js';

// Component that renders the table of the top 10 gainer coins. It requires fetching this data from an API.

const Item = ({position, coin, index, handleItemClick, findCategoryOfItem}) => {
  const styles = useTopTenGainersStyles();
  const itemCategory = findCategoryOfItem(coin.symbol, coin.name);

  return (
    <TouchableOpacity
      onPress={() => handleItemClick(coin.symbol.toLowerCase(), itemCategory)}>
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
    </TouchableOpacity>
  );
};

const TopTenGainers = ({handleAboutPress}) => {
  const navigation = useNavigation();
  const styles = useTopTenGainersStyles();
  const [topTenCoins, setTopTenCoins] = useState([]);
  const {findCategoryOfItem} = useContext(CategoriesContext);
  const {topTenMoversData, loading} = useContext(Top10MoversContext);
  const {isDarkMode} = useContext(AppThemeContext);
  const {updateActiveCoin, updateActiveSubCoin} = useContext(TopMenuContext);

  const additionalAboutStyles = {
    marginRight: Platform.OS === 'android' ? 20 : 0,
    top: 24,
  };

  const scrollIndicator = useRef(new Animated.Value(0)).current;
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * 100) / completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight - 0.2,
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp',
  });

  // Function that handles the click on an item, navigating to the categories section, and setting the coin and category from the item as active

  const handleItemClick = (coin, category) => {
    if (category === null || category === undefined) {
      return;
    } else {
      updateActiveCoin(category);
      updateActiveSubCoin(coin);
      navigation.navigate('TopMenuScreen', {
        screen: 'SubMenuScreen',
        params: {
          screen: 'Fundamentals',
          params: {},
        },
      });
    }
  };

  useEffect(() => {
    setTopTenCoins(topTenMoversData);
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
      {loading ? (
        <ScrollView
          persistentScrollbar={true}
          indicatorStyle={isDarkMode ? 'white' : 'dark'}
          // contentContainerStyle={{paddingRight: 14}}
        >
          <View style={styles.table}>
            <SkeletonLoader quantity={10} />
          </View>
        </ScrollView>
      ) : !loading && topTenCoins.length === 0 ? (
        <NoContentDisclaimer
        title={'Whoops, something went wrong.'}
        description={'Please try again in a little while.'}
        type="error"
      />
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
                <Item
                  key={index}
                  coin={coin}
                  position={index + 1}
                  handleItemClick={handleItemClick}
                  findCategoryOfItem={findCategoryOfItem}
                />
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
