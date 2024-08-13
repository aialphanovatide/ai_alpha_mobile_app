import {Image, View, Text, TouchableOpacity} from 'react-native';
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

const NarrativeTradingItem = ({title, image, item, handleNavigation}) => {
  const styles = useHomeNarrativeTradingStyles();
  const {isDarkMode} = useContext(AppThemeContext);

  return (
    <TouchableOpacity
      onPress={() => handleNavigation(item)}
      style={styles.item}>
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
          priority: FastImage.priority.high,
        }}
        style={styles.imageStyle}
        resizeMode="contain"
        fallback={true}
      />
      <Text style={styles.titleStyles} numberOfLines={2}>
        {title}
      </Text>
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
    top: 22,
  };

  useEffect(() => {
    setNarrativeTradingItems(narrativeTradingData);
  }, [narrativeTradingData]);

  const handlePress = () => setExpanded(!expanded);

  const handleNavigation = async item => {
    navigation.navigate('NarrativeTradingArticleScreen', {
      item_content: item.content,
      id: item.id,
      category: item.category,
      date: item.created_at,
      isNavigateFromHome: true,
    });
    try {
      await AsyncStorage.setItem(
        `narrative_trading_${item.id}`,
        JSON.stringify(item),
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
    return <></>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Market Narratives</Text>
      <AboutIcon
        handleAboutPress={handleAboutPress}
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
                index > 0 && !expanded ? styles.hidden : {},
              ]}
              key={index}>
              <NarrativeTradingItem
                key={item.id}
                title={item.title}
                image={item.image}
                item={item}
                handleNavigation={handleNavigation}
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
