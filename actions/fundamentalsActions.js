import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getServiceV2} from '../services/aiAlphaApi';

// Asynchronous thunk to fetch fundamentals data for a specific coin, and store it in AsyncStorage
export const fetchFundamentalsData = createAsyncThunk(
  'fundamentals/fetchFundamentalsData',
  async (coin, thunkApi) => {
    try {
      // Get the categories state from the redux store
      const categories = thunkApi.getState().categories.categories;

      const coinId = categories.find(
        category =>
          category.coin_bots.find(coinBot => coinBot.bot_name === coin) !==
          undefined,
      ).coin_bots.find(coinBot => coinBot.bot_name === coin).bot_id;
      // console.log('Found coin id: ', coinId);

      const storedFundamentalsData = await AsyncStorage.getItem(
        'fundamentalsData',
      );
      const storedFundamentalsParsedData = JSON.parse(storedFundamentalsData);
      // Check if the data is already stored in AsyncStorage
      if (
        storedFundamentalsParsedData !== null &&
        storedFundamentalsParsedData.find(item => item.coin === coin) !==
          undefined
      ) {
        const coinFundamentalsData = storedFundamentalsParsedData.find(
          item => item.coin === coin,
        );
        console.log(
          '- Successfully loaded fundamentals data from AsyncStorage',
        );
        return coinFundamentalsData.data;
      } else {
        // If the data isn't stored, fetch it from the servers API
        const endpoints = [
          {
            name: 'competitors',
            url: `api/get_competitors_by_coin_name?coin_name=${coin}`,
          },
          {name: 'tokenomics', url: `/api/get_tokenomics?coin_name=${coin}`},
          {
            name: 'introduction',
            url: `introduction/${coinId || 1}`,
          },
          {
            name: 'revenueModels',
            url: `revenue_model/${coinId || 1}`,
          },
          {name: 'hacks', url: `api/hacks?coin_bot_name=${coin}`},
          {name: 'upgrades', url: `api/get_upgrades?coin_name=${coin}`},
          {name: 'dapps', url: `api/dapps?coin_bot_name=${coin}`},
        ];

        const results = await Promise.all(
          endpoints.map(endpoint => getServiceV2(endpoint.url)),
        );

        const data = {
          competitors: results[0],
          tokenomics: results[1],
          introduction: results[2],
          revenueModels: results[3],
          hacks: results[4],
          upgrades: results[5],
          dapps: results[6],
        };
        // Save the fetched data in AsyncStorage
        const prevData = await AsyncStorage.getItem('fundamentalsData');
        const parsedPrevData = JSON.parse(prevData) || [];
        const mappedData = [...parsedPrevData, {coin, data}];
        await AsyncStorage.setItem(
          'fundamentalsData',
          JSON.stringify(mappedData),
        );
        console.log(
          '- Successfully fetched the fundamentals data from the server',
        );
        return data;
      }
    } catch (error) {
      console.error(`Error fetching crypto data: ${error.message}`);
      return error.message;
    }
  },
  {
    condition: (coin, thunkApi) => {
      const loading = thunkApi.getState().fundamentals.globalLoading;
      const lastCoin = thunkApi.getState().fundamentals.lastCoin;
      if (
        (loading === 'succeeded' || loading === 'failed') &&
        lastCoin === coin
      ) {
        return false;
      }

      return true;
    },
  },
);

export const selectFundamentalsData = state =>
  state.fundamentals.fundamentalsData;
export const selectGlobalLoading = state => state.fundamentals.globalLoading;
