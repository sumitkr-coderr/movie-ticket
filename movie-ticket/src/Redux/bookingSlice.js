import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentMovie: null,
  selectedSeats: [],
  totalAmount: 0,
  isCompleted: false 
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrentMovie: (state, action) => {
      state.currentMovie = action.payload;
    },
    selectSeats: (state, action) => {
      state.selectedSeats = action.payload.seats;
      state.totalAmount = action.payload.total;
      state.currentMovie = action.payload.movie;
    },
    clearBooking: (state) => {
      return initialState;
    },
   
    completeBooking: (state) => {
      state.isCompleted = true;
 
    }
  }
});


export const { 
  setCurrentMovie, 
  selectSeats, 
  clearBooking, 
  completeBooking 
} = bookingSlice.actions;

// Selectors
export const selectBooking = (state) => state.booking;

export default bookingSlice.reducer;