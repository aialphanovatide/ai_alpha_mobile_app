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
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';
import CryptoFilter from '../Calendar/CryptoCalendar/CryptoFilter';
import {useNavigation} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import useNarrativeTradingStyles from './NarrativeTradingStyles';
import filterData from './FilterData';
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
    <View style={styles.narrativeItemContainer}>
      <FastImage
        source={{
          uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/analysis/${
            isDarkMode ? 'dark' : 'light'
          }/${
            item.category !== null &&
            item.category.toLowerCase().replace(/\s/g, '') === 'total3'
              ? 'total3'
              : item.coin_bot_name
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
            {item.title.slice(0, 90)}...
          </Text>
          <TouchableOpacity
            onPress={() => handleHistoryNavigation(item)}
            style={styles.rightArrowContainer}>
            <Image
              style={styles.rightArrow}
              resizeMode="contain"
              source={require('../../../assets/images/analysis/right-arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  const {isDarkMode} = useContext(AppThemeContext);
  const options = ['today', 'this week'];
  const [cryptoOptions, setCryptoOptions] = useState([]);
  const [activeOption, setActiveOption] = useState(null);
  const [activeCryptoOption, setActiveCryptoOption] = useState(null);
  const [narrativeTradingItems, setNarrativeTradingItems] = useState([]);
  const styles = useNarrativeTradingStyles();
  const navigation = useNavigation();

  useEffect(() => {
    setNarrativeTradingItems(narrativeTradingData);
    console.log(narrativeTradingItems);
  }, [narrativeTradingData]);

  useEffect(() => {
    setCryptoOptions(filterData);
    setActiveCryptoOption(filterData[0]);
    handleCryptoTouch(filterData[0]);
    handleTimeIntervalChange(options[0]);
  }, [narrativeTradingData]);

  const filterItemsByCategory = (category, items) => {
    // console.log('Category: ', category);
    console.log(items);
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

    category.coin_bots.forEach(coin => {
      items.forEach(item => {
        console.log('Coin bot: ', coin.bot_name, ' Item: ', item.coin_bot_name);
        if (
          item.coin_bot_name.toLowerCase().replace(/\s/g, '') ===
          coin.bot_name.toLowerCase().replace(/\s/g, '')
        ) {
          filtered_items.push(item);
        }
      });
    });
    return filtered_items;
  };

  const filterItemsByTime = (interval, items) => {
    const currentDate = new Date();
    console.log(items);

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
      screen: 'NarrativeTradingArticleScreen',
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
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
        style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.backButtonWrapper}>
            <BackButton navigationHandler={handleNavigationToAnalysis} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Narrative Trading</Text>
          </View>
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
              <Text style={styles.emptyMessage}>
                There aren't narrative tradings to show.
              </Text>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default NarrativeTrading;
