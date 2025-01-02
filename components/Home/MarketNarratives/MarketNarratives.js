import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {AboutIcon} from '../../AboutModal/AboutIcon';
import {home_static_data} from '../../../assets/static_data/homeStaticData';
import React, {useContext, useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';
import useMarketNarrativeStyles from './MarketNarrativesStyles';
import {useSelector} from 'react-redux';
import {
  selectMarketNarratives,
  selectMarketNarrativesLoading,
} from '../../../actions/marketNarrativesActions';
import { MarketNarrativeItem } from './MarketNarrativeItem/MarketNarrativeItem';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


// Component to render the list of market narratives in the home screen. It receives the function to handle the press on the about icon as props. It uses the NarrativeTradingContext to get the data of the market narratives and renders the items in the list. It also renders the about icon and a "see all" button which navigates to the Dashboard screen.
const NarrativeTradings = ({handleAboutPress}) => {
  const marketNarrativesData = useSelector(selectMarketNarratives);
  const loading = useSelector(selectMarketNarrativesLoading);
  const [narrativeTradingItems, setNarrativeTradingItems] = useState([]);
  const styles = useMarketNarrativeStyles();
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const aboutIconStyles = {
    top: 24,
  };

  // useEffect to set the narrativeTradingItems state with the data from the context.
  useEffect(() => {
    setNarrativeTradingItems(marketNarrativesData);
  }, [marketNarrativesData]);

  // Function to handle the expand on the list, by clicking the first item.
  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  // Function to handle the press on an item. It navigates to the MarketNarrativeArticleScreen with the item data as a parameter. It also saves the clicked item in the AsyncStorage.
  const handleNavigation = async item => {
    navigation.navigate('MarketNarrativeArticleScreen', {
      item_content: item.content,
      id: item.id,
      category: item.category,
      date: item.created_at,
      isNavigateFromHome: true,
    });

    const clickedAt = new Date().toISOString();

    const itemWithDate = {
      ...item,
      clickedAt: clickedAt,
    };

    try {
      await AsyncStorage.setItem(
        `narrative_trading_${item.id}`,
        JSON.stringify(itemWithDate),
      );
    } catch (error) {
      console.error(`Failed to save the data of narrative trading ${item.id}`);
    }
  };

  // Function to handle the navigation to the Analysis screen with the NarrativeTrading tab.
  const handleSeeAllNavigation = () => {
    navigation.navigate('Analysis', {
      screen: 'NarrativeTrading',
      params: {},
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.topBarTitle}>NARRATIVES</Text>
        <TouchableOpacity onPress={() => handleSeeAllNavigation()}>
          <Text style={styles.seeAllText}>See All →</Text>
        </TouchableOpacity>
      </View>
      {loading === 'idle' ? (
        <SkeletonLoader />
      ) : loading !== 'idle' && narrativeTradingItems?.length === 0 ? (
        <NoContentDisclaimer
          title={'Whoops, something went wrong.'}
          description={'Please try again in a little while.'}
          type="error"
          additionalStyles={{disclaimer: {marginVertical: '5%'}}}
        />
      ) : (
        <View style={styles.itemsContainer}>
          {narrativeTradingItems?.slice(0, 5).map((item, index) => (
            <MarketNarrativeItem
              key={item.id}
              index={index}
              title={item.title}
              image={item.image}
              item={item}
              handleNavigation={handleNavigation}
              expanded={expanded}
              isLastItem={index === marketNarrativesData.length - 1}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default NarrativeTradings;
