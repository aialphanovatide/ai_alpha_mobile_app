import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
import useSearchStyles from './SearchStyles';
import FastImage from 'react-native-fast-image';
import {
  findCoinMatch,
  findCoinNameBySymbol,
} from '../Home/Topmenu/subMenu/Fund_news_chart/Fundamentals/SubSections/Competitors/coinsNames';
import {useNavigation} from '@react-navigation/core';
import AlertDetails from '../Alerts/AlertItem';
import {getService} from '../../services/aiAlphaApi';
import useAlertsStyles from '../Alerts/styles';
import SkeletonLoader from '../Loader/SkeletonLoader';
import {selectCategories} from '../../actions/categoriesActions';
import {useDispatch, useSelector} from 'react-redux';
import {selectDailyDeepDives} from '../../actions/dailyDeepDivesActions';
import {selectMarketNarratives} from '../../actions/marketNarrativesActions';
import {
  updateActiveCoin,
  updateActiveSubCoin,
} from '../../store/categoriesSlice';

const SearchCryptoItem = ({
  crypto,
  category,
  styles,
  handleCryptoItemNavigation,
  isDarkMode,
  isLastItem,
}) => {
  const name = findCoinNameBySymbol(crypto.bot_name.toUpperCase());
  return (
    <TouchableOpacity
      onPress={() => handleCryptoItemNavigation(category, crypto)}
      style={[styles.cryptoItem, isLastItem ? {borderBottomWidth: 0} : {}]}>
      <FastImage
        source={{
          uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/coins/${crypto.bot_name}.png`,
          priority: FastImage.priority.normal,
        }}
        resizeMode="contain"
        style={styles.cryptoItemImage}
      />
      <View style={styles.row}>
        <Text style={styles.cryptoName}>{name}</Text>
        <Text style={styles.cryptoAcronym}>
          {crypto.bot_name.toUpperCase()}
        </Text>
      </View>
      <Image
        source={require('../../assets/images/arrow-right.png')}
        style={styles.rightArrowImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const SearchAnalysisItem = ({
  analysis,
  handleAnalysisNavigation,
  styles,
  isLastItem,
}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <TouchableOpacity
      onPress={() => handleAnalysisNavigation(analysis)}
      style={[styles.analysisItem, isLastItem ? {borderBottomWidth: 0} : {}]}>
      <FastImage
        source={{
          uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/analysis/${
            isDarkMode ? 'dark' : 'light'
          }/${
            analysis.category !== null &&
            analysis.category.toLowerCase().replace(/\s/g, '') === 'total3'
              ? 'total3'
              : analysis.coin_bot_name
          }.png`,
          priority: FastImage.priority.high,
        }}
        style={styles.imageStyle}
        resizeMode="contain"
        fallback={true}
      />
      <View style={styles.analysisRow}>
        <Text style={styles.analysisTitle} numberOfLines={1}>
          {analysis.title}
        </Text>
      </View>
      <Image
        source={require('../../assets/images/arrow-right.png')}
        style={styles.rightArrowImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const SearchAlertSection = ({currentText, loading}) => {
  const [foundAlerts, setFoundAlerts] = useState([]);
  const styles = useSearchStyles();
  const alertsStyles = useAlertsStyles();

  useEffect(() => {
    const match = findCoinMatch(currentText.toUpperCase());
    if (match && match !== undefined) {
      fetchAlertsByCoin(match);
    } else {
      setFoundAlerts([]);
    }
  }, [currentText]);

  const fetchAlertsByCoin = async match => {
    try {
      const response = await getService(
        `/api/filter/alerts?coin=${match.symbol.toLowerCase()}&date=1w&limit=5`,
      );

      if (
        response.length === 0 ||
        response.message ||
        response.alerts.length === 0
      ) {
        setFoundAlerts([]);
      } else {
        setFoundAlerts(response.alerts);
      }
    } catch (error) {
      console.error('Error searching alerts:', error.message);
    }
  };

  return (
    <View style={styles.cryptoSearch}>
      {loading ? (
        <SkeletonLoader type="alerts" quantity={4} />
      ) : (
        foundAlerts &&
        foundAlerts.length > 0 &&
        foundAlerts.map(alert => (
          <AlertDetails
            key={alert.alert_id}
            message={alert.alert_message}
            timeframe={alert.alert_name}
            price={alert.price}
            created_at={alert.created_at}
            styles={alertsStyles}
          />
        ))
      )}
    </View>
  );
};

const SearchNTItem = ({
  styles,
  handleNarrativeTradingsNavigation,
  item,
  isLastItem,
}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <TouchableOpacity
      onPress={() => handleNarrativeTradingsNavigation(item)}
      style={[styles.analysisItem, isLastItem ? {borderBottomWidth: 0} : {}]}>
      <FastImage
        source={{
          uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/${
            isDarkMode ? 'Dark' : 'Light'
          }/Inactive/${
            item.category !== null ? 'ai' : item.category.toLowerCase()
          }.png`,
          priority: FastImage.priority.high,
        }}
        style={styles.imageStyle}
        resizeMode="contain"
        fallback={true}
      />
      <View style={styles.analysisRow}>
        <Text style={styles.analysisTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <Image
        source={require('../../assets/images/arrow-right.png')}
        style={styles.rightArrowImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const Search = ({currentTextValue, contentVisible}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useSearchStyles();
  const {categories} = useSelector(selectCategories);
  const narrativeTradingData = useSelector(selectMarketNarratives);
  const analysisItems = useSelector(selectDailyDeepDives);
  const [cryptoSearchResult, setCryptoSearchResult] = useState([]);
  const [analysisSearchResult, setAnalysisSearchResult] = useState([]);
  const [ntSearchResult, setNtSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Hook to change the results content based on the text change
  useEffect(() => {
    handleTextChange(currentTextValue);
  }, [currentTextValue]);

  // Function to handle all the content search when typing new values on the search input
  const handleTextChange = value => {
    setLoading(true);
    handleCryptosSearch(categories, value);
    handleAnalysisSearch(analysisItems, value);
    handleNTSearch(narrativeTradingData, value);
  };

  const handleCryptosSearch = (categories, currentText) => {
    const found_cryptos = [];
    categories.forEach(category => {
      category.coin_bots.forEach(coin => {
        if (
          coin.bot_name.toLowerCase().includes(currentText.toLowerCase()) ||
          findCoinNameBySymbol(coin.bot_name.toUpperCase())
            .toLowerCase()
            .includes(currentText.toLowerCase())
        ) {
          const result_coin = {
            coin: coin,
            category: category,
          };
          found_cryptos.push(result_coin);
        }
      });
    });
    found_cryptos && found_cryptos !== undefined
      ? setCryptoSearchResult(found_cryptos)
      : setCryptoSearchResult([]);
  };

  const handleAnalysisSearch = (analysis, currentText) => {
    const found_analysis = [];
    analysis.forEach(item => {
      if (
        item.coin_bot_name.toLowerCase().includes(currentText.toLowerCase()) ||
        findCoinNameBySymbol(item.coin_bot_name.toUpperCase())
          .toLowerCase()
          .includes(currentText.toLowerCase())
      ) {
        found_analysis.push(item);
      }
    });
    found_analysis && found_analysis !== undefined
      ? setAnalysisSearchResult(found_analysis)
      : setAnalysisSearchResult([]);
  };

  const handleNTSearch = (narrativeTradings, currentText) => {
    const found_narrative_tradings = [];
    narrativeTradings.forEach(item => {
      if (
        item.coin_bot_name.toLowerCase().includes(currentText.toLowerCase()) ||
        findCoinNameBySymbol(item.coin_bot_name.toUpperCase())
          .toLowerCase()
          .includes(currentText.toLowerCase())
      ) {
        found_narrative_tradings.push(item);
      }
    });
    found_narrative_tradings && found_narrative_tradings !== undefined
      ? setNtSearchResult(found_narrative_tradings)
      : setNtSearchResult([]);
    setLoading(false);
  };

  const handleCryptoItemNavigation = (category, coin) => {
    const coinBotName = coin.bot_name;
    console.log('Coin:', coin);
    setCryptoSearchResult([]);
    setAnalysisSearchResult([]);
    setNtSearchResult([]);
    dispatch(updateActiveCoin(category));
    dispatch(updateActiveSubCoin(coinBotName));
    navigation.navigate('Home', {
      screen: 'TopMenuScreen',
      params: {
        screen: 'SubMenuScreen',
        params: {
          screen: 'Fundamentals',
        },
      },
    });
  };

  const handleAnalysisNavigation = analysisItem => {
    dispatch(updateActiveCoin({}));
    dispatch(updateActiveSubCoin(null));
    navigation.navigate('Home', {
      screen: 'DailyDeepScreen',
      params: {
        analysis_content: analysisItem.raw_analysis,
        analysis_id: analysisItem.id,
        date: analysisItem.created_at,
        isHistoryArticle: false,
      },
    });
  };

  const handleNarrativeTradingsNavigation = narrativeTrading => {
    dispatch(updateActiveCoin({}));
    dispatch(updateActiveSubCoin(null));
    navigation.navigate('Home', {
      screen: 'MarketNarrativeArticleScreen',
      params: {
        item_content: narrativeTrading.content,
        id: narrativeTrading.id,
        date: narrativeTrading.created_at,
        isNavigateFromHome: false,
      },
    });
  };

  const handleSubtitleNavigation = (sectionName, options) => {
    navigation.navigate(sectionName, options);
  };

  return contentVisible ? (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View style={styles.titleContainer}>
        <Text style={[styles.searchSubTitle, styles.inactiveSubtitle]}>
          Cryptocurrencies
        </Text>
        <View style={styles.horizontalLine} />
      </View>
      <View style={[styles.cryptoSearch, {marginTop: 0}]}>
        {loading ? (
          <SkeletonLoader type="search" quantity={6} />
        ) : (
          cryptoSearchResult &&
          cryptoSearchResult.length > 0 &&
          cryptoSearchResult.map((crypto, index) => (
            <SearchCryptoItem
              key={crypto.coin.bot_id}
              crypto={crypto.coin}
              category={crypto.category}
              styles={styles}
              handleCryptoItemNavigation={handleCryptoItemNavigation}
              isDarkMode={isDarkMode}
              isLastItem={index === cryptoSearchResult.length - 1}
            />
          ))
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={styles.searchSubTitle}
          onPress={() =>
            handleSubtitleNavigation('Analysis', {
              screen: 'History',
              params: {},
            })
          }>
          Analysis
        </Text>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.cryptoSearch}>
        {loading ? (
          <SkeletonLoader type="search" quantity={5} />
        ) : (
          analysisSearchResult &&
          analysisSearchResult.length > 0 &&
          analysisSearchResult.map((item, index) => (
            <SearchAnalysisItem
              key={index}
              analysis={item}
              styles={styles}
              isLastItem={index === analysisSearchResult.length - 1}
              handleAnalysisNavigation={handleAnalysisNavigation}
            />
          ))
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={styles.searchSubTitle}
          onPress={() =>
            handleSubtitleNavigation('Analysis', {
              screen: 'NarrativeTrading',
              params: {},
            })
          }>
          Narrative Tradings
        </Text>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.cryptoSearch}>
        {loading ? (
          <SkeletonLoader type="search" quantity={5} />
        ) : (
          ntSearchResult &&
          ntSearchResult.length > 0 &&
          ntSearchResult.map((item, index) => (
            <SearchNTItem
              styles={styles}
              item={item}
              key={index}
              handleNarrativeTradingsNavigation={
                handleNarrativeTradingsNavigation
              }
              isLastItem={index === ntSearchResult.length - 1}
            />
          ))
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={styles.searchSubTitle}
          onPress={() => handleSubtitleNavigation('Alerts', {})}>
          Alerts
        </Text>
        <View style={styles.horizontalLine} />
      </View>
      <SearchAlertSection currentText={currentTextValue} />
    </ScrollView>
  ) : (
    <></>
  );
};

export default Search;
