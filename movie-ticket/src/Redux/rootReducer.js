import { combineReducers } from 'redux';
import moviesReducer from './movieSlice';
import bookingReducer from './bookingReducer';

export default combineReducers({
   movies: moviesReducer,
  booking: bookingReducer
});