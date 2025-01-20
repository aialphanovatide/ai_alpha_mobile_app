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
  async ({botName}, thunkApi) => {
    try {
      const categories = thunkApi.getState().categories.categories;

      const coinId = categories
        .find(
          category =>
            category.coin_bots.find(coinBot => coinBot.bot_name === botName) !==
            undefined,
        )
        .coin_bots.find(coinBot => coinBot.bot_name === botName).bot_id;
      // Endpoints for using the coin name
      // const endpoints = {
      //   Today: `articles?bot_name=${botName}&per_page=15`,
      //   'This Month': `articles?bot_name=${botName}&per_page=30`,
      //   'This Week': `articles?bot_name=${botName}&per_page=30`,
      // };
      // Endpoints for using the coin id
      const endpoints = {
        Today: `articles?bot_id=${coinId}&per_page=15`,
        'This Month': `articles?bot_id=${coinId}&per_page=30`,
        'This Week': `articles?bot_id=${coinId}&per_page=30`,
      };
      const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
        newsbotGetTestService(endpoints.Today),
        newsbotGetTestService(endpoints['This Month']),
        newsbotGetTestService(endpoints['This Week']),
      ]);

      if (
        firstResponse.length === 0 ||
        secondResponse.length === 0 ||
        thirdResponse.length === 0
      ) {
        return {
          articles: {
            Today: [],
            ['This Month']: [],
            ['This Week']: [],
          },
          botName,
        };
      }

      if (!firstResponse.success || !secondResponse.success || !thirdResponse.success) {
        throw new Error(
          `Error fetching news:
          ${firstResponse.error}
          ${secondResponse.error},
          ${thirdResponse.error}`,
        );
      }

      const filteredTodayArticles = filterNewsByDate(
        firstResponse.data,
        'Today',
      );
      const filteredThisMonthArticles = filterNewsByDate(
        secondResponse.data,
        'This Month',
      );
      const filteredThisWeekArticles = filterNewsByDate(
        thirdResponse.data,
        'This Week',
      );
      return {
        articles: {
          Today: filteredTodayArticles,
          ['This Month']: filteredThisMonthArticles,
          ['This Week']: filteredThisWeekArticles,
        },
        botName,
      };
    } catch (error) {
      console.error('Error: ', error);
      return thunkApi.rejectWithValue(error.message || 'Something went wrong');
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
