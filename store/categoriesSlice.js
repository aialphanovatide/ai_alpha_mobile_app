import {createSlice} from '@reduxjs/toolkit';
import {fetchCategories, fetchCategoriesV2} from '../actions/categoriesActions';

// Categories slice for the Redux store
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: 'idle',
    error: null,
    activeCoin: {},
    activeSubCoin: null,
  },
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
    updateActiveCoin: (state, action) => {
      state.activeCoin = action.payload;
    },
    updateActiveSubCoin: (state, action) => {
      state.activeSubCoin = action.payload;
    },
    resetActiveCoin: state => {
      state.activeCoin = {};
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
export const {
  updateCategories,
  updateActiveCoin,
  updateActiveSubCoin,
  resetActiveCoin,
  findCoinBotByBotName,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
