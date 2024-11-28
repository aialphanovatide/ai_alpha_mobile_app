import {createSlice} from '@reduxjs/toolkit';
import {fetchTopStories} from '../actions/whatsHappeningTodayActions';
import {fetchTop10Movers} from '../actions/topTenMoversActions';
import {fetchDailyDeepDivesData} from '../actions/dailyDeepDivesActions';
import { fetchMarketNarratives } from '../actions/marketNarrativesActions';

// Store slice for the home screen data, including the data related to the home components: top ten movers and whats happening today stories.

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    topTenMovers: {
      topTenGainersData: [],
      topTenLosersData: [],
      loading: 'idle',
      error: null,
    },
    whatsHappeningToday: {
      stories: [],
      loading: 'idle',
      error: null,
    },
    dailyDeepDives: {
      dailyDeepDives: [],
      loading: 'idle',
      error: null,
    },
    marketNarratives: {
      marketNarratives: [],
      loading: 'idle',
      error: null,
    },
  },
  reducers: {
    resetTopTenMoversData: state => {
      state.topTenMovers = {
        topTenMovers: {
          topTenGainersData: [],
          topTenLosersData: [],
          loading: 'idle',
          error: null,
        },
      };
    },
    resetTopStories: state => {
      state.whatsHappeningToday = {
        stories: [],
        loading: 'idle',
        error: null,
      };
    },
    resetDailyDeepDives: state => {
      state.dailyDeepDives = {
        dailyDeepDives: [],
        loading: 'idle',
        error: null,
      };
    },
    resetMarketNarratives: state => {
      state.marketNarratives = {
        marketNarratives: [],
        loading: 'idle',
        error: null,
      };
    },
  },
  extraReducers: builder => {
    builder
      // Reducers for handling the pending, fulfilled, and rejected states of the fetchTop10Movers actions.
      .addCase(fetchTop10Movers.pending, state => {
        state.topTenMovers.loading = 'idle';
      })
      .addCase(fetchTop10Movers.fulfilled, (state, action) => {
        state.topTenMovers.loading = 'succeeded';
        state.topTenMovers.topTenGainersData = action.payload.top10Movers;
        state.topTenMovers.topTenLosersData = action.payload.top10Losers;
        state.topTenMovers.error = null;
      })
      .addCase(fetchTop10Movers.rejected, (state, action) => {
        state.topTenMovers.loading = 'failed';
        state.topTenMovers.error = action.payload || 'Error fetching data';
      })
      // Reducers for handling the pending, fulfilled, and rejected states of the fetchTopStories actions.
      .addCase(fetchTopStories.pending, state => {
        state.whatsHappeningToday.loading = 'idle';
      })
      .addCase(fetchTopStories.fulfilled, (state, action) => {
        state.whatsHappeningToday.loading = 'succeeded';
        state.whatsHappeningToday.stories = action.payload;
        state.whatsHappeningToday.error = null;
      })
      .addCase(fetchTopStories.rejected, (state, action) => {
        state.whatsHappeningToday.loading = 'failed';
        state.whatsHappeningToday.error = action.payload || 'Error fetching';
      })
      // Reducers for handling the pending, fulfilled, and rejected states of the fetchDailyDeepDives actions.
      .addCase(fetchDailyDeepDivesData.pending, state => {
        state.dailyDeepDives.loading = 'idle';
      })
      .addCase(fetchDailyDeepDivesData.fulfilled, (state, action) => {
        state.dailyDeepDives.loading = 'succeeded';
        state.dailyDeepDives.dailyDeepDives = action.payload;
        state.dailyDeepDives.error = null;
      })
      .addCase(fetchDailyDeepDivesData.rejected, (state, action) => {
        state.dailyDeepDives.loading = 'failed';
        state.dailyDeepDives.error = action.payload || 'Error fetching data';
      })
      // Reducers for handling the pending, fulfilled, and rejected states of the fetchMarketNarratives actions.
      .addCase(fetchMarketNarratives.pending, state => {
        state.marketNarratives.loading = 'idle';
      })
      .addCase(fetchMarketNarratives.fulfilled, (state, action) => {
        state.marketNarratives.loading = 'succeeded';
        state.marketNarratives.marketNarratives = action.payload;
        state.marketNarratives.error = null;
      })
      .addCase(fetchMarketNarratives.rejected, (state, action) => {
        state.marketNarratives.loading = 'failed';
        state.marketNarratives.error = action.payload || 'Error fetching data';
      });
  },
});

// Home state reset actions for the reducers.
export const {
  resetTopTenMoversData,
  resetTopStories,
  resetDailyDeepDives,
  resetMarketNarratives,
} = homeSlice.actions;

export default homeSlice.reducer;
