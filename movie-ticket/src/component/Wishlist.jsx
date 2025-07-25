import { useSelector } from 'react-redux';
import MovieCard from '../movie/MovieCard';

const Wishlist = () => {
  // Safely access wishlist with fallback
  const wishlist = useSelector(state => state.wishlist?.items || []); // Updated path

  return (
    <div className="p-6 min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-400">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400 text-xl mb-4">Your wishlist is empty</p>
          <p className="text-gray-500">Click the ❤️ icon on movies to add them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {wishlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;