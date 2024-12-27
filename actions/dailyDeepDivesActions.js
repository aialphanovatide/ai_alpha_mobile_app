import {createAsyncThunk} from '@reduxjs/toolkit';
import {getService, getServiceV2, getTestService} from '../services/aiAlphaApi';

export const fetchDailyDeepDivesData = createAsyncThunk(
  'home/fetchDailyDeepDivesData',
  async (_, {getState, rejectWithValue}) => {
    try {
      const data = await getServiceV2(`analyses?per_page=99&section_id=19`);
      if (!data.success) {
        return [];
      }

      const extractFirstTitleAndImage = content => {
        let firstTitle = '';
        let firstImageSrc = '';

        const titleMatch = content.match(
          /<(h[1-2])[^>]*>(.*?)<\/\1>|<p[^>]*>(.*?)<\/p>/,
        );
        if (titleMatch) {
          firstTitle = titleMatch[2] || titleMatch[3];
          firstTitle = firstTitle
            .replace(/<[^>]+>/g, '')
            .replace(/&[^\s;]+;?/g, '');
        }

        const imageMatch = content.match(/<img[^>]+src="([^">]+)"/);
        if (imageMatch) {
          firstImageSrc = imageMatch[1];
        }

        return {title: firstTitle, imageSrc: firstImageSrc};
      };

      return data.data.map(item => ({
        id: item.id,
        raw_analysis: item.content,
        coin_bot_id: item.coin_id,
        coin_bot_name:
          item.coin_name,
        created_at: item.created_at,
        category: item.category_name,
        title: extractFirstTitleAndImage(item.content).title,
        image: item.image_url,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const loading = thunkApi.getState().home.dailyDeepDives.loading;
      if (loading === 'idle') {
        return true;
      } else {
        return false;
      }
    },
  },
);

export const fetchDailyMacros = createAsyncThunk(
  'home/fetchDailyMacros',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {categories} = getState().categories; // Use the categories slice for getting the categories data
      const data = await getServiceV2(`analyses?per_page=50&section_id=20`);

      if (!data.success) {
        return [];
      }

      const findCoinByCategoriesAndBotId = (categories, coin_id) => {
        let found;
        categories.forEach(category => {
          category.coin_bots.forEach(coin => {
            if (coin.bot_id === coin_id) {
              found = coin.bot_name;
            }
          });
        });
        return found || null;
      };


      return data.data.map(item => ({
        id: item.id,
        raw_analysis: item.content,
        coin_bot_id: item.coin_id,
        coin_bot_name:
          findCoinByCategoriesAndBotId(categories, item.coin_id) || 'btc',
        created_at: item.created_at,
        category: item.category_name,
        title: item.title,
        image: item.image_url,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const loading = thunkApi.getState().home.dailyMacros.loading;
      if (loading === 'idle') {
        return true;
      } else {
        return false;
      }
    },
  },
);



export const selectDailyDeepDives = state =>
  state.home.dailyDeepDives.dailyDeepDives;
export const selectDailyDeepDivesLoading = state =>
  state.home.dailyDeepDives.loading;

export const selectDailyMacros = state =>
  state.home.dailyMacros.dailyMacros;
export const selectDailyMacrosLoading = state =>
  state.home.dailyMacros.loading;
