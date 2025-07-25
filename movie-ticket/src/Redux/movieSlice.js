import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentMovie: null  
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setCurrentMovie: (state, action) => {
      state.currentMovie = action.payload;
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    }
  }
});

export const { setCurrentMovie, clearCurrentMovie } = movieSlice.actions;
export default movieSlice.reducer;