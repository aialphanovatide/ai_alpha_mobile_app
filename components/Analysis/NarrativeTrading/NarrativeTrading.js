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
import CryptoFilter from '../Calendar/CryptoCalendar/CryptoFilter';
import {useNavigation} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import useNarrativeTradingStyles from './NarrativeTradingStyles';
import filterData from '../../../assets/static_data/FilterData';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import UpgradeOverlay from '../../UpgradeOverlay/UpgradeOverlay';
import BackgroundGradient from '../../BackgroundGradient/BackgroundGradient';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import {useSelector} from 'react-redux';
import {selectMarketNarratives} from '../../../actions/marketNarrativesActions';

// Component to render the narrative trading item, it renders the item's image, date, hour, title and a right arrow icon to indicate that the item can be clicked to navigate to the full article.

const NarrativeTradingItem = ({item, styles, handleHistoryNavigation}) => {
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

// Component to render the time menu, it includes a list of time options which can be selected to filter the narrative trading items by time.

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

// Component to render the Narrative Trading screen, it includes the TimeMenu, CryptoFilter, NarrativeTradingItem and NoContentDisclaimer components, and it renders a list of narrative trading items which can be filtered by time and category. Finally, it renders an UpgradeOverlay component if the user is not subscribed.

const NarrativeTrading = () => {
  const marketNarrativesData = useSelector(selectMarketNarratives);
  const options = ['today', 'last week'];
  const [cryptoOptions, setCryptoOptions] = useState(filterData);
  const [activeOption, setActiveOption] = useState(options[0]);
  const [activeCryptoOption, setActiveCryptoOption] = useState(filterData[0]);
  const [narrativeTradingItems, setNarrativeTradingItems] = useState([]);
  const styles = useNarrativeTradingStyles();
  const navigation = useNavigation();
  const {subscribed} = useContext(RevenueCatContext);

  useEffect(() => {
    if (marketNarrativesData.length > 0) {
      handleCryptoTouch(filterData[0]);
      handleTimeIntervalChange(options[0]);
    }
  }, [marketNarrativesData]);

  // Function to filter the narrative trading items by category, it returns an array of items that match the selected category.

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

  // Function to filter the narrative trading items by time, it returns an array of items that match the selected time interval.

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

  // Function to handle the crypto filter touch, it filters the narrative trading items by category and updates the narrative trading items state.

  const handleCryptoTouch = option => {
    setActiveCryptoOption(option);
    const filtered_by_time = filterItemsByTime(
      activeOption,
      marketNarrativesData,
    );
    const filtered_narrative_tradings = filterItemsByCategory(
      option,
      filtered_by_time,
    );
    setNarrativeTradingItems(filtered_narrative_tradings);
  };

  // Function to handle the navigation to the full article, it navigates to the MarketNarrativeArticleScreen and passes the item's content, id and date as params.

  const handleNarrativeTradingNavigation = item => {
    navigation.navigate('Home', {
      screen: 'MarketNarrativeArticleScreen',
      params: {
        item_content: item.content,
        id: item.id,
        date: item.created_at,
        image: item.image,
        title: item.title,
        isNavigateFromHome: false,
      },
    });
  };

  // Function to handle the time interval change, it filters the narrative trading items by time and updates the narrative trading items state.

  const handleTimeIntervalChange = interval => {
    setActiveOption(interval);
    setActiveCryptoOption(filterData[0]);
    const filtered_by_crypto = filterItemsByCategory(
      filterData[0],
      marketNarrativesData,
    );
    const filtered_items = filterItemsByTime(interval, filtered_by_crypto);
    setNarrativeTradingItems(filtered_items);
  };

  // Function to handle the navigation to the Analysis screen when clicking the back button, it navigates to the DashboardMain screen.

  const handleNavigationToAnalysis = () => {
    navigation.navigate('Analysis', {
      screen: 'DashboardMain',
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
