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
import useHistoryStyles from './HistoryStyles';
import CryptoFilter from '../Calendar/CryptoCalendar/CryptoFilter';
import {useNavigation} from '@react-navigation/core';
import historyFilterData from './HistoryFilterData';
import FastImage from 'react-native-fast-image';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import {AnalysisContext} from '../../../context/AnalysisContext';

const HistoryItem = ({item, styles, handleHistoryNavigation}) => {
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
      onPress={() => handleHistoryNavigation(item)}
      style={styles.historyItemContainer}>
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
              style={[styles.dataIcon, styles.iconSpacing]}
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
            {item.title.length >= 90
              ? `${item.title.slice(0, 90)}...`
              : item.title}
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

const HistoryTimeMenu = ({
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

const History = () => {
  const options = ['today', 'last week'];
  const {analysisItems} = useContext(AnalysisContext);
  const [cryptoOptions, setCryptoOptions] = useState(historyFilterData);
  const [activeOption, setActiveOption] = useState(options[0]);
  const [activeCryptoOption, setActiveCryptoOption] = useState(
    historyFilterData[0],
  );
  const [historyItems, setHistoryItems] = useState([]);
  const [loadedHistoryItems, setLoadedHistoryItems] = useState([]);
  const styles = useHistoryStyles();
  const navigation = useNavigation();
  const {subscribed} = useContext(RevenueCatContext);

  // Hook to load the data from the previous analysis that the user has seen
  // useEffect(() => {
  //   const interval = activeOption === 'today' ? 1 : 7;
  //   const fetchData = async interval => {
  //     try {
  //       const keys = await AsyncStorage.getAllKeys();
  //       const analysisKeys = keys.filter(key => key.startsWith('analysis_'));
  //       const analysisItems = await AsyncStorage.multiGet(analysisKeys);
  //       const parsedItems = analysisItems.map(item => JSON.parse(item[1]));
  //       const currentDate = new Date();

  //       const filteredItems = parsedItems.filter(item => {
  //         const clickedAt = new Date(item.clickedAt);
  //         const timeDifference = Math.abs(currentDate - clickedAt);
  //         const daysDifference = timeDifference / (1000 * 3600 * 24);

  //         return daysDifference <= interval;
  //       });

  //       console.log(
  //         `Loaded analysis items within ${interval} days: `,
  //         filteredItems,
  //       );
  //       setLoadedHistoryItems(filteredItems);
  //     } catch (e) {
  //       console.error('Failed to load the data from storage', e);
  //     }
  //   };
  //   if (loadedHistoryItems.length === 0) {
  //     fetchData(interval);
  //   }
  // }, [activeOption]);

  useEffect(() => {
    if (analysisItems.length !== 0) {
      const filtered_by_time = filterItemsByTime(activeOption, analysisItems);
      const filtered_history_items = filterItemsByCategory(
        activeCryptoOption,
        filtered_by_time,
      );
      setHistoryItems(filtered_history_items.reverse());
    }
  }, [analysisItems]);

  useEffect(() => {
    setActiveOption(options[0]);
    handleCryptoTouch(activeCryptoOption);
  }, []);

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

  const filterItemsByTime = (interval, analysisArray) => {
    const currentDate = new Date();

    const filteredArray = analysisArray.filter(item => {
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
    const filtered_by_time = filterItemsByTime(activeOption, analysisItems);
    const filtered_history_items = filterItemsByCategory(
      option,
      filtered_by_time,
    );
    setHistoryItems(filtered_history_items);
  };

  const handleHistoryNavigation = analysis => {
    navigation.navigate('Home', {
      screen: 'AnalysisArticleScreen',
      params: {
        analysis_content: analysis.raw_analysis,
        analysis_id: analysis.id,
        date: analysis.created_at,
        coin_bot_id: analysis.coin_bot_id,
        isHistoryArticle: true,
      },
    });
  };

  const handleTimeIntervalChange = interval => {
    setActiveOption(interval);
    setActiveCryptoOption(historyFilterData[0]);
    const filtered_by_crypto = filterItemsByCategory(
      historyFilterData[0],
      analysisItems,
    );
    const filtered_items = filterItemsByTime(interval, filtered_by_crypto);
    setHistoryItems(filtered_items);
  };

  return (
    <SafeAreaView style={styles.flex}>
      <BackgroundGradient />
      <View style={styles.container}>
        <BackButton />
        <Text style={styles.title}>History</Text>
        <Text style={styles.sectionDescription}>
          The history section consolidates all analysis conducted on a specific
          coin, allowing users to access today's and the week's insights
          conveniently categorized in one place.
        </Text>
        <View style={styles.menusContainer}>
          <HistoryTimeMenu
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
          {historyItems.length > 0 ? (
            historyItems.map(item => (
              <HistoryItem
                key={item.id}
                item={item}
                styles={styles}
                handleHistoryNavigation={handleHistoryNavigation}
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
        </ScrollView>
      </View>
      {subscribed ? <></> : <UpgradeOverlay />}
    </SafeAreaView>
  );
};

export default History;
