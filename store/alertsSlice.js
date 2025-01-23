import {createSlice} from '@reduxjs/toolkit';
import {
  fetchAlertsByAllCategories,
  fetchAlertsByCoin,
  fetchAlertsBySubscriptions,
} from '../actions/alertsActions';

// Slice initial state
const initialState = {
  alerts: [],
  alertsByCoin: [],
  loading: 'idle',
  loadingByCoin: 'idle',
  error: null,
  hasSubscription: false,
  lastCoin: null,
};

// Alerts redux slice
const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    resetAllAlerts: state => {
      state.alerts = [];
    },
    resetAlertsByCoin: state => {
      state.alertsByCoin = [];
    },
    setLastCoin: (state, action) => {
      state.lastCoin = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAlertsByCoin.pending, state => {
        state.loadingByCoin = 'idle';
        state.error = null;
      })
      .addCase(fetchAlertsByCoin.fulfilled, (state, action) => {
        state.lastCoin = action.meta.arg.coins;
        state.alerts = action.payload;
        state.alertsByCoin = action.payload;
        state.loadingByCoin = 'succeeded';
      })
      .addCase(fetchAlertsByCoin.rejected, (state, action) => {
        state.loadingByCoin = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAlertsBySubscriptions.pending, state => {
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchAlertsBySubscriptions.fulfilled, (state, action) => {
        state.alerts = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchAlertsBySubscriptions.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAlertsByAllCategories.pending, state => {
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchAlertsByAllCategories.fulfilled, (state, action) => {
        state.alerts = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchAlertsByAllCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export const {resetAlertsByCoin, resetAllAlerts, setLastCoin} =
  alertsSlice.actions;

export default alertsSlice.reducer;
