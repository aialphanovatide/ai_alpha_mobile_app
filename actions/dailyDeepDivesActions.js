import {createAsyncThunk} from '@reduxjs/toolkit';
import {getService} from '../services/aiAlphaApi';

export const fetchDailyDeepDivesData = createAsyncThunk(
  'home/fetchDailyDeepDivesData',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {categories} = getState().categories; // Use the categories slice for getting the categories data
      const data = await getService(`/get_analysis?limit=99`);

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
        id: item.analysis_id,
        raw_analysis: item.analysis,
        coin_bot_id: item.coin_bot_id,
        coin_bot_name:
          findCoinByCategoriesAndBotId(categories, item.coin_bot_id) || 'btc',
        created_at: item.created_at,
        category: item.category_name,
        title: extractFirstTitleAndImage(item.analysis).title,
        image: extractFirstTitleAndImage(item.analysis).imageSrc,
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

export const selectDailyDeepDives = state =>
  state.home.dailyDeepDives.dailyDeepDives;
export const selectDailyDeepDivesLoading = state =>
  state.home.dailyDeepDives.loading;
