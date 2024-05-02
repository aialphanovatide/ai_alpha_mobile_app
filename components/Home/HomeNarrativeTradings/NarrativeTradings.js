import {Image, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {AboutIcon} from '../Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon';
import {home_static_data} from '../homeStaticData';
import React, {useContext, useEffect, useState} from 'react';
import {AppThemeContext} from '../../../context/themeContext';
import FastImage from 'react-native-fast-image';
import {NarrativeTradingContext} from '../../../context/NarrativeTradingContext';
import useHomeNarrativeTradingStyles from './NarrativeTradingsStyles';

const narrativeTradingMock = [
  {
    id: 1,
    content:
      '<p><strong style="color: rgb(0, 0, 0);" class="ql-size-huge">Tracking Ethereum’s Performance</strong></p><p><strong style="color: rgb(13, 13, 13);" class="ql-size-large">Crypto Pulse</strong></p><p><span style="color: rgb(13, 13, 13);">As the general market fears during the weekend, ETH’s price drop is believed to be a fake-out shaking and hunting-out stop losses before it makes a new swing high.</span></p><p><strong style="color: rgb(13, 13, 13);" class="ql-size-large">What\'s Behind the Price Drop?&nbsp;</strong></p><ul><li><strong style="color: rgb(0, 0, 0);">ETH ETF Approval: </strong><span style="color: rgb(0, 0, 0);">The waiting of approval of ETH ETF could potentially be a reason why ethereum lacks momentum and enthusiasm to the retail traders and investors</span></li><li><strong style="color: rgb(0, 0, 0);">The first touch of the MA20: </strong><span style="color: rgb(0, 0, 0);">ETH has been underperforming among all ecosystems during the short-term rally over the past few months. Despite this, ETH presents the most promising structure, having already reached its nearest moving average (on the weekly chart) which may indicate an impending upward movement.</span></li></ul><p><strong style="color: rgb(0, 0, 0);">Technical analysis on a Weekly timeframe</strong></p><p><strong style="color: rgb(0, 0, 0);"><img src="https://lh7-us.googleusercontent.com/9TCp7aFsJhf7iIxNtjP4cN_yYfkdcz3_bynmekPBAChGSMKTfdLuNERO2JXQFxiBu1qzSerp5txAv35WX4bBLqAMLc92RGwDRYS9lR7pRCbn2karB8DvtHkLjwB4cvzFe-1BI-gawlvG9Q2D4cAyohE" height="291"></strong></p><p><br></p><p><span style="color: rgb(0, 0, 0);">A desired pullback already happened as ETH touched $2800 for the first time since it went to the $4,000 price level.</span></p><p><span style="color: rgb(0, 0, 0);">ETH’s recent price action could potentially structure a normal shakeout hunting stop losses to retail investors/traders.</span></p><p><span style="color: rgb(0, 0, 0);">Although there was a sell-off during the weekend, the decline was approximately 30%, which represents a level that is normally considered a "healthy setback".</span></p><p><strong style="color: rgb(0, 0, 0);">Technical analysis on a 1-day timeframe</strong></p><p><strong style="color: rgb(0, 0, 0);"><img src="https://lh7-us.googleusercontent.com/vXS6VUkJS5E9wdDcakhKY84bMfmiipVpWSD96iiU1N_5lIyCBqimmpqQVQkJUqX2eWZCY4kTB_3jry0gIzLFjsGDfYjIZPmdUV1pviCuy9sGjlkWgjFVPYLmUghsC0YrH3upDKRJUXDs4h99iYioFRU" height="291"></strong></p><p><span style="color: rgb(0, 0, 0);">Following a five-week decline, ETH has now stabilised at the most robust moving average (MA100) on the daily chart</span></p><p><strong style="color: rgb(13, 13, 13);" class="ql-size-large">Inflection Points to watch out for</strong></p><p><strong style="color: rgb(0, 0, 0);">-</strong>\t<strong style="color: rgb(0, 0, 0);">Supports: </strong><span style="color: rgb(0, 0, 0);">$3,000 as immediate support, followed by $2,600.</span></p><p><strong style="color: rgb(0, 0, 0);">-</strong>\t<strong style="color: rgb(0, 0, 0);">Resistance: </strong><span style="color: rgb(0, 0, 0);">A break above $3,730 could potentially lead the price to consolidate near the $4,080 price level.</span></p><p><strong style="color: rgb(0, 0, 0);">Bullish Targets: </strong><span style="color: rgb(0, 0, 0);">A swing high’s target could be at around $3,600. Anywhere above that could lead to a longer holding period as ETH could potentially be bound to another short-term consolidation.</span></p><p><strong style="color: rgb(0, 0, 0);">Bearish Targets: </strong><span style="color: rgb(0, 0, 0);">A break below $3,000 could lead the price down to $2,500</span></p>',
    created_at: '2024-04-15 17:39:18.293212',
    coin_bot_id: 1,
    coin_bot_name: 'btc',
    category: 'Bitcoin',
    title: 'Mocked narrative trading btc',
    image: null,
  },
  {
    id: 2,
    content:
      '<p><strong style="color: rgb(0, 0, 0);" class="ql-size-huge">Tracking Ethereum’s Performance</strong></p><p><strong style="color: rgb(13, 13, 13);" class="ql-size-large">Crypto Pulse</strong></p><p><span style="color: rgb(13, 13, 13);">As the general market fears during the weekend, ETH’s price drop is believed to be a fake-out shaking and hunting-out stop losses before it makes a new swing high.</span></p><p><strong style="color: rgb(13, 13, 13);" class="ql-size-large">What\'s Behind the Price Drop?&nbsp;</strong></p><ul><li><strong style="color: rgb(0, 0, 0);">ETH ETF Approval: </strong><span style="color: rgb(0, 0, 0);">The waiting of approval of ETH ETF could potentially be a reason why ethereum lacks momentum and enthusiasm to the retail traders and investors</span></li><li><strong style="color: rgb(0, 0, 0);">The first touch of the MA20: </strong><span style="color: rgb(0, 0, 0);">ETH has been underperforming among all ecosystems during the short-term rally over the past few months. Despite this, ETH presents the most promising structure, having already reached its nearest moving average (on the weekly chart) which may indicate an impending upward movement.</span></li></ul><p><strong style="color: rgb(0, 0, 0);">Technical analysis on a Weekly timeframe</strong></p><p><strong style="color: rgb(0, 0, 0);"><img src="https://lh7-us.googleusercontent.com/9TCp7aFsJhf7iIxNtjP4cN_yYfkdcz3_bynmekPBAChGSMKTfdLuNERO2JXQFxiBu1qzSerp5txAv35WX4bBLqAMLc92RGwDRYS9lR7pRCbn2karB8DvtHkLjwB4cvzFe-1BI-gawlvG9Q2D4cAyohE" height="291"></strong></p><p><br></p><p><span style="color: rgb(0, 0, 0);">A desired pullback already happened as ETH touched $2800 for the first time since it went to the $4,000 price level.</span></p><p><span style="color: rgb(0, 0, 0);">ETH’s recent price action could potentially structure a normal shakeout hunting stop losses to retail investors/traders.</span></p><p><span style="color: rgb(0, 0, 0);">Although there was a sell-off during the weekend, the decline was approximately 30%, which represents a level that is normally considered a "healthy setback".</span></p><p><strong style="color: rgb(0, 0, 0);">Technical analysis on a 1-day timeframe</strong></p><p><strong style="color: rgb(0, 0, 0);"><img src="https://lh7-us.googleusercontent.com/vXS6VUkJS5E9wdDcakhKY84bMfmiipVpWSD96iiU1N_5lIyCBqimmpqQVQkJUqX2eWZCY4kTB_3jry0gIzLFjsGDfYjIZPmdUV1pviCuy9sGjlkWgjFVPYLmUghsC0YrH3upDKRJUXDs4h99iYioFRU" height="291"></strong></p><p><span style="color: rgb(0, 0, 0);">Following a five-week decline, ETH has now stabilised at the most robust moving average (MA100) on the daily chart</span></p><p><strong style="color: rgb(13, 13, 13);" class="ql-size-large">Inflection Points to watch out for</strong></p><p><strong style="color: rgb(0, 0, 0);">-</strong>\t<strong style="color: rgb(0, 0, 0);">Supports: </strong><span style="color: rgb(0, 0, 0);">$3,000 as immediate support, followed by $2,600.</span></p><p><strong style="color: rgb(0, 0, 0);">-</strong>\t<strong style="color: rgb(0, 0, 0);">Resistance: </strong><span style="color: rgb(0, 0, 0);">A break above $3,730 could potentially lead the price to consolidate near the $4,080 price level.</span></p><p><strong style="color: rgb(0, 0, 0);">Bullish Targets: </strong><span style="color: rgb(0, 0, 0);">A swing high’s target could be at around $3,600. Anywhere above that could lead to a longer holding period as ETH could potentially be bound to another short-term consolidation.</span></p><p><strong style="color: rgb(0, 0, 0);">Bearish Targets: </strong><span style="color: rgb(0, 0, 0);">A break below $3,000 could lead the price down to $2,500</span></p>',
    created_at: '2024-04-15 17:39:18.293212',
    coin_bot_id: 2,
    coin_bot_name: 'eth',
    category: 'Ethereum',
    title: 'Mocked narrative trading eth',
    image: null,
  },
];

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
  const {narrativeTradingData} = useContext(NarrativeTradingContext);
  const [narrativeTradingItems, setNarrativeTradingItems] = useState([]);
  const styles = useHomeNarrativeTradingStyles();
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const aboutIconStyles = {
    top: 34,
  };

  useEffect(() => {
    // console.log('Narrative Tradings: ', narrativeTradingData);
    setNarrativeTradingItems(narrativeTradingData);
  }, [narrativeTradingData]);

  const handlePress = () => setExpanded(!expanded);

  const handleNavigation = item => {
    navigation.navigate('NarrativeTradingArticleScreen', {
      item_content: item.content,
      id: item.id,
      date: item.created_at,
      isNavigateFromHome: true,
    });
  };

  const handleSeeAllNavigation = () => {
    navigation.navigate('Analysis', {
      screen: 'NarrativeTrading',
      params: {},
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Narrative Trading</Text>
      <AboutIcon
        handleAboutPress={handleAboutPress}
        description={home_static_data.analysis.sectionDescription}
        additionalStyles={aboutIconStyles}
      />
      {narrativeTradingItems?.length === 0 ? (
        <Text style={styles.emptyMessage}>
          There aren't narrative tradings to show.
        </Text>
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
