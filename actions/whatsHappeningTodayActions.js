import {createAsyncThunk} from '@reduxjs/toolkit';
import {newsbotGetService} from '../services/aiAlphaApi';

export const fetchTopStories = createAsyncThunk(
  'home/fetchTopStories',
  async ({timeframe}, {rejectWithValue}) => {
    try {
      const topStoriesData = await newsbotGetService(
        `/top-stories?per_page=10&timeframe=${timeframe}`,
      );

      if (!topStoriesData.success || !topStoriesData.data) {
        return [];
      }

      const allTopStories = Object.values(topStoriesData.data).flat();

      return allTopStories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: ({timeframe}, thunkApi) => {
      const lastTimeframe =
        thunkApi.getState().home.whatsHappeningToday.lastTimeframe;
      const loading = thunkApi.getState().home.whatsHappeningToday.loading;
      if (loading === 'idle' || lastTimeframe !== timeframe) {
        return true;
      } else {
        return false;
      }
    },
  },
);

// export const resetTopStories = state => {
//   state.whatsHappeningToday = {
//     stories: [],
//     loading: 'idle',
//     error: null,
//   };
// };

export const selectWhatsHappeningTodayStories = state =>
  state.home.whatsHappeningToday.stories;
export const selectWhatsHappeningTodayLoading = state =>
  state.home.whatsHappeningToday.loading;
