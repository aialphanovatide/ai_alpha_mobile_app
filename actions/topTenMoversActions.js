import {createAsyncThunk} from '@reduxjs/toolkit';
import {getServiceV2, getTestService} from '../services/aiAlphaApi';

export const fetchTop10Movers = createAsyncThunk(
  'home/fetchTop10Movers',
  async (_, {rejectWithValue}) => {
    try {
      const data = await getServiceV2(`chart/top-movers`);
      if (data.success) {
        const top10CoinsInfo = data.data.top_10_gainers.map(coin => ({
          name:
            coin.name.length > 15
              ? coin.name.trim().split(/\s+/g)[0]
              : coin.name,
          symbol:
            coin.symbol.toLowerCase() === 'ethdydx'
              ? 'dydx'
              : coin.symbol.toLowerCase() === 'matic'
              ? 'pol'
              : coin.symbol.toLowerCase() === 'render'
              ? 'rndr'
              : coin.symbol,
          image: coin.image,
          currentPrice: coin.current_price,
          priceChange24H: coin.price_change_percentage_24h || 0.0,
        }));

        const top10LosersInfo = data.data.top_10_losers.map(coin => ({
          name:
            coin.name.length > 15
              ? coin.name.trim().split(/\s+/g)[0]
              : coin.name,
          symbol:
            coin.symbol.toLowerCase() === 'ethdydx'
              ? 'dydx'
              : coin.symbol.toLowerCase() === 'matic'
              ? 'pol'
              : coin.symbol.toLowerCase() === 'render'
              ? 'rndr'
              : coin.symbol,
          image: coin.image,
          currentPrice: coin.current_price,
          priceChange24H: coin.price_change_percentage_24h || 0.0,
        }));

        return {top10Movers: top10CoinsInfo, top10Losers: top10LosersInfo};
      } else {
        return rejectWithValue('Error fetching data');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, {getState}) => {
      const {loading} = getState().home.topTenMovers;
      if (loading === 'idle') {
        return true;
      } else {
        return false;
      }
    },
  },
);

export const selectTopTenGainers = state =>
  state.home.topTenMovers.topTenGainersData;
export const selectTopTenLosers = state =>
  state.home.topTenMovers.topTenLosersData;
export const selectTopTenMoversLoading = state =>
  state.home.topTenMovers.loading;
