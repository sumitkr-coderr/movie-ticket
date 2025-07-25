// src/Redux/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const movie = action.payload;
      if (!movie?.id) return;
       const completeMovie = {
    id: movie.id,
    title: movie.title,
    image: movie.image,
    date: movie.date || movie.day || "Not specified",
    time: movie.time || "Not specified",
    genre: movie.genre || "Not specified",
    rating: movie.rating || "Not rated",
    duration: movie.duration || "Not specified"
  };
      const exists = state.items.some(m => m.id === movie.id);
      if (!exists) {
        state.items.push(completeMovie);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(movie => movie.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 