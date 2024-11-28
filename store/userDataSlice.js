import {createSlice} from '@reduxjs/toolkit';
import {fetchUserData} from '../actions/userActions';
import {toggleSubscription} from '../actions/notificationActions';

const userDataSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    email: '',
    userId: '',
    rawUserId: '',
    notifications: {},
    loading: 'idle',
    error: null,
  },
  reducers: {
    resetUserData: state => {
      state.data = null;
      state.loading = 'idle';
      state.error = null;
    },
    updateUserId: (state, action) => {
      state.userId = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateRawUserId: (state, action) => {
      state.rawUserId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Loading states for fetching user data
      .addCase(fetchUserData.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload || 'An error occurred';
      })
      .addCase(toggleSubscription.fulfilled, (state, action) => {
        const {topic, newStatus} = action.payload;
        state.notifications[topic] = newStatus;
      })
      .addCase(toggleSubscription.rejected, (state, action) => {
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const {resetUserData, updateEmail, updateUserId, updateRawUserId} =
  userDataSlice.actions;
export default userDataSlice.reducer;
