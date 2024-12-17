import {createAsyncThunk} from '@reduxjs/toolkit';
import {postServiceV2} from '../services/aiAlphaApi';

// Async thunk for getting alerts filtered by the active coin
export const fetchAlertsByCoin = createAsyncThunk(
  'alerts/fetchAlertsByCoin',
  async ({coins, timeInterval}, {rejectWithValue}) => {
    try {
      const body = {
        coins: [coins],
        page: 1,
        per_page: 30,
        timeframe: timeInterval,
      };
      const response = await postServiceV2(`alerts/coins`, body);
      // console.log(`Response for the value ${coins}:`, response);
      if (!response || !response?.coins) {
        return [];
      }
      const mappedAlerts = Object.values(response.coins).flatMap(
        coin => coin.data,
      );
      return mappedAlerts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for getting alerts by the suscribed categories
export const fetchAlertsBySubscriptions = createAsyncThunk(
  'alerts/fetchAlertsBySubscriptions',
  async ({subscribedCategories, timeInterval}, {rejectWithValue}) => {
    try {
      const categories = subscribedCategories.map(
        category => category.category,
      );
      const body = {
        categories,
        page: 1,
        per_page: 30,
        timeframe: timeInterval,
      };
      const response = await postServiceV2('/alerts/categories', body);
      console.log('Response from fetchAlertsBySubscriptions:', response);

      if (!response || Object.keys(response).length === 0) {
        return [];
      }

      // return mappedAlerts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for getting the alers of all the categories of the app
export const fetchAlertsByAllCategories = createAsyncThunk(
  'alerts/fetchAlertsByAllCategories',
  async ({timeInterval}, {rejectWithValue}) => {
    try {
      const body = {
        categories: [
          'bitcoin',
          'ethereum',
          'lsd',
          'rootlink',
          'baseblock',
          'corechain',
          'boostlayer',
          'truthnodes',
          'x payments',
          'cycleswap',
          'nextrade',
          'diversefi',
          'intellichain',
        ],
        page: 1,
        per_page: 30,
        timeframe: timeInterval,
      };
      const response = await postServiceV2(`alerts/categories`, body);
      if (!response || Object.keys(response).length === 0) {
        return [];
      }
      const mappedAlerts = Object.values(response.categories).flatMap(
        category => category.data,
      );
      return mappedAlerts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  // {
  //   condition: (_, thunkApi) => {
  //     const currentAlerts = thunkApi.getState().alerts.alerts;
  //     const loading = thunkApi.getState().alerts.loading;
  //     if (
  //       loading === 'idle' ||
  //       (loading === 'failed' && currentAlerts.length === 0)
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  // },
);

export const selectAlerts = state => state.alerts.alerts;

export const selectAlertsByCoin = state => state.alerts.alertsByCoin;

export const selectAlertsLoading = state => state.alerts.loading;

export const selectMatchingAlerts = (state, {search}) => {
  const alerts = state.alerts.alerts;
  return alerts.filter(alert => alert.symbol.includes(search));
};
