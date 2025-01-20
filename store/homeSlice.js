import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchTopStories} from '../actions/whatsHappeningTodayActions';
import {fetchTop10Movers} from '../actions/topTenMoversActions';
import {
  fetchDailyDeepDivesData,
  fetchDailyMacros,
  fetchLatestSpotlight,
  fetchSectionsMetadata,
} from '../actions/dailyDeepDivesActions';
import {fetchMarketNarratives} from '../actions/marketNarrativesActions';
import {loadNotificationItems} from '../actions/notificationActions';
import {fetchAlertsByAllCategories} from '../actions/alertsActions';

export const fetchInitialData = createAsyncThunk(
  'home/fetchInitialData',
  async (_, {dispatch}) => {
    await Promise.all([
      dispatch(loadNotificationItems()),
      dispatch(fetchAlertsByAllCategories({timeInterval: '4H'})),
      dispatch(fetchTop10Movers()),
      dispatch(fetchTopStories({timeframe: '1D'})),
      dispatch(fetchDailyDeepDivesData()),
      dispatch(fetchDailyMacros()),
      dispatch(fetchMarketNarratives()),
      dispatch(fetchLatestSpotlight()),
    ]);
  },
);

// Store slice for the home screen data, including the data related to the home components: top ten movers and whats happening today stories.

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    sections: {
      data: [],
      loading: 'idle',
      error: null,
    },
    topTenMovers: {
      topTenGainersData: [],
      topTenLosersData: [],
      loading: 'idle',
      error: null,
    },
    whatsHappeningToday: {
      stories: {
        '1D': [],
        '1W': [],
        '1M': [],
      },
      loading: 'idle',
      lastTimeframe: null,
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
    dailyMacros: {
      dailyMacros: [],
      loading: 'idle',
      error: null,
    },
    spotlight: {
      data: [],
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
        stories: {
          '1D': [],
          '1W': [],
          '1M': [],
        },
        loading: 'idle',
        error: null,
        lastTimeframe: null,
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
    setLastTimeframe: (state, action) => {
      console.log('Changing timeframe to: ', action.payload);
      state.whatsHappeningToday.lastTimeframe = action.payload;
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
      .addCase(fetchTopStories.pending, (state, action) => {
        state.whatsHappeningToday.loading = 'idle';
      })
      .addCase(fetchTopStories.fulfilled, (state, action) => {
        const timeframe = action.meta.arg.timeframe;
        state.whatsHappeningToday.loading = 'succeeded';
        state.whatsHappeningToday.stories[timeframe] = action.payload;
        state.whatsHappeningToday.error = null;
        state.whatsHappeningToday.lastTimeframe = timeframe;
      })
      .addCase(fetchTopStories.rejected, (state, action) => {
        state.whatsHappeningToday.loading = 'failed';
        state.whatsHappeningToday.lastTimeframe = action.meta.arg.timeframe;
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
      })
      // Reducers for handling the pending, fulfilled, and rejected states of the fetchDailyMacro actions.
      .addCase(fetchDailyMacros.pending, state => {
        state.dailyMacros.loading = 'idle';
      })
      .addCase(fetchDailyMacros.fulfilled, (state, action) => {
        state.dailyMacros.loading = 'succeeded';
        state.dailyMacros.dailyMacros = action.payload;
        state.dailyMacros.error = null;
      })
      .addCase(fetchDailyMacros.rejected, (state, action) => {
        state.dailyMacros.loading = 'failed';
        state.dailyMacros.error = action.payload || 'Error fetching data';
      })
      // Reducers for handling the pending, fulfilled, and rejected states of the fetchLatestSpotlight actions.
      .addCase(fetchLatestSpotlight.pending, state => {
        state.spotlight.loading = 'idle';
      })
      .addCase(fetchLatestSpotlight.fulfilled, (state, action) => {
        state.spotlight.loading = 'succeeded';
        state.spotlight.data = action.payload;
        state.spotlight.error = null;
      })
      .addCase(fetchLatestSpotlight.rejected, (state, action) => {
        state.spotlight.loading = 'failed';
        state.spotlight.error = action.payload || 'Error fetching data';
      })
      // Reducers for handling the pending, fulfilled, and rejected states of the actions for fetching the sections metadata.
      .addCase(fetchSectionsMetadata.pending, state => {
        state.sections.loading = 'idle';
      })
      .addCase(fetchSectionsMetadata.fulfilled, (state, action) => {
        state.sections.loading = 'succeeded';
        state.sections.data = action.payload;
        state.sections.error = null;
      })
      .addCase(fetchSectionsMetadata.rejected, (state, action) => {
        state.sections.loading = 'failed';
        state.sections.error = action.payload || 'Error fetching data';
      });
  },
});

// Home state reset actions for the reducers.
export const {
  resetTopTenMoversData,
  resetTopStories,
  resetDailyDeepDives,
  resetMarketNarratives,
  setLastTimeframe,
} = homeSlice.actions;

export default homeSlice.reducer;
