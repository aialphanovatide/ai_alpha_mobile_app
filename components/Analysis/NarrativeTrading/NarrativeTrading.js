import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../BackButton/BackButton';
import {AppThemeContext} from '../../../context/themeContext';
import CryptoFilter from '../Calendar/CryptoCalendar/CryptoFilter';
import {useNavigation} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import useNarrativeTradingStyles from './NarrativeTradingStyles';
import filterData from './FilterData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import {NarrativeTradingContext} from '../../../context/NarrativeTradingContext';

const NarrativeTradingItem = ({item, styles, handleHistoryNavigation}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const formatItemDate = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    return {
      date: `${year}-${month}-${day}`,
      hour: `${hours}:${minutes}`,
    };
  };
  const {date, hour} = formatItemDate(item.created_at);
  return (
    <TouchableOpacity
      style={styles.narrativeItemContainer}
      onPress={() => handleHistoryNavigation(item)}>
      <FastImage
        source={{
          uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${
            item.category !== null &&
            item.category.toLowerCase().replace(/\s/g, '') === 'total3'
              ? 'total3'
              : item.coin_bot_name.toLowerCase()
          }.png`,
          priority: FastImage.priority.normal,
        }}
        style={styles.itemImage}
        fallback={true}
      />
      <View style={styles.dataContainer}>
        <View style={styles.topRow}>
          <View style={styles.dataRow}>
            <Image
              style={styles.dataIcon}
              resizeMode="contain"
              source={require('../../../assets/images/analysis/calendar-time.png')}
            />
            <Text style={styles.dataText}>{hour}</Text>
          </View>
          <View style={styles.dataRow}>
            <Image
              style={styles.dataIcon}
              resizeMode="contain"
              source={require('../../../assets/images/analysis/calendar.png')}
            />
            <Text style={styles.dataText}>{date}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text numberOfLines={2} style={styles.itemTitle}>
            {item.title.length <= 90
              ? item.title
              : `${item.title.slice(0, 90)}...`}
          </Text>
          <View style={styles.rightArrowContainer}>
            <Image
              style={styles.rightArrow}
              resizeMode="contain"
              source={require('../../../assets/images/analysis/right-arrow.png')}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const TimeMenu = ({
  options,
  activeOption,
  handleTimeIntervalChange,
  styles,
}) => {
  const button_width = 100 / options.length;
  return (
    <View style={styles.buttonContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => handleTimeIntervalChange(option)}
          style={[
            styles.button,
            {width: `${button_width}%`},
            activeOption === option ? styles.activeButton : null,
          ]}>
          <Text
            style={
              activeOption === option ? styles.activeText : styles.inactiveText
            }>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const NarrativeTrading = () => {
  const {narrativeTradingData} = useContext(NarrativeTradingContext);
  const options = ['today', 'last week'];
  const [cryptoOptions, setCryptoOptions] = useState(filterData);
  const [activeOption, setActiveOption] = useState(options[0]);
  const [activeCryptoOption, setActiveCryptoOption] = useState(filterData[0]);
  const [narrativeTradingItems, setNarrativeTradingItems] = useState([]);
  const styles = useNarrativeTradingStyles();
  const navigation = useNavigation();
  const {subscribed} = useContext(RevenueCatContext);

  // Hook to load the data from the previous narrative tradings that the user has seen
  // useEffect(() => {
  //   const interval = activeOption === 'today' ? 1 : 7;
  //   const fetchData = async interval => {
  //     try {
  //       const keys = await AsyncStorage.getAllKeys();
  //       const narrativeTradingKeys = keys.filter(key =>
  //         key.startsWith('narrative_trading_'),
  //       );
  //       const narrativeItems = await AsyncStorage.multiGet(
  //         narrativeTradingKeys,
  //       );
  //       const parsedItems = narrativeItems.map(item => JSON.parse(item[1]));

  //       const currentDate = new Date();

  //       const filteredItems = parsedItems.filter(item => {
  //         const clickedAt = new Date(item.clickedAt);
  //         const timeDifference = Math.abs(currentDate - clickedAt);
  //         const daysDifference = timeDifference / (1000 * 3600 * 24);

  //         return daysDifference <= interval;
  //       });

  //       console.log(
  //         `Loaded narrative trading items within ${interval} days: `,
  //         filteredItems,
  //       );

  //       setLoadedNarrativeTradingItems(filteredItems);
  //     } catch (e) {
  //       console.error('Failed to load the data from storage', e);
  //     }
  //   };
  //   if (loadedNarrativeTradingItems.length === 0) {
  //     fetchData(interval);
  //   }
  // }, [activeOption]);

  useEffect(() => {
    if (narrativeTradingData.length > 0) {
      handleCryptoTouch(filterData[0]);
      handleTimeIntervalChange(options[0]);
    }
  }, [narrativeTradingData]);

  const filterItemsByCategory = (category, items) => {
    const filtered_items = [];
    if (category.category_name.toLowerCase().replace(/\s/g, '') === 'total3') {
      items.forEach(item => {
        if (
          item.category &&
          item.category.toLowerCase().replace(/\s/g, '') === 'total3'
        ) {
          filtered_items.push(item);
        }
      });
      return filtered_items;
    }
    items.forEach(item => {
      if (
        item.category.toLowerCase() === category.category_name.toLowerCase()
      ) {
        filtered_items.push(item);
      }
    });

    return filtered_items;
  };

  const filterItemsByTime = (interval, items) => {
    const currentDate = new Date();
    const filteredArray = items.filter(item => {
      const createdAtDate = new Date(item.created_at);
      if (interval === 'today') {
        return createdAtDate.toDateString() === currentDate.toDateString();
      }
      if (interval === 'last week') {
        const lastWeekDate = new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000,
        );
        return createdAtDate >= lastWeekDate && createdAtDate <= currentDate;
      }
      return true;
    });
    return filteredArray;
  };

  const handleCryptoTouch = option => {
    setActiveCryptoOption(option);
    const filtered_by_time = filterItemsByTime(
      activeOption,
      narrativeTradingData,
    );
    const filtered_narrative_tradings = filterItemsByCategory(
      option,
      filtered_by_time,
    );
    setNarrativeTradingItems(filtered_narrative_tradings);
  };

  const handleNarrativeTradingNavigation = item => {
    navigation.navigate('Home', {
      screen: 'MarketNarrativeArticleScreen',
      params: {
        item_content: item.content,
        id: item.id,
        date: item.created_at,
        isNavigateFromHome: false,
      },
    });
  };

  const handleTimeIntervalChange = interval => {
    setActiveOption(interval);
    setActiveCryptoOption(filterData[0]);
    const filtered_by_crypto = filterItemsByCategory(
      filterData[0],
      narrativeTradingData,
    );
    const filtered_items = filterItemsByTime(interval, filtered_by_crypto);
    setNarrativeTradingItems(filtered_items);
  };

  const handleNavigationToAnalysis = () => {
    navigation.navigate('Analysis', {
      screen: 'AnalysisMain',
      params: {},
    });
  };
  return (
    <SafeAreaView style={styles.flex}>
      <BackgroundGradient />
      <View style={styles.container}>
        <BackButton navigationHandler={handleNavigationToAnalysis} />
        <Text style={styles.title}>Narrative Trading</Text>
        <Text style={styles.sectionDescription}>
          Analyzing specific cryptocurrency sectors (e.g. RWA) and trends
          (SocialFi) in order to capitalise on their momentum.
        </Text>
        <View style={styles.menusContainer}>
          <TimeMenu
            options={options}
            activeOption={activeOption}
            handleTimeIntervalChange={handleTimeIntervalChange}
            styles={styles}
          />
          <CryptoFilter
            options={cryptoOptions}
            currentFilter={activeCryptoOption}
            handleOptionTouch={handleCryptoTouch}
          />
        </View>
        <ScrollView style={styles.itemsContainer}>
          {narrativeTradingItems.length > 0 ? (
            narrativeTradingItems.map(item => (
              <NarrativeTradingItem
                key={item.id}
                item={item}
                styles={styles}
                handleHistoryNavigation={handleNarrativeTradingNavigation}
              />
            ))
          ) : (
            <NoContentDisclaimer
              title={'Whoops, no matches.'}
              description={
                "We couldn't find any search results.\nGive it another go."
              }
            />
          )}
          <View style={styles.spacing} />
        </ScrollView>
      </View>
      {subscribed ? <></> : <UpgradeOverlay />}
    </SafeAreaView>
  );
};
export default NarrativeTrading;
