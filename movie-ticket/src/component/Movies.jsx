import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentMovie } from '../Redux/bookingSlice';
import { addToWishlist, removeFromWishlist } from '../Redux/wishlistSlice';
// import { selectMovie } from '../Redux/bookingSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const carouselMovies = [
  {
    id: 1,
    title: "John Wick 4",
    image: "/img/johnwick.jpeg", 
    description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.",
    day: "Friday",
    time: "9:00 PM",
    genre: "Action, Thriller",
    rating: "R",
    price: 12.99,
    duration: "2h 49m"
  },
  {
    id: 2,
    title: "Fighter",
    image: "public/img/fighter.webp", 
    description: "Fighter is an upcoming Indian Hindi-language action film directed by Siddharth Anand. The film stars Hrithik Roshan, Deepika Padukone, and Anil Kapoor.",
    day: "Saturday",
    time: "7:00 PM",
    genre: "Action, Drama",
    price: 11.99,
    rating: "U/A",
    duration: "2h 30m"
  },
  {
    id: 3,
    title: "EndGame",
    image: "public/img/endgame.jpg", 
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    day: "Sunday",
    time: "6:00 PM",
    genre: "Action, Adventure",
    price: 14.99,
    rating: "PG-13",
    duration: "3h 1m"
  },
  {
    id: 4,
    title: "Demon Slayer: The Infinity Castle",
    image: "public/img/Demon-Slayer.webp",
    description: "Tanjiro and his friends embark on a new mission to infiltrate the Infinity Castle, where they face powerful demons and uncover secrets that could change their fate forever.",
    day: "Monday",  
    time: "8:00 PM",
    genre: "Anime, Action",
    price: 15.99,
    rating: "PG-13",
    duration: "1h 45m"
  },
];

const nowShowingMovies = [
  {
    id: 5,
    title: "RRR",
    image: "/img/rrr.webp", // Changed path to public-relative
    date: "09/09/2025",
    time: "06:00 PM",
    color: "from-gray-900 to-gray-800",
    btnColor: "bg-yellow-500 hover:bg-yellow-600",
    textColor: "text-yellow-400",
    price: 10.99,
    genre: "Action, Drama",
    rating: "4.5/5"
  },
  {
    id: 6,
    title: "Thunderbolts",
    image: "/img/thunderbolts.jpg", // Changed path to public-relative
    date: "10/10/2025", 
    time: "08:00 PM",
    color: "from-blue-900 to-blue-800",
    btnColor: "bg-red-500 hover:bg-red-600",
    textColor: "text-red-400",
    genre: "Action, Adventure",
    price: 15.99,
    rating: "4.2/5"
  },
  {
    id: 7,
    title: "The Jawan",
    image: "/img/jawan.jpg", // Changed path to public-relative
    date: "11/11/2025",
    time: "07:00 PM",
    color: "from-green-900 to-green-800",
    btnColor: "bg-purple-500 hover:bg-purple-600",
    textColor: "text-purple-400",
    price: 13.99,
    genre: "Action, Thriller",
    rating: "4.8/5"
  },
  {
    id: 8,
    title: "GameChanger",
    image: "/img/gamechanger.webp", // Changed path to public-relative
    date: "12/12/2025",
    time: "05:00 PM",
    color: "from-pink-900 to-pink-800",
    btnColor: "bg-blue-500 hover:bg-blue-600",
    textColor: "text-blue-400",
    price: 14.99,
    genre: "Action, Sci-Fi",
    rating: "4.6/5"
  },

  
];

const reviews = [
  {
    id: 1,
    name: "John Doe",
    image: "/img/review1.jpg", // Changed path to public-relative
    comment: "Amazing experience! The movie was thrilling and the seats were comfortable.",
    rating: "★★★★★"
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "/img/review2.jpg", // Changed path to public-relative
    comment: "Loved the ambiance and the service. The movie selection is great!",
    rating: "★★★★☆"
  },
  {
    id: 3,
    name: "Alice Johnson",
    image: "/img/review3.jpeg", // Changed path to public-relative
    comment: "A fantastic place to watch movies. The sound and picture quality are top-notch.",
    rating: "★★★★★"
  },
];

