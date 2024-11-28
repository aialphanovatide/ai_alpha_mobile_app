import {createSlice} from '@reduxjs/toolkit';
import { fetchFundamentalsData } from '../actions/fundamentalsActions';
// Initial fundamentals state
const initialState = {
  fundamentalsData: null,
  sharedData: [],
  hasContent: {
    introduction: false,
    tokenomics: false,
    generalTokenAllocation: false,
    tokenUtility: false,
    valueAccrualMechanisms: false,
    competitors: false,
    revenueModel: false,
    hacks: false,
    upgrades: false,
    dapps: false,
  },
  globalLoading: 'idle',
  error: null,
  lastCoin: null,
};


// Redux slice for fundamentals
const fundamentalsSlice = createSlice({
  name: 'fundamentals',
  initialState,
  reducers: {
    setSectionContent(state, action) {
      const {section, value} = action.payload;
      state.hasContent[section] = value;
    },
    resetFundamentalsState(state) {
      return {...initialState};
    },
    setLastRequestedCoin(state, action) {
      console.log('Setting coin to: ', action.payload);
      state.lastCoin = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFundamentalsData.pending, state => {
        state.globalLoading = 'idle';
        state.error = null;
      })
      .addCase(fetchFundamentalsData.fulfilled, (state, action) => {
        state.fundamentalsData = action.payload;
        state.globalLoading = 'succeeded';
        state.error = null;
      })
      .addCase(fetchFundamentalsData.rejected, (state, action) => {
        state.fundamentalsData = null;
        state.globalLoading = 'failed';
        state.error = action.payload;
      });
  },
});

export const {setSectionContent, resetFundamentalsState, setLastRequestedCoin} =
  fundamentalsSlice.actions;

export default fundamentalsSlice.reducer;
