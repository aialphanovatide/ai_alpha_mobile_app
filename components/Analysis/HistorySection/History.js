import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../../BackButton/BackButton';
import useHistoryStyles from './HistoryStyles';
import CryptoFilter from '../Calendar/CryptoCalendar/CryptoFilter';
import {useNavigation} from '@react-navigation/core';
import historyFilterData from './HistoryFilterData';
import FastImage from 'react-native-fast-image';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import {useSelector} from 'react-redux';
import {
  selectAllContent,
  selectDailyDeepDives,
} from '../../../actions/dailyDeepDivesActions';

// HistoryItem component that renders the history item in the history section. It displays the item's image, title, date, and time. The user can click on the item to navigate to the daily deep dives article screen.

const HistoryItem = ({item, styles, handleHistoryNavigation}) => {
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

// Component to display the time interval filter in the history section. It allows users to filter the history items by today or the last week.

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

// Component to display the history section of the app. It displays the daily deep dives conducted on a specific coin, allowing users to access today's and the week's insights conveniently categorized in one place. It also includes a filter to allow users to filter the history items by time and coin.

const History = () => {
  const options = ['today', 'last week'];
  // Since the daily deep dives fetching action is dispatched in the Home section, that renders firstly, the data that we get from the store is going to have items in all the cases.
  const analysisItems = useSelector(selectAllContent);
  const [cryptoOptions, setCryptoOptions] = useState(historyFilterData);
  const [activeOption, setActiveOption] = useState(options[0]);
  const [activeCryptoOption, setActiveCryptoOption] = useState(
    historyFilterData[0],
  );
  const [historyItems, setHistoryItems] = useState([]);
  const styles = useHistoryStyles();
  const navigation = useNavigation();
  const {subscribed} = useContext(RevenueCatContext);

  // Filter the history items by time and category when the data changes

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

  // Function to filter the history items by category

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
        item.category.toLowerCase() === category.category_name.toLowerCase() ||
        item.category.toLowerCase() === category.category.toLowerCase()
      ) {
        filtered_items.push(item);
      }
    });

    return filtered_items;
  };

  // Function to filter the history items by time

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
      screen: 'DailyDeepScreen',
      params: {
        analysis_content: analysis.raw_analysis,
        analysis_id: analysis.id,
        date: analysis.created_at,
        coin_bot_id: analysis.coin_bot_id,
        image: analysis.image,
        title: analysis.title,
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
