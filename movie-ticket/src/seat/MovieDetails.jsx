import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import SeatSelection from './SeatSelection';
import { toast } from 'react-toastify';

const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedMovie = useSelector(state => state.booking.selectedMovie);
  
  // Get movie data passed from Movies.js via location.state
  const movieFromLocation = location.state?.movie;

  useEffect(() => {
    if (!selectedMovie && !movieFromLocation) {
      toast.error('No movie selected. Redirecting...');
      navigate('/movies'); // Redirect back to movies page
    }
  }, [selectedMovie, movieFromLocation, navigate]);

  // Use movie from location first, then fall back to Redux state
  const movie = movieFromLocation || selectedMovie;

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-sm">
            <span>🕒 {movie.time}</span>
            <span>📅 {movie.day}</span>
            <span>🎭 {movie.genre}</span>
            <span>⏱️ {movie.duration}</span>
          </div>
        </div>
      </div>
      <SeatSelection />
    </div>
  );
};

export default MovieDetails;