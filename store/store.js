import {configureStore, combineReducers} from '@reduxjs/toolkit';
import fundamentalsReducer from '../store/fundamentalsSlice';
import categoriesReducer from '../store/categoriesSlice';
import homeReducer from '../store/homeSlice';
import userReducer from '../store/userDataSlice';

const rootReducer = combineReducers({
  fundamentals: fundamentalsReducer,
  categories: categoriesReducer,
  home: homeReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
