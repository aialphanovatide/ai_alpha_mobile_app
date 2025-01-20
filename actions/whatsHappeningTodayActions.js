import {createAsyncThunk} from '@reduxjs/toolkit';
import {newsbotGetService, newsbotGetTestService} from '../services/aiAlphaApi';

const TOP_3_COINS_ID = [2, 11, 1];

export const fetchTopStories = createAsyncThunk(
  'home/fetchTopStories',
  async ({timeframe}, {rejectWithValue}) => {
    try {
      // const topStoriesData = await newsbotGetService(
      //   `/top-stories?per_page=10&timeframe=${timeframe}`,
      // );
      const topStoriesData = await newsbotGetTestService(
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
      const stories = thunkApi.getState().home.whatsHappeningToday.stories;
      if (
        loading === 'idle' ||
        stories[lastTimeframe].length === 0 ||
        lastTimeframe !== timeframe
      ) {
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

export const selectTop3CoinsStories = state => {
  const lastTimeframe = state.home.whatsHappeningToday.lastTimeframe || '1D';
  const allStories = state.home.whatsHappeningToday.stories;
  const timeframeStories = allStories[lastTimeframe];
  return timeframeStories.length > 0
    ? timeframeStories.filter(story => TOP_3_COINS_ID.includes(story.bot_id))
    : [];
};

export const selectAltCoinsStories = state => {
  const lastTimeframe = state.home.whatsHappeningToday.lastTimeframe || '1D';
  const allStories = state.home.whatsHappeningToday.stories;
  const timeframeStories = allStories[lastTimeframe];
  return timeframeStories.length > 0
    ? timeframeStories.filter(story => !TOP_3_COINS_ID.includes(story.bot_id))
    : [];
};

export const selectWhatsHappeningTodayLoading = state =>
  state.home.whatsHappeningToday.loading;
