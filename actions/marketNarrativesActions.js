import {createAsyncThunk} from '@reduxjs/toolkit';
import {getServiceV2} from '../services/aiAlphaApi';

export const fetchMarketNarratives = createAsyncThunk(
  'home/fetchMarketNarratives',
  async (_, {getState, rejectWithValue}) => {
    const extractFirstTitleAndImage = content => {
      let firstTitle = '';
      let firstImageSrc = '';

      const titleMatch = content.match(
        /<(h[1-2])[^>]*>(.*?)<\/\1>|<p[^>]*>(.*?)<\/p>/,
      );
      if (titleMatch) {
        firstTitle = titleMatch[2] || titleMatch[3];
        firstTitle = firstTitle.replace(/<[^>]+>/g, '');
        firstTitle = firstTitle.replace(/&[^\s;]+;?/g, '');
      }

      const imageMatch = content.match(/<img[^>]+src="([^">]+)"/);
      if (imageMatch) {
        firstImageSrc = imageMatch[1];
      }
      return {
        title: firstTitle,
        imageSrc: firstImageSrc,
      };
    };

    try {
      const data = await getServiceV2(`/narrative-tradings?limit=99`);
      if (data.success) {
        const parsed_data = data.data.map(item => {
          return {
            content: item.narrative_trading,
            id: item.narrative_trading_id,
            coin_bot_id: item.coin_bot_id,
            coin_bot_name: item.coin_name.toLowerCase(),
            created_at: item.created_at,
            category:
              item.category_name !== '' ? item.category_name : 'Bitcoin',
            title: extractFirstTitleAndImage(item.narrative_trading).title,
            image: extractFirstTitleAndImage(item.narrative_trading).imageSrc,
          };
        });
        return parsed_data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching narrative tradings:', error);
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const loading = thunkApi.getState().home.marketNarratives.loading;
      if (loading === 'idle') {
        return true;
      } else {
        return false;
      }
    },
  },
);

export const selectMarketNarratives = state =>
  state.home.marketNarratives.marketNarratives;

export const selectMarketNarrativesLoading = state =>
  state.home.marketNarratives.loading;
