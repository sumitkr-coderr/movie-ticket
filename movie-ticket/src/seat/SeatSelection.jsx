import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaChair } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectSeats } from '../Redux/bookingSlice';

const SeatSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentMovie } = useSelector(state => state.booking);
  const bookedSeats = useSelector(state => state.booking?.selectedSeats || []);

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentMovie) {
      toast.error('No movie selected! Redirecting...');
      navigate('/movies');
      return;
    }

    const rows = ['A', 'B', 'C', 'D', 'E'];
    const columns = 10;
    setSeats(
      rows.flatMap(row =>
        Array.from({ length: columns }, (_, i) => `${row}${i + 1}`)
      )
    );

    setIsLoading(false);
  }, [currentMovie, navigate]);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      toast.warning(`Seat ${seatId} is already booked!`);
      return;
    }

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }

    if (!currentMovie?.price) {
      toast.error('Invalid movie pricing');
      return;
    }

    const total = selectedSeats.length * currentMovie.price;

    dispatch(selectSeats({
      seats: selectedSeats,
      total,
      movie: currentMovie
    }));

    toast.success('Seats confirmed! Redirecting...', {
      autoClose: 1000,
      onClose: () => {
        setTimeout(() => {
          navigate('/payment', {
            state: {
              bookingCompleted: true,
              timestamp: Date.now()
            }
          });
        }, 100);
      }
    });
  };

  if (isLoading || !currentMovie) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h2 className="text-2xl font-bold text-center mb-6">Select Your Seats</h2>

      {/* Screen Indicator */}
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 text-black text-sm font-semibold rounded-b-xl px-10 py-2 shadow-inner">
          SCREEN
        </div>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-10 gap-3 justify-center mb-10">
        {seats.map((seatId) => {
          const isBooked = bookedSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              disabled={isBooked}
              className={`w-10 h-10 flex items-center justify-center rounded-md transition-all duration-300 ${
                isBooked
                  ? 'bg-red-600 cursor-not-allowed'
                  : isSelected
                  ? 'bg-green-500'
                  : 'bg-indigo-600 hover:bg-indigo-500'
              } text-white shadow-md`}
              title={seatId}
            >
              <FaChair />
            </button>
          );
        })}
      </div>

      {/* Booking Summary */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 shadow-lg border border-gray-700 max-w-md mx-auto">
        <h2 className="font-bold text-xl mb-3 text-purple-400">Booking Summary</h2>
        <div className="space-y-2 text-sm text-gray-200">
          <p><span className="font-medium text-white">Movie:</span> {currentMovie.title}</p>
          <p><span className="font-medium text-white">Showtime:</span> {currentMovie.day} at {currentMovie.time}</p>
          <p><span className="font-medium text-white">Price per seat:</span> ${currentMovie.price?.toFixed(2) || '0.00'}</p>
          <p>
            <span className="font-medium text-white">Selected seats:</span>{' '}
            {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
          </p>
          <p className="font-bold text-lg pt-2 border-t border-gray-600 mt-2 text-white">
            Total: ${(selectedSeats.length * (currentMovie.price || 0)).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="max-w-md mx-auto">
        <button
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
          className={`w-full py-3 px-4 rounded-lg text-white font-bold transition-all duration-300 ${
            selectedSeats.length === 0
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md'
          }`}
        >
          {selectedSeats.length > 0
            ? `Confirm ${selectedSeats.length} Seat(s) - $${(selectedSeats.length * (currentMovie.price || 0)).toFixed(2)}`
            : 'Select Seats to Continue'}
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
