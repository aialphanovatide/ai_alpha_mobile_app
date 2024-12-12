import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getServiceV2} from '../services/aiAlphaApi';

// Static data for mapping the server's response keys to the display titles and value types to format the data correctly in the results component.
const KEY_DISPLAY_TITLES = [
  {key: 'ath', displayName: 'ATH', valueType: 'price'},
  {
    key: 'ath_change_percentage',
    displayName: 'ATH % Change',
    valueType: 'percentage',
  },
  {key: 'categories', displayName: 'Categories', valueType: 'array'},
  {key: 'chains', displayName: 'Chains', valueType: 'array'},
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

// Function to format the data coming from the updated ASK AI Alpha endpoint

const formatData = (data, searchValue) => {
  const formattedData = [];
  Object.entries(data).forEach(([key, value]) => {
    const configurationMappedKey =
      KEY_DISPLAY_TITLES.find(item => item.key === key) || null;
    formattedData.push({
      title: key,
      data: value,
      displayName: configurationMappedKey?.displayName || '',
      valueType: configurationMappedKey?.valueType,
    });
  });
  const filteredResultArray = formattedData.filter(datum =>
    FILTER_KEYS.includes(datum.title),
  );

  const sortedResultArray = filteredResultArray.sort((a, b) => {
    return FILTER_KEYS.indexOf(a.title) - FILTER_KEYS.indexOf(b.title);
  });
  return {
    name: searchValue.name,
    id: searchValue.id,
    symbol: searchValue.symbol,
    content: sortedResultArray,
    logo: data.logo ? data.logo : '',
  };
};

export const fetchAvailableCoins = createAsyncThunk(
  'askAi/fetchAvailableCoins',
  async () => {
    const loadedData = await AsyncStorage.getItem('availableCoins');
    if (loadedData) {
      return JSON.parse(loadedData);
    }

    const data = await getServiceV2('ask-ai/coins');
    if (data.success !== true) {
      return [];
    }
    // Save the available coins in the Redux store

    await AsyncStorage.setItem('availableCoins', JSON.stringify(data.coins));

    return data.coins;
  },
  {
    condition: (_, thunkApi) => {
      const availableCoins = thunkApi.getState().askAi.availableCoins;
      if (availableCoins.length > 0) {
        return false;
      }
    },
  },
);

export const fetchAskAiData = createAsyncThunk(
  'askAi/fetchAskAiData',
  async (searchValue, thunkApi) => {
    try {
      const savedResults = thunkApi.getState().askAi.savedResults;

      const existingResult = savedResults.find(
        item => item.name.toLowerCase() === searchValue.name.toLowerCase(),
      );

      if (existingResult) {
        return {result: existingResult};
      } else {
        const data = await getServiceV2(`ask-ai?coin_id=${searchValue.id}`);

        if (data.success !== true) {
          throw new Error(data.error);
        }

        const formattedData = formatData(data.data, searchValue);

        // Save the new data in the AsyncStorage
        thunkApi.dispatch(saveAskAiData(formattedData));

        return {
          result: formattedData,
        };
      }
    } catch (error) {
      console.error('Error trying to fetch the ASK AI data: ', error);
    }
  },
);

// Asynchronous action for loading the ASK AI data from the AsyncStorage
export const loadAskAiData = createAsyncThunk(
  'askAi/loadAskAiData',
  async () => {
    try {
      const loadedData = await AsyncStorage.getItem('askAiData');
      return loadedData ? JSON.parse(loadedData) : [];
    } catch (error) {
      console.error('Error trying to load the ASK AI data: ', error);
      return [];
    }
  },
  {
    condition: (_, thunkApi) => {
      const savedResults = thunkApi.getState().askAi.savedResults;
      if (savedResults.length > 0) {
        return false;
      }
    },
  },
);

// Asynchronous action for saving the ASK AI data to the AsyncStorage
export const saveAskAiData = createAsyncThunk(
  'askAi/saveAskAiData',
  async (newData, thunkApi) => {
    try {
      const savedResults = thunkApi.getState().askAi.savedResults;
      const currentResults = [...savedResults];
      const repeatedDataIndex = currentResults.findIndex(
        saved => saved.name === newData.name,
      );

      if (repeatedDataIndex !== -1) {
        currentResults.splice(repeatedDataIndex, 1);
      }
      const newSavedResults = [...currentResults, newData];
      await AsyncStorage.setItem('askAiData', JSON.stringify(newSavedResults));
      return newSavedResults;
    } catch (error) {
      console.error('Error trying to save the ASK AI data: ', error);
      return [];
    }
  },
);

// Selectors
export const selectSavedResults = state => state.askAi.savedResults;
export const selectCurrentResult = state => state.askAi.currentResult;
export const selectAskAiLoading = state => state.askAi.loading;
export const selectAvailableCoins = state => state.askAi.availableCoins;
