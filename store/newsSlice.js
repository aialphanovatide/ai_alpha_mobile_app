import {createSlice} from '@reduxjs/toolkit';
import {fetchNews} from '../actions/newsActions';

// Slice for the news data
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articlesByBotName: {},
    loading: 'idle',
    error: null,
  },
  reducers: {
    resetNews: state => {
      state.articlesByBotName = {};
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        const {articles, botName} = action.payload;
        if (
          !state.articlesByBotName[botName] ||
          state.articlesByBotName === undefined
        ) {
          state.articlesByBotName[botName] = {};
        }
        state.articlesByBotName[botName] = articles;
        state.loading = 'succeeded';
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload || 'Failed to fetch news';
      });
  },
});

export const {resetNews} = newsSlice.actions;

export default newsSlice.reducer;
