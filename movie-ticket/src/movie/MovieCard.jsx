import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromWishlist } from '../Redux/wishlistSlice';
import { setCurrentMovie } from '../Redux/bookingSlice';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate price with tax (assuming 10% tax)
  const calculateTotalPrice = (basePrice) => {
    const taxRate = 0.10; // 10% tax
    const taxAmount = basePrice * taxRate;
    const totalPrice = basePrice + taxAmount;
    return {
      basePrice: basePrice.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      totalPrice: totalPrice.toFixed(2)
    };
  };

  const handleBookNow = () => {
    try {
      // Validate required fields
      if (!movie?.id || !movie?.title) {
        throw new Error('Invalid movie data');
      }

      // Calculate prices
      const basePrice = movie.price || 12.99; // Default price if not provided
      const { basePrice: formattedBase, taxAmount, totalPrice } = calculateTotalPrice(basePrice);

      // Prepare booking data
      const bookingMovieData = {
        id: movie.id,
        title: movie.title,
        price: basePrice, // Using original price for calculations
        formattedPrice: formattedBase, // Formatted for display
        taxAmount,
        totalPrice,
        image: movie.image,
        time: movie.time || "Not specified",
        date: movie.date || movie.day || "Not specified",
        genre: movie.genre || "Not specified",
        rating: movie.rating || "Not rated",
        duration: movie.duration || "Not specified"
      };

      // Dispatch to Redux
      dispatch(setCurrentMovie(bookingMovieData));
      
      // Navigate to seat selection
      navigate('/seat-selection');
      
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to start booking process');
    }
  };

  const handleRemove = () => {
    dispatch(removeFromWishlist(movie.id));
    toast.error(`${movie.title} removed from wishlist`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <div className="relative rounded-xl p-4 h-[32rem] w-[20rem] flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl hover:scale-105 transition-transform duration-300 group">
      <div className="overflow-hidden rounded-lg h-[20rem] relative">
        <img 
          src={movie.image} 
          alt={movie.title} 
          className="w-full h-full object-cover rounded-lg group-hover:opacity-90 transition-opacity duration-300"
        />
        {movie.rating && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-yellow-400 px-2 py-1 rounded-md">
            {movie.rating}
          </div>
        )}
      </div>
      
      <div className="movie-info text-white mt-4 px-2 flex-grow flex flex-col">
        <h2 className="text-2xl font-bold mb-2 text-yellow-400">{movie.title}</h2>
        
        {movie.genre && (
          <p className="text-gray-300 mb-2">🎭 {movie.genre}</p>
        )}
        
        {movie.duration && (
          <p className="text-gray-300 mb-2">⏱️ {movie.duration}</p>
        )}

        {/* Price display section */}
        <div className="mb-4 mt-2">
          <p className="text-lg font-semibold text-gray-300">
            Price: ${movie.price ? movie.price.toFixed(2) : '12.99'}
          </p>
          {movie.price && (
            <p className="text-sm text-gray-400">
              (Taxes will be calculated during checkout)
            </p>
          )}
        </div>

        <div className="mt-auto flex justify-between items-center">
          <button 
            onClick={handleRemove}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <FaTimes /> Remove
          </button>
          
          <button 
            onClick={handleBookNow}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;