export default function Movies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector(state => state.wishlist.items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const wishlistIds = useMemo(() => new Set(wishlist.map(m => m.id)), [wishlist]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselMovies.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

const toggleWishlist = (movie) => {
  if (!movie || !movie.id) return;
  
  if (wishlistIds.has(movie.id)) {
    dispatch(removeFromWishlist(movie.id));
    toast.success(`Removed ${movie.title} from wishlist`);
  } else {
    dispatch(addToWishlist({
      id: movie.id,
      title: movie.title,
      image: movie.image,
      date: movie.date || movie.day,
      time: movie.time,
      genre: movie.genre,
      rating: movie.rating,
      duration: movie.duration
    }));
    toast.success(`"${movie.title}" added to wishlist!`);
  }
};

const handleBookNow = (movie) => {
  // First dispatch the movie to Redux
  dispatch(setCurrentMovie({
    id: movie.id, // Make sure to include the id
    title: movie.title,
    price: movie.price,
    day: movie.day || 'Not specified',
    time: movie.time || 'Not specified',
    image: movie.image, // Include image if needed on next page
    genre: movie.genre // Include other relevant fields
  }));
  
  // Then navigate to seat selection
  navigate('/seat-selection', { replace: true });
};
  const goToPrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? carouselMovies.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselMovies.length);
      setIsTransitioning(false);
    }, 500);
  };

  // Image error handler
  const handleImageError = (e) => {
    e.target.src = '/img/placeholder.jpg'; // Add a fallback image
  };

  return (
    <div className="relative min-h-screen">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Carousel Section */}
      <section className="w-full p-4">
        <div className="relative">
          <div className="overflow-hidden relative h-[23rem] w-full">
            {carouselMovies.map((movie, index) => (
              <div 
                key={movie.id}
                className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } ${isTransitioning ? 'transition-all duration-500' : ''}`}
              >
                <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full h-full flex mx-4">
                  <div className="w-1/3 h-full relative">
                    <img 
                      src={movie.image} 
                      alt={movie.title} 
                      className="w-full h-full rounded-lg object-cover"
                      onError={handleImageError}
                    />
                    <button 
                      onClick={() => toggleWishlist(movie)}
                      className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                        wishlistIds.has(movie.id)
                          ? 'text-red-500 bg-white bg-opacity-30' 
                          : 'text-white bg-black bg-opacity-50'
                      }`}
                      aria-label={wishlistIds.has(movie.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <FaHeart size={24} />
                    </button>
                  </div>
                  <div className="w-2/3 pl-6 flex flex-col justify-between py-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-3">{movie.title}</h2>
                      <p className="text-gray-700 mb-4 line-clamp-3 font-bold">{movie.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-gray-600 font-bold">Day: {movie.day}</p>
                        <p className="text-gray-600 font-bold">Genre: {movie.genre}</p>
                        <p className="text-gray-600 font-bold">Time: {movie.time}</p>
                        <p className="text-gray-600 font-bold">Duration: {movie.duration}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleBookNow(movie)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg self-start transition-colors"
                      aria-label={`Book tickets for ${movie.title}`}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Previous movie"
          >
            <FaChevronLeft size={24} />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Next movie"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="py-8 px-4">
        <h1 className="text-center text-3xl font-bold">Now Showing</h1>
        <p className="text-center text-gray-600 mt-2 font-bold">Catch the latest movies at our theater!</p>
        
        <div className='flex justify-center items-center mt-8 gap-10 flex-wrap'>
          {nowShowingMovies.map((movie) => (
            <div 
              key={movie.id}
              className={`rounded-xl p-4 h-[40em] w-[20rem] flex flex-col bg-gradient-to-b ${movie.color} shadow-2xl hover:scale-105 transition-transform duration-300 group`}
            >
              <div className="overflow-hidden rounded-lg relative">
                <img 
                  src={movie.image} 
                  alt={movie.title} 
                  className="w-full h-[30rem] object-cover rounded-lg group-hover:opacity-90 transition-opacity duration-300"
                  onError={handleImageError}
                />
                <button 
                  onClick={() => toggleWishlist(movie)}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                    wishlistIds.has(movie.id)
                      ? 'text-red-500' 
                      : 'text-white bg-black bg-opacity-50'
                  }`}
                  aria-label={wishlistIds.has(movie.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <FaHeart size={24} />
                </button>
              </div>
              <div className="movie-info text-white mt-4 px-2">
                <h2 className={`text-2xl font-bold mb-2 ${movie.textColor}`}>{movie.title}</h2>
                <div className="mb-2">
                  <p className="text-gray-300">⭐ {movie.rating}</p>
                  <p className="text-gray-300">🎭 {movie.genre}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-300">📅 {movie.date}</p>
                    <p className="text-lg font-semibold text-gray-300">⏰ {movie.time}</p>
                  </div>
                  <button 
                    onClick={() => handleBookNow(movie)}
                    className={`${movie.btnColor} text-black font-bold py-2 px-4 rounded-lg transition-colors duration-200`}
                    aria-label={`Book tickets for ${movie.title}`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className='py-8 px-4 bg-gray-50'>
        <h1 className='text-center text-3xl font-bold'>People Review</h1>
        <p className='text-center text-gray-600 mt-2 font-bold'>What our customers are saying...</p>
        <div className='flex justify-center items-center mt-8 mb-10 gap-10 flex-wrap'>
          {reviews.map((review) => (
            <div key={review.id} className='p-6 w-[22rem] h-[22rem] bg-white rounded-lg shadow-md flex flex-col items-center text-center'>
              <div className="w-[10rem] h-[10rem] rounded-full border-4 border-white shadow-lg mb-4 overflow-hidden">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              <h2 className='text-xl font-bold'>{review.name}</h2>
              <div className='stars my-3 text-yellow-400 text-2xl'>{review.rating}</div>
              <p className='text-gray-700'>{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact-section" className="bg-gray-800 text-white py-6 text-center">
        <p className="text-sm mb-2">© {new Date().getFullYear()} Movie Ticket Booking. All rights reserved.</p>
        <p className="text-sm mb-4">Made with ❤️ by sumit</p>
        
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://facebook.com" className="text-white hover:text-blue-400 transition-colors" aria-label="Facebook">
            <FaFacebook size={20} />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-blue-400 transition-colors" aria-label="Twitter">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-pink-500 transition-colors" aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
          <a href="mailto:support@movieticket.com" className="text-white hover:text-red-400 transition-colors" aria-label="Email">
            <FaEnvelope size={20} />
          </a>
        </div>
        
        <p className="text-xs text-gray-400">
          Contact us at <a href="mailto:support@movieticket.com" className="text-blue-400 hover:underline">support@movieticket.com</a>
        </p>
      </footer>
    </div>
  );
}