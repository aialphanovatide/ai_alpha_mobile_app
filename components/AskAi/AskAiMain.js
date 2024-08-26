import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import useAskAiStyles from './AskAiStyles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoader from '../Loader/SkeletonLoader';
import {AboutIcon} from '../Home/Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon';
import AboutModal from '../Home/Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutModal';
import {AboutModalContext} from '../../context/AboutModalContext';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Function to combine the multiple responses coming from the ASK AI Alpha endpoint, to handle them more easily in one object.
const combineResponses = (response, searchedValue) => {
  const FILTER_KEYS = [
    'name',
    'website',
    'whitepaper',
    'categories',
    'chains',
    'current_price',
    'market_cap_usd',
    'ath',
    'ath_change_percentage',
    'percentage_circulating_supply',
    'fully_diluted_valuation',
  ];
  const KEY_DISPLAY_TITLES = [
    {key: 'ath', displayName: 'ATH', valueType: 'price'},
    {
      key: 'ath_change_percentage',
      displayName: 'ATH % Change',
      valueType: 'percentage',
    },
    {key: 'categories', displayName: 'Categories', valueType: ''},
    {key: 'chains', displayName: 'Chains', valueType: ''},
    {
      key: 'percentage_circulating_supply',
      displayName: 'Circulating Supply %',
      valueType: 'percentage',
    },
    {
      key: 'current_price',
      displayName: 'Current Price (USD)',
      valueType: 'price',
    },
    {
      key: 'fully_diluted_valuation',
      displayName: 'Fully Diluted Valuation',
      valueType: 'price',
    },
    {key: 'market_cap_usd', displayName: 'Market Cap USD', valueType: 'price'},
    {key: 'website', displayName: 'Website', valueType: ''},
    {key: 'whitepaper', displayName: 'Whitepaper', valueType: ''},
    {key: 'name', displayName: 'Token Name', valueType: ''},
  ];
  const combinedResult = {};
  let name = '';

  Object.values(response).forEach(res => {
    if (Array.isArray(res)) {
      res.forEach((item, index) => {
        combinedResult[`dextool_${index}`] = item;
      });
    } else if (res.success === true) {
      Object.assign(combinedResult, res);
    }
  });

  const resultArray = Object.keys(combinedResult).map(key => {
    if (key === 'name' || key === 'symbol') {
      name = combinedResult[key];
    }

    const configurationMappedKey =
      KEY_DISPLAY_TITLES.find(item => item.key === key) || null;

    return {
      title: key,
      data: combinedResult[key],
      displayName: configurationMappedKey?.displayName || '',
      valueType: configurationMappedKey?.valueType,
    };
  });

  const filteredResultArray = resultArray.filter(datum =>
    FILTER_KEYS.includes(datum.title),
  );

  const sortedResultArray = filteredResultArray.sort((a, b) => {
    return FILTER_KEYS.indexOf(a.title) - FILTER_KEYS.indexOf(b.title);
  });

  return {
    name: name || searchedValue,
    content: sortedResultArray,
    logo: combinedResult.logo ? combinedResult.logo : '',
  };
};

// Component that renders each item of the content and data fetched, displaying a title with the box including the data itself.

