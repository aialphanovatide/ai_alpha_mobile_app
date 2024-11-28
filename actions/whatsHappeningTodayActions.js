import {createAsyncThunk} from '@reduxjs/toolkit';
import {newsbotGetService} from '../services/aiAlphaApi';

export const fetchTopStories = createAsyncThunk(
  'home/fetchTopStories',
  async (_, {rejectWithValue}) => {
    try {
      const topStoriesData = await newsbotGetService(
        '/top-stories?per_page=10',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!topStoriesData.success || !topStoriesData.data) {
        return [];
      }
      return topStoriesData.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const loading = thunkApi.getState().home.whatsHappeningToday.loading;
      if (loading === 'idle') {
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
