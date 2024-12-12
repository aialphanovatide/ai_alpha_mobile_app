import {createAsyncThunk} from '@reduxjs/toolkit';
import {newsbotGetService, oldNewsBotGetService} from '../services/aiAlphaApi';

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
      // const endpoint = `article?bot_name=${botName}&page=1&per_page=${newsLimit}`;
      // const data = await newsbotGetService(endpoint);
      const endpoints = ['eth', 'btc'].includes(botName)
        ? {
            Today: `get_articles?bot_name=${botName}&limit=10`,
            'This Week': `get_articles?bot_name=${botName}&limit=20`,
          }
        : {
            Today: `get_articles?bot_name=${botName}&limit=10`,
            'This Month': `get_articles?bot_name=${botName}&limit=20`,
          };
      const secondFilter = ['eth', 'btc'].includes(botName)
        ? 'This Week'
        : 'This Month';
      const [firstResponse, secondResponse] = await Promise.all([
        oldNewsBotGetService(endpoints.Today),
        oldNewsBotGetService(endpoints[secondFilter]),
      ]);
      if (!firstResponse.success || !secondResponse.success) {
        const errorMessage =
          firstResponse.error?.message ||
          secondResponse.error?.message ||
          'Failed to fetch news';
        return rejectWithValue(errorMessage);
      }
      // console.log('Responses: ', firstResponse, secondResponse);
      const filteredTodayArticles = filterNewsByDate(
        firstResponse.data,
        'Today',
      );
      const filteredSecondFilterArticles = filterNewsByDate(
        secondResponse.data,
        secondFilter,
      );
      // console.log(
      //   'Filtered articles: ',
      //   filteredTodayArticles,
      //   filteredSecondFilterArticles,
      // );
      return {
        articles: {
          Today: filteredTodayArticles,
          [secondFilter]: filteredSecondFilterArticles,
        },
        botName,
      };
    } catch (error) {
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
      if (
        (loading === 'succeeded' || loading === 'failed') &&
        hasTodayData &&
        hasSecondFilterData
      ) {
        return false;
      }
    },
  },
);

export const selectNewsByBotName = (state, botName) => {
  return state.news.articlesByBotName[botName];
};

export const selectNews = state => {
  return state.news.articlesByBotName;
};

export const selectNewsLoading = state => state.news.loading;
