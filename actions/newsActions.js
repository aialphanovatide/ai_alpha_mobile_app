import {createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {
  newsbotGetService,
  newsbotGetTestService,
  oldNewsbotGetService,
} from '../services/aiAlphaApi';

// Function to filter the news by the date
const filterNewsByDate = (news, filter) => {
  const now = new Date();

  return news.filter(article => {
    const articleDate = new Date(article.date);

    if (filter === 'Today') {
      return (
        articleDate.getDate() === now.getDate() &&
        articleDate.getMonth() === now.getMonth() &&
        articleDate.getFullYear() === now.getFullYear()
      );
    } else if (filter === 'This Week') {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);
      return articleDate >= startOfWeek;
    } else if (filter === 'This Month') {
      return (
        articleDate.getMonth() === now.getMonth() &&
        articleDate.getFullYear() === now.getFullYear()
      );
    }

    return false;
  });
};

// Async action to fetch the news from the server
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({botName}, {rejectWithValue}) => {
    try {
      const endpoints = ['eth', 'btc'].includes(botName)
        ? {
            Today: `articles?bot_name=${botName}&per_page=15`,
            'This Week': `articles?bot_name=${botName}&per_page=30`,
          }
        : {
            Today: `articles?bot_name=${botName}&per_page=15`,
            'This Month': `articles?bot_name=${botName}&per_page=30`,
          };
      const secondFilter = ['eth', 'btc'].includes(botName)
        ? 'This Week'
        : 'This Month';
      const [firstResponse, secondResponse] = await Promise.all([
        newsbotGetTestService(endpoints.Today),
        newsbotGetTestService(endpoints[secondFilter]),
      ]);

      if (firstResponse.length === 0 || secondResponse.length === 0) {
        return {
          articles: {
            Today: [],
            [secondFilter]: [],
          },
          botName,
        };
      }

      if (!firstResponse.success || !secondResponse.success) {
        throw new Error(
          `Error fetching news:
          ${firstResponse.error}
          ${secondResponse.error}`,
        );
      }

      const filteredTodayArticles = filterNewsByDate(
        firstResponse.data,
        'Today',
      );
      const filteredSecondFilterArticles = filterNewsByDate(
        secondResponse.data,
        secondFilter,
      );
      return {
        articles: {
          Today: filteredTodayArticles,
          [secondFilter]: filteredSecondFilterArticles,
        },
        botName,
      };
    } catch (error) {
      console.error('Error: ', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  },
  {
    condition: ({botName, activeFilter}, thunkApi) => {
      const {loading, articlesByBotName} = thunkApi.getState().news;
      const secondFilter = ['eth', 'btc'].includes(botName)
        ? 'This Week'
        : 'This Month';
      const hasTodayData = articlesByBotName[botName]?.Today?.length > 0;
      const hasSecondFilterData =
        articlesByBotName[botName]?.[secondFilter]?.length > 0;
      // console.log('Has news data result:', hasTodayData, hasSecondFilterData);
      if (loading === 'succeeded' && hasTodayData && hasSecondFilterData) {
        return false;
      }
    },
  },
);

export const selectNewsByBotName = (state, botName) => {
  return state.news.articlesByBotName[botName];
};

export const selectNews = createSelector(
  state => state.news.articlesByBotName,
  articlesByBotName => {
    return articlesByBotName;
  },
);

export const selectNewsLoading = state => state.news.loading;
