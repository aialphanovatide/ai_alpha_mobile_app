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
import {AboutIcon} from '../Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon';
import {home_static_data} from '../homeStaticData';
import React, {useContext, useEffect, useState} from 'react';
import {AppThemeContext} from '../../../context/themeContext';
import FastImage from 'react-native-fast-image';
import {NarrativeTradingContext} from '../../../context/NarrativeTradingContext';
import useHomeNarrativeTradingStyles from './NarrativeTradingsStyles';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoContentDisclaimer from '../../NoContentDisclaimer/NoContentDisclaimer';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NarrativeTradingItem = ({
  title,
  image,
  item,
  handleNavigation,
  index,
  expanded,
}) => {
  const styles = useHomeNarrativeTradingStyles();
  const {isDarkMode} = useContext(AppThemeContext);

  return (
    <TouchableOpacity
      onPress={() => handleNavigation(item)}
      style={[
        styles.item,
        // index === 0 && !expanded ? {borderBottomWidth: 0} : {},
        index === 0 && !expanded && {marginBottom: 0},
        index !== 0 && expanded && {paddingVertical: 0, paddingBottom: 14},
      ]}>
      <View style={[styles.row, index === 0 && !expanded && {marginBottom: 0}]}>
        <FastImage
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${
              item.category !== null &&
              item.category.toLowerCase().replace(/\s/g, '') === 'total3'
                ? 'total3'
                : item.coin_bot_name.toLowerCase()
            }.png`,
            priority: FastImage.priority.high,
          }}
          style={[
            styles.imageStyle,
            index > 0 && !expanded ? styles.hidden : {opacity: 1},
          ]}
          resizeMode="contain"
          fallback={true}
        />
        <Text style={styles.titleStyles} numberOfLines={2}>
          {title}
        </Text>
      </View>
      {index !== 0 && <View style={[styles.horizontalLine]} />}
      {index === 0 && expanded && <View style={[styles.horizontalLine]} />}
    </TouchableOpacity>
  );
};

const NarrativeTradings = ({handleAboutPress}) => {
  const {narrativeTradingData, loading} = useContext(NarrativeTradingContext);
  const [narrativeTradingItems, setNarrativeTradingItems] = useState([]);
  const styles = useHomeNarrativeTradingStyles();
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const aboutIconStyles = {
    top: 24,
  };

  useEffect(() => {
    setNarrativeTradingItems(narrativeTradingData);
  }, [narrativeTradingData]);

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const handleNavigation = async item => {
    navigation.navigate('NarrativeTradingArticleScreen', {
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

  const handleSeeAllNavigation = () => {
    navigation.navigate('Analysis', {
      screen: 'NarrativeTrading',
      params: {},
    });
  };

  if (!loading && narrativeTradingItems?.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Market Narratives</Text>
        <AboutIcon
          handleAboutPress={handleAboutPress}
          title={home_static_data.narrativeTradings.sectionTitle}
          description={home_static_data.narrativeTradings.sectionDescription}
          additionalStyles={aboutIconStyles}
        />
        <NoContentDisclaimer
          title={'Whoops, something went wrong.'}
          description={'Please try again in a little while.'}
          type="error"
          additionalStyles={{disclaimer: {marginVertical: '5%'}}}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Market Narratives</Text>
      <AboutIcon
        handleAboutPress={handleAboutPress}
        title={home_static_data.narrativeTradings.sectionTitle}
        description={home_static_data.narrativeTradings.sectionDescription}
        additionalStyles={aboutIconStyles}
      />
      {loading ? (
        <SkeletonLoader />
      ) : (
        <View style={styles.itemsContainer}>
          {narrativeTradingItems?.slice(0, 5).map((item, index) => (
            <View
              style={[
                styles.itemWrapper,
                index > 0 && !expanded ? styles.hidden : {opacity: 1},
              ]}
              key={index}>
              <NarrativeTradingItem
                key={item.id}
                index={index}
                title={item.title}
                image={item.image}
                item={item}
                handleNavigation={handleNavigation}
                expanded={expanded}
              />
              <TouchableOpacity
                style={[styles.arrowContainer, index > 0 ? styles.hidden : {}]}
                onPress={() => handlePress()}>
                <Image
                  source={
                    expanded
                      ? require('../../../assets/images/arrow-up.png')
                      : require('../../../assets/images/arrow-down.png')
                  }
                  style={styles.arrowDown}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ))}
          {expanded ? (
            <View style={styles.seeAllButton}>
              <Text
                style={styles.seeAllText}
                onPress={() => handleSeeAllNavigation()}>
                See all articles
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      )}
    </View>
  );
};

export default NarrativeTradings;
