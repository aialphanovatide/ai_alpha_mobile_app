import {createSlice} from '@reduxjs/toolkit';
import {
  fetchAskAiData,
  fetchAvailableCoins,
  loadAskAiData,
  saveAskAiData,
} from '../actions/askAiActions';

const askAiSlice = createSlice({
  name: 'askAi',
  initialState: {
    availableCoins: [],
    savedResults: [],
    currentResult: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    resetCurrentResult: state => {
      state.currentResult = null;
    },
    resetSavedResults: state => {
      state.savedResults = [];
    },
  },
  extraReducers: builder => {
    builder
      // Loading states for fetching data of the user's search
      .addCase(fetchAskAiData.pending, state => {
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchAskAiData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.currentResult = action.payload.result;
      })
      .addCase(fetchAskAiData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadAskAiData.fulfilled, (state, action) => {
        state.savedResults = action.payload;
      })
      .addCase(fetchAvailableCoins.fulfilled, (state, action) => {
        state.availableCoins = action.payload;
      })
      .addCase(saveAskAiData.fulfilled, (state, action) => {
        state.savedResults = action.payload;
      })
      .addCase(saveAskAiData.rejected, (state, action) => {
        state.error = action.error.message;
        state.savedResults = [];
      });
  },
});

export const {resetCurrentResult, resetSavedResults} = askAiSlice.actions;
export default askAiSlice.reducer;
