// src/Redux/actions.js
export const SELECT_MOVIE = 'booking/SELECT_MOVIE';
export const SELECT_SEAT = 'booking/SELECT_SEAT';
export const CONFIRM_BOOKING = 'booking/CONFIRM_BOOKING';



export const selectMovie = (movie) => ({
  type: 'booking/selectMovie',
  payload: movie
});

export const selectSeat = (seat) => ({
  type: 'booking/selectSeat',
  payload: seat
});

export const confirmBooking = () => ({
  type: 'booking/confirmBooking'
});