const ValueBox = ({title, content, valueType}) => {
  const styles = useAskAiStyles();

  const formatContentByValueType = content => {
    switch (valueType) {
      case 'price':
        let numStr = content.toString();

        if (numStr.includes('e')) {
          numStr = parseFloat(content).toFixed(
            Math.max(
              0,
              (numStr.split('e')[0].split('.')[1] || '').length -
                (parseInt(numStr.split('e')[1]) || 0),
            ),
          );
        }

        let [integerPart, decimalPart] = numStr.split('.');
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return decimalPart
          ? `${integerPart}.${decimalPart} USD`
          : `${integerPart} USD`;
      case 'percentage':
        const numericContent = parseFloat(content);
        return `${numericContent.toFixed(2)}%`;
      case 'symbol':
        return `${
          content.slice(0, 1).toUpperCase() + content.slice(1, content.length)
        }`;
      default:
        return content;
    }
  };

  return (
    <View style={styles.valueBoxContainer}>
      <Text style={styles.boxTitle}>{title}</Text>
      <Text style={styles.content}>
        {formatContentByValueType(content.replace(/"/g, ''))}
      </Text>
    </View>
  );
};

// Component of the input that the user will use to pass the text values of the search

const Input = ({
  textHandler,
  textValue,
  loading,
  handleButtonSearch,
  handleSectionNavigation,
}) => {
  const styles = useAskAiStyles();
  return (
    <View style={{width: '100%'}}>
      <View style={[styles.row, {position: 'relative', width: '100%'}]}>
        <Text style={styles.inputText}>Token Name</Text>
        <TouchableOpacity
          style={styles.historyButtonWrapper}
          onPress={() => handleSectionNavigation()}>
          <Image
            style={styles.historyButton}
            source={require('../../assets/images/askAi/history.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.searchInput}
            onChangeText={text => textHandler(text)}
            value={textValue}
          />
          <Text
            style={[
              styles.placeholderText,
              textValue !== '' ? {opacity: 0} : {},
            ]}>
            E.g: SOIL
          </Text>
        </View>
        <TouchableOpacity
          disabled={loading}
          style={[styles.searchButton, loading ? styles.disabledButton : {}]}
          onPress={() => handleButtonSearch(textValue)}>
          <Image
            styles={styles.searchButtonImage}
            source={require('../../assets/images/askAi/search_button.png')}
            width={18}
            height={18}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main component for all the section's features

const AskAiMain = ({route, navigation}) => {
  const selectedResult =
    route.params && route.params.selectedResult !== undefined
      ? route.params.selectedResult
      : null;
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useAskAiStyles();
  const [searchText, setSearchText] = useState('');
  const [resultData, setResultData] = useState(selectedResult);
  const [savedResults, setSavedResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    aboutVisible,
    aboutTitle,
    aboutDescription,
    handleAboutPress,
    handleClose,
  } = useContext(AboutModalContext);

  //  Hook to reset the search value state on every rendering

  useEffect(() => {
    setSearchText('');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setResultData(selectedResult);
  }, [selectedResult]);

  // Function to save the results data in the AsyncStorage API to persist them between app executions

  const saveAskAiData = async (newData, currentResults) => {
    try {
      let newSavedResults = [];
      const repeatedDataIndex = currentResults.findIndex(
        saved => saved.name === newData.name,
      );
      if (repeatedDataIndex !== -1) {
        currentResults.splice(repeatedDataIndex, 1);
      }
      newSavedResults = [...currentResults, newData];
      setSavedResults(newSavedResults);
      await AsyncStorage.setItem('askAiData', JSON.stringify(newSavedResults));
    } catch (error) {
      console.error('Error trying to persist the ask ai data: ', error);
    }
  };
  // Function to save the text within the input

  const handleTextChange = text => {
    setSearchText(text);
  };

  // Function to handle the ASK AI alpha switching between the History section and the Results section

  const handleSectionNavigation = () => {
    navigation.navigate('AskAiHistory');
  };

  // Function to make the request to the endpoint by triggering the search button, passing the values of the text input as parameter to get the corresponding data from the server

  const handleButtonSearch = searchValue => {
    setLoading(true);
    const fetchAskAiData = async searchValue => {
      try {
        const loadedData = await AsyncStorage.getItem('askAiData');
        let parsedData = [];
        if (loadedData) {
          parsedData = JSON.parse(loadedData);
        }

        const existingResult = parsedData.find(
          item => item.name.toLowerCase() === searchValue.toLowerCase(),
        );

        if (existingResult) {
          setResultData(existingResult);
          return;
        } else {
          const response = await fetch(
            `https://fsxbdb84-5000.uks1.devtunnels.ms/ask/ai?token_name=${searchValue.replace(
              /\s/g,
              '-',
            )}`,
            {method: 'POST'},
          );
          const data = await response.json();
          const formattedData = combineResponses(
            data.response.response,
            searchValue,
          );
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setResultData(formattedData);
          saveAskAiData(formattedData, savedResults);
        }
      } catch (error) {
        console.error('Error trying to get ASK AI Alpha data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAskAiData(searchValue);
  };

  // Function to close the results pop-up, resetting the results data and hiding the content.

  const handleResultsClose = () => {
    setResultData(null);
  };

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
      locations={[0.22, 0.97]}
      style={styles.flex}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={[
            styles.searchContainer,
            Platform.OS === 'ios' ? {paddingHorizontal: 12} : {},
          ]}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>ASK AI Alpha</Text>
            <AboutIcon
              title={'ASK AI Alpha'}
              description={'This is the ASK AI Alpha section description.'}
              handleAboutPress={handleAboutPress}
              additionalStyles={{top: '52.5%'}}
            />
          </View>
          <Input
            textHandler={handleTextChange}
            textValue={searchText}
            handleButtonSearch={handleButtonSearch}
            handleSectionNavigation={handleSectionNavigation}
          />
          {loading ? (
            <SkeletonLoader type="askAi" quantity={8} />
          ) : (
            <View
              style={[
                styles.resultsContainer,
                !resultData ? styles.hidden : {},
              ]}>
              {!loading && resultData && resultData !== undefined ? (
                <>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => handleResultsClose()}>
                    <Image
                      source={require('../../assets/images/askAi/close_button.png')}
                      style={styles.closeButtonImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View style={styles.row}>
                    <View style={styles.imageBackground}>
                      <FastImage
                        source={{
                          uri:
                            resultData && resultData !== undefined
                              ? resultData.logo
                              : '',
                        }}
                        resizeMode={'contain'}
                        style={styles.iconImage}
                      />
                    </View>
                    <Text style={styles.coinName}>{resultData.name}</Text>
                  </View>
                  <View>
                    {resultData.content.map((datum, index) => {
                      if (datum.data === null || datum.title === 'success') {
                        return;
                      } else {
                        return (
                          <ValueBox
                            key={index}
                            title={datum.displayName}
                            content={JSON.stringify(datum.data)}
                            valueType={datum.valueType}
                          />
                        );
                      }
                    })}
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
          )}
        </ScrollView>
        <AboutModal
          visible={aboutVisible}
          description={aboutDescription}
          title={aboutTitle}
          onClose={handleClose}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AskAiMain;
