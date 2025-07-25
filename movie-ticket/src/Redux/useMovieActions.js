import { useDispatch } from 'react-redux';
import { setCurrentMovie } from '../Redux/movieSlice';

export const useMovieActions = () => {
  const dispatch = useDispatch();
  
  const handleMovieSelect = (movie) => {
    dispatch(setCurrentMovie(movie));
    // Other shared logic
  };

  return { handleMovieSelect };
};