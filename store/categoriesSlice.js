import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
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
        is_active: category.is_active,
        icon: category.icon,
        coin_bots: category.coins.map(coin => ({
          bot_id: coin.bot_id,
          bot_name: coin.name,
          image: coin.icon,
          is_active: coin.is_active,
        })),
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

// Categories slice for the Redux store
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: 'idle',
    error: null,
  },
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
    findCategoryOfItem: (state, action) => {
      const {coin, fullName} = action.payload;
      const lowerCoin =
        coin.toLowerCase() === 'matic' ? 'pol' : coin.toLowerCase();
      return (
        state.categories.find(category =>
          category.coin_bots.some(bot =>
            [bot.bot_name.toLowerCase(), fullName.toLowerCase()].includes(
              lowerCoin,
            ),
          ),
        ) || null
      );
    },
    findCoinBotByBotName: (state, action) => {
      const {category, name} = action.payload;
      return (
        category?.coin_bots.find(
          bot => bot.bot_name.toLowerCase() === name.toLowerCase(),
        ) || null
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCategoriesV2.pending, state => {
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchCategoriesV2.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesV2.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

// Export the actions, reducer, and the categories data
export const {updateCategories, findCategoryOfItem, findCoinBotByBotName} =
  categoriesSlice.actions;

export const selectCategories = state => state.categories.categories;
export const selectCategoriesLoading = state => state.categories.loading;

export default categoriesSlice.reducer;
