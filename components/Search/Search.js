import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import useSearchStyles from './SearchStyles';
import FastImage from 'react-native-fast-image';
import {
  findCoinMatch,
  findCoinNameBySymbol,
} from '../Home/Topmenu/subMenu/Fund_news_chart/Fundamentals/SubSections/Competitors/coinsNames';
import {useNavigation} from '@react-navigation/core';
import {TopMenuContext} from '../../context/topMenuContext';
import {AnalysisContext} from '../../context/AnalysisContext';
import {CategoriesContext} from '../../context/categoriesContext';
import {useIsFocused} from '@react-navigation/native';
import AlertDetails from '../Alerts/AlertsDetails';
import {getService} from '../../services/aiAlphaApi';
import useAlertsStyles from '../Alerts/styles';

const SearchCryptoItem = ({
  crypto,
  category,
  styles,
  handleCryptoItemNavigation,
  isDarkMode,
}) => {
  const name = findCoinNameBySymbol(crypto.bot_name.toUpperCase());
  return (
    <TouchableOpacity
      onPress={() => handleCryptoItemNavigation(category, crypto)}
      style={styles.cryptoItem}>
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

const SearchAnalysisItem = ({analysis, handleAnalysisNavigation, styles}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <TouchableOpacity
      onPress={() => handleAnalysisNavigation(analysis)}
      style={styles.analysisItem}>
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
        <Text style={styles.analysisTitle} numberOfLines={2}>
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

const SearchAlertSection = ({currentText}) => {
  const [foundAlerts, setFoundAlerts] = useState([]);
  const styles = useSearchStyles();
  const alertsStyles = useAlertsStyles();
  // console.log(match);

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
      {foundAlerts &&
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
        ))}
    </View>
  );
};

const Search = ({route}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useSearchStyles();
  const {categories} = useContext(CategoriesContext);
  const {analysisItems} = useContext(AnalysisContext);
  const [searchText, setSearchText] = useState('');
  const [cryptoSearchResult, setCryptoSearchResult] = useState([]);
  const [analysisSearchResult, setAnalysisSearchResult] = useState([]);
  const {theme} = useContext(AppThemeContext);
  const {updateActiveCoin, updateActiveSubCoin} = useContext(TopMenuContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setSearchText('');
      setAnalysisSearchResult([]);
      setCryptoSearchResult([]);
    }
  }, [isFocused]);

  const handleTextChange = value => {
    setSearchText(value);
    handleCryptosSearch(categories, value);
    handleAnalysisSearch(analysisItems, value);
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
    // console.log('Found cryptos: ', found_cryptos);
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

  const handleCryptoItemNavigation = (category, coin) => {
    setCryptoSearchResult([]);
    setAnalysisSearchResult([]);
    updateActiveCoin(category);
    updateActiveSubCoin(coin.coin_bot_name);
    navigation.navigate('Home', {
      screen: 'TopMenuScreen',
      params: {
        screen: 'SubMenuScreen',
        params: {
          screen: 'Charts',
          params: {
            interval: '1h',
            symbol: `${category.coin_bots[0].bot_name}USDT`,
            coinBot: category.coin_bots[0].bot_name,
          },
        },
      },
    });
  };

  const handleAnalysisNavigation = analysisItem => {
    updateActiveCoin({});
    updateActiveSubCoin(null);
    navigation.navigate('Home', {
      screen: 'AnalysisArticleScreen',
      params: {
        analysis_content: analysisItem.raw_analysis,
        analysis_id: analysisItem.id,
        date: analysisItem.created_at,
        isHistoryArticle: false,
      },
    });
  };

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={styles.flex}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.textInputContainer}>
          <Image
            source={require('../../assets/images/home/search_icon.png')}
            style={[searchText !== '' ? styles.none : styles.magnifierIcon]}
            resizeMode="contain"
            fadeDuration={100}
          />
          <TextInput
            style={[styles.searchInput, searchText !== '' && {paddingLeft: 12}]}
            value={searchText}
            onChangeText={text => handleTextChange(text)}
            placeholder="Search AI Alpha"
            placeholderTextColor={theme.secondaryTextColor}
          />
        </View>
        {searchText && (
          <ScrollView style={styles.searchContainer} nestedScrollEnabled>
            <View style={styles.titleContainer}>
              <Text style={styles.searchSubTitle}>Cryptocurrencies</Text>
              <View style={styles.horizontalLine} />
            </View>
            <ScrollView style={styles.cryptoSearch} nestedScrollEnabled>
              {cryptoSearchResult &&
                cryptoSearchResult.length > 0 &&
                cryptoSearchResult.map(crypto => (
                  <SearchCryptoItem
                    key={crypto.coin.bot_id}
                    crypto={crypto.coin}
                    category={crypto.category}
                    styles={styles}
                    handleCryptoItemNavigation={handleCryptoItemNavigation}
                    isDarkMode={isDarkMode}
                  />
                ))}
            </ScrollView>
            <View style={styles.titleContainer}>
              <Text style={styles.searchSubTitle}>Analysis</Text>
              <View style={styles.horizontalLine} />
            </View>
            <ScrollView style={styles.cryptoSearch} nestedScrollEnabled>
              {analysisSearchResult &&
                analysisSearchResult.length > 0 &&
                analysisSearchResult.map((item, index) => (
                  <SearchAnalysisItem
                    key={index}
                    analysis={item}
                    styles={styles}
                    handleAnalysisNavigation={handleAnalysisNavigation}
                  />
                ))}
            </ScrollView>
            <View style={styles.titleContainer}>
              <Text style={styles.searchSubTitle}>Narrative Tradings</Text>
              <View style={styles.horizontalLine} />
            </View>
            <View style={styles.cryptoSearch}></View>
            <View style={styles.titleContainer}>
              <Text style={styles.searchSubTitle}>Alerts</Text>
              <View style={styles.horizontalLine} />
            </View>
            <SearchAlertSection currentText={searchText} />
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Search;
