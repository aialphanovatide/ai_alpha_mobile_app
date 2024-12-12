import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  aboutVisible: false,
  aboutDescription: '',
  aboutTitle: '',
};

const aboutModalSlice = createSlice({
  name: 'aboutModal',
  initialState,
  reducers: {
    handleAboutPress: (state, action) => {
      const {description = null, title = null} = action.payload || {};
      if (description) {
        state.aboutDescription = description;
      }
      if (title) {
        state.aboutTitle = `About ${title}`;
      }
      state.aboutVisible = !state.aboutVisible;
    },
    handleClose: state => {
      state.aboutDescription = '';
      state.aboutTitle = '';
      state.aboutVisible = false;
    },
  },
});

export const {handleAboutPress, handleClose} = aboutModalSlice.actions;
export default aboutModalSlice.reducer;

export const selectAboutVisible = state => state.aboutModal.aboutVisible;
export const selectAboutDescription = state =>
  state.aboutModal.aboutDescription;
export const selectAboutTitle = state => state.aboutModal.aboutTitle;
