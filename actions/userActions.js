import {createAsyncThunk} from '@reduxjs/toolkit';
import {getService} from '../services/aiAlphaApi';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (rawUserId, {rejectWithValue}) => {
    try {
      const userData = await getService(`user?auth0id=${rawUserId}`);
      console.log("- Successfully retrieved the user's data: ", userData.data);
      return userData.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (rawUserId, thunkApi) => {
      const user = thunkApi.getState().user;
      if (user.data !== null) {
        return false;
      } else {
        return true;
      }
    },
  },
);

export const selectUserData = state => state.user.data;

export const selectUserEmail = state => state.user.email;

export const selectUserId = state => state.user.userId;

export const selectRawUserId = state => state.user.rawUserId;