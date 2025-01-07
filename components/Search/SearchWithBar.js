import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';
import useSearchStyles from './SearchStyles';
import {findCoinNameBySymbol} from '../Home/Topmenu/subMenu/Fund_news_chart/Fundamentals/SubSections/Competitors/coinsNames';
import {useNavigation} from '@react-navigation/core';
import SkeletonLoader from '../Loader/SkeletonLoader';
import SearchBar from './SearchBar/SearchBar';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {selectCategories} from '../../actions/categoriesActions';
import {selectDailyDeepDives} from '../../actions/dailyDeepDivesActions';
import {selectMarketNarratives} from '../../actions/marketNarrativesActions';
import {
  updateActiveCoin,
  updateActiveSubCoin,
} from '../../store/categoriesSlice';
import {SearchAlertSection} from './SearchAlerts/SearchAlertSection';
import {SearchNarrativeItem} from './SearchMarketNarratives/SearchNarrativeItem';
import {SearchArticleItem} from './SearchArticles/SearchArticleItem';
import {SearchCryptoItem} from './SearchCrypto/SearchCryptoItem';

// Component to render the search results with the search bar. It receives the toggleMenuVisible, toggleTextValue, and toggleSearchBar functions, the searchText data of the search input, and the activeSearchBar flag as props. It uses the SearchBar, SearchCryptoItem, SearchArticleItem, and SearchNarrativeItem components to render the search results.

const SearchWithBar = ({
  toggleMenuVisible,
  toggleTextValue,
  searchText,
  activeSearchBar,
  toggleSearchBar,
}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useSearchStyles();
  const categories = useSelector(selectCategories);
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
    handleTextChange(searchText);
  }, [searchText, handleTextChange]);

  // Function to handle all the content search when typing new values on the search input
  const handleTextChange = useCallback(
    value => {
      setLoading(true);
      handleCryptosSearch(categories, value);
      handleAnalysisSearch(analysisItems, value);
      handleNTSearch(narrativeTradingData, value);
    },
    [categories, analysisItems, narrativeTradingData],
  );

  // Function to filter the cryptocurrencies based on the search input

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

  // Function to filter the analysis articles (Deep dives, Macros, Spotlight, etc.) based on the search input

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

  // Function to filter the market narrative articles based on the search input

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

  // Function to handle the navigation to the selected cryptocurrency item, redirecting to the Home screen with the selected coin and category, displaying the Fundamentals section.

  const handleCryptoItemNavigation = (category, coin) => {
    const coinBotName = coin.bot_name;
    toggleMenuVisible(true);
    toggleTextValue('');
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

  // Function to handle the navigation to the selected analysis article, redirecting to the Home screen with the selected article.

  const handleAnalysisNavigation = analysisItem => {
    toggleMenuVisible(true);
    toggleTextValue('');
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

  // Function to handle the navigation to the selected market narrative article, redirecting to the Home screen.

  const handleNarrativeTradingsNavigation = narrativeTrading => {
    toggleMenuVisible(true);
    toggleTextValue('');
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

  // Function to handle the navigation to the selected section, by pressing the subtitle of each type of result.

  const handleSubtitleNavigation = (sectionName, options) => {
    navigation.navigate(sectionName, options);
  };

  const countTotalItems = (cryptos, analysis, narratives) => {
    const total =
      cryptos.length + 1 + (analysis.length + 1) + (narratives.length + 1);
    return total;
  };

  return (
    <View
      style={
        activeSearchBar && searchText.length > 0
          ? [
              styles.searchSection,
              countTotalItems(
                cryptoSearchResult,
                analysisSearchResult,
                ntSearchResult,
              ) > 30
                ? {height: '100%'}
                : {},
            ]
          : {}
      }>
      <SearchBar
        toggleMenuVisible={toggleMenuVisible}
        toggleTextValue={toggleTextValue}
        searchText={searchText}
        activeSearchBar={activeSearchBar}
        toggleSearchBar={toggleSearchBar}
      />
      {activeSearchBar && searchText.length > 0 ? (
        <ScrollView
          style={[styles.container, {height: '100%'}]}
          nestedScrollEnabled={true}>
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
                <SearchArticleItem
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
                <SearchNarrativeItem
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
          <SearchAlertSection currentText={searchText} loading={loading} />
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SearchWithBar;
