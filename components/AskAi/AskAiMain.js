import React, {useContext, useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import useAskAiStyles from './AskAiStyles';
import FastImage from 'react-native-fast-image';
import AskAiHistory from './AskAiHistory/AskAiHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoader from '../Loader/SkeletonLoader';

// Function to combine the multiple responses coming from the ASK AI Alpha endpoint, to handle them more easily in one object.
const combineResponses = (response, searchedValue) => {
  const FILTER_KEYS = [
    // 'symbol',
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
    // 'max_supply',
    // 'circulating_supply',
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
    // {
    //   key: 'circulating_supply',
    //   displayName: 'Circulating Supply',
    //   valueType: 'price',
    // },
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
    // {key: 'symbol', displayName: 'Symbol', valueType: 'symbol'},
    {key: 'market_cap_usd', displayName: 'Market Cap USD', valueType: 'price'},
    // {key: 'max_supply', displayName: 'Max Supply', valueType: 'price'},
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

// Component that renders the menu of 'Results' and 'History' allowing to switch between the ASK AI section's content

const AskMenu = ({options, activeOption, handleOptionChange}) => {
  const styles = useAskAiStyles();
  return (
    <View style={styles.menuContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.menuButton,
            activeOption.name === option.name && styles.activeButton,
          ]}
          onPress={() => handleOptionChange(option)}>
          <Text
            style={[
              styles.menuText,
              activeOption.name === option.name && styles.activeText,
            ]}>
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Component of the input that the user will use to pass the text values of the search

const Input = ({textHandler, textValue}) => {
  const styles = useAskAiStyles();
  return (
    <View>
      <Text style={styles.inputText}>Token Name</Text>
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
    </View>
  );
};

// Main component for all the section's features

const AskAiMain = () => {
  const {isDarkMode} = useContext(AppThemeContext);
  const styles = useAskAiStyles();
  const [searchText, setSearchText] = useState('');
  const options = [
    {
      name: 'Results',
    },
    {
      name: 'History',
    },
  ];
  const [activeOption, setActiveOption] = useState(options[0]);
  const [resultData, setResultData] = useState(null);
  const [savedResults, setSavedResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const historyOptions = [
    {
      name: 'All',
    },
    {
      name: 'Gaming',
    },
    {
      name: 'Defi',
    },
    {
      name: 'LSDs',
    },
    {
      name: 'Standard',
    },
  ];
  const [activeHistoryOption, setActiveHistoryOption] = useState(
    historyOptions[0],
  );
  // Hook to load the saved data on every rendering of the section

  useEffect(() => {
    const loadAskAiData = async () => {
      try {
        const loadedData = await AsyncStorage.getItem('askAiData');
        if (loadedData) {
          const parsedData = JSON.parse(loadedData);
          setSavedResults(parsedData.reverse());
          if (filteredResults.length === 0) {
            setFilteredResults(parsedData);
          }
        }
      } catch (error) {
        console.error("There's no saved data for ASK AI Alpha section.");
      }
    };

    loadAskAiData();
  }, []);

  //  Hook to reset the search value state on every rendering

  useEffect(() => {
    setSearchText('');
    setActiveOption(options[0]);
    setActiveHistoryOption(historyOptions[0]);
  }, []);

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

  // Function to handle the ASK AI alpha menu options (switch between results and history)

  const handleOptionChange = item => {
    setActiveOption(item);
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

  // Function to handle the history section's active option change, filtering the coin searchs that are saved and loaded from the AsyncStorage to display them as items.

  const handleHistoryOption = option => {
    setActiveHistoryOption(option);
    filterHistoryItems(option.name, savedResults);
  };

  // Function to change the content rendered on the results section by selecting it from the history section, it searches the coin data on all the results saved and set it as the current result data

  const handleActiveResultData = data => {
    setResultData(data);
    setLoading(false);
  };

  // Function to clean the saved ASK AI section History data, removing all the items storaged on the user device's cache (Async Storage)

  const handleHistoryClean = () => {
    const cleanAsyncStorageData = async () => {
      try {
        await AsyncStorage.removeItem('askAiData');
        setSavedResults([]);
        setFilteredResults([]);
        setSearchText('');
        setResultData(null);
      } catch (error) {}
    };
    cleanAsyncStorageData();
  };

  // Function to filter the items on the ASK AI History section by the selected category.

  const filterHistoryItems = (option, items) => {
    const filtered_items = [];

    if (option.toLowerCase() === 'all') {
      setFilteredResults(items);
      return;
    }

    items.forEach(item => {
      const itemCategories = item?.content?.find(
        datum => datum.title.toLowerCase() === 'categories',
      );
      if (
        itemCategories &&
        itemCategories !== undefined &&
        itemCategories?.data &&
        itemCategories?.data?.length > 0 &&
        itemCategories?.data?.toLowerCase().match(option.toLowerCase())
      ) {
        filtered_items.push(item);
      }
    });
    setFilteredResults(filtered_items);
    return;
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
          <Text style={styles.title}>ASK AI Alpha</Text>
          <Input textHandler={handleTextChange} textValue={searchText} />
          <TouchableOpacity
            disabled={loading}
            style={[styles.searchButton, loading ? styles.disabledButton : {}]}
            onPress={() => handleButtonSearch(searchText)}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
          <AskMenu
            options={options}
            activeOption={activeOption}
            handleOptionChange={handleOptionChange}
          />
          {loading ? (
            <SkeletonLoader type="askAi" quantity={8} />
          ) : activeOption.name === 'Results' ? (
            <View style={[styles.resultsContainer]}>
              <View style={styles.row}>
                {!loading && resultData && resultData !== undefined ? (
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
                ) : (
                  <>
                    <View style={styles.emptyIcon} />
                    <View style={styles.emptyTitle} />
                  </>
                )}
              </View>
              {!loading && resultData && resultData !== undefined ? (
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
              ) : (
                <>
                  <View style={[styles.emptyTitle, styles.emptySecondTitle]} />
                  <View style={styles.emptyContent} />
                </>
              )}
            </View>
          ) : (
            <AskAiHistory
              options={historyOptions}
              activeHistoryOption={activeHistoryOption}
              coins={[resultData]}
              handleHistoryOption={handleHistoryOption}
              handleActiveResultData={handleActiveResultData}
              savedResults={filteredResults}
              handleHistoryClean={handleHistoryClean}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AskAiMain;
