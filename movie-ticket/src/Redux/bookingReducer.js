// src/Redux/bookingReducer.js
import { SELECT_MOVIE, SELECT_SEAT, CONFIRM_BOOKING } from './actions';

const initialState = {
  selectedMovie: null,
  selectedSeats: [],
  bookingConfirmed: false,
  bookingHistory: []
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload,
        selectedSeats: [],
        bookingConfirmed: false
      };
    case SELECT_SEAT:
      const seat = action.payload;
      return {
        ...state,
        selectedSeats: state.selectedSeats.includes(seat)
          ? state.selectedSeats.filter(s => s !== seat)
          : [...state.selectedSeats, seat]
      };
    case CONFIRM_BOOKING:
      return {
        ...state,
        bookingConfirmed: true,
        bookingHistory: [
          ...state.bookingHistory,
          {
            movie: state.selectedMovie,
            seats: state.selectedSeats,
            date: new Date().toISOString()
          }
        ],
        selectedSeats: []
      };
    default:
      return state;
  }
}