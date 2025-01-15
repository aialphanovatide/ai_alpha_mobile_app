import {createAsyncThunk} from '@reduxjs/toolkit';
import {getService, getServiceV2} from '../services/aiAlphaApi';

// Async thunk to get the categories from the API, using the old server endpoint
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, {rejectWithValue}) => {
    try {
      const data = await getService('/get_categories');
      return data.categories.filter(
        category => category.category.toLowerCase() !== 'metals',
      );
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) =>
      thunkApi.getState().categories.loading === 'idle',
  },
);

// Async thunk for getting the categories from the API, using the new server endpoint
export const fetchCategoriesV2 = createAsyncThunk(
  'categories/fetchCategoriesV2',
  async (_, {rejectWithValue}) => {
    try {
      const data = await getServiceV2('/categories');
      const filteredCategories = data.categories.filter(
        category =>
          category.name.toLowerCase() !== 'metals' &&
          category.name.toLowerCase() !== 'hacks',
      );
      return filteredCategories.map(category => ({
        borderColor: category.border_color,
        category: category.name.toLowerCase(),
        category_id: category.category_id,
        category_name: category.name,
        alias: category.alias,
        is_active: category.is_active,
        icon: category.icon,
        coin_bots: category.coins
          .map(coin => {
            if (
              ['', 'tao', 'dxy', 'gold', 'sp500', 'total3'].includes(
                coin.name.toLowerCase(),
              )
            ) {
              return null;
            } else {
              return {
                bot_id: coin.bot_id,
                bot_name: coin.name,
                image: coin.icon,
                is_active: coin.is_active,
                symbol:
                  coin.symbol !== '' ? coin.symbol : coin.name.toUpperCase(),
              };
            }
          })
          .filter(coin => coin !== null),
      }));
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) =>
      thunkApi.getState().categories.loading === 'idle',
  },
);

export const selectCategories = state => state.categories.categories;
export const selectCategoriesLoading = state => state.categories.loading;
export const selectActiveCoin = state => state.categories.activeCoin;
export const selectActiveSubCoin = state => state.categories.activeSubCoin;
