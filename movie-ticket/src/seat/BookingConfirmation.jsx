import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addTicket } from '../Redux/ticketsSlice'; // You'll need to create this slice

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movie, seats, total, bookingDate } = state || {};

  const referenceNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

  const handleDownload = () => {
    // Create ticket object
    const newTicket = {
      id: `TK-${referenceNumber}`,
      movie: movie.title,
      date: movie.day,
      time: movie.time,
      seats: seats,
      theater: 'Cineplex Downtown', // You might want to get this from state
      screen: 'Screen 1', // You might want to get this from state
      price: total,
      qrCode: '/img/qr-sample.png',
      bookingDate: bookingDate
    };

    // Dispatch action to save ticket to Redux store
    dispatch(addTicket(newTicket));

    toast.success('Tickets downloaded and saved to your account!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });

    // You can also implement actual download logic here if needed
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans">
        <ToastContainer />

        {/* Success Header */}
        <div className="bg-green-500 text-white p-4 rounded-t-md flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Booking Confirmed!</h1>
            <p className="text-sm">Your reference number: <span className="font-mono">{referenceNumber}</span></p>
          </div>
          <div className="text-4xl">✅</div>
        </div>

        {/* Movie Details */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Movie Details</h2>
          <div className="flex items-start space-x-4">
            <img 
              src={movie?.image || '/img/placeholder.jpg'} 
              alt={movie?.title} 
              className="w-20 h-28 object-cover rounded-md"
            />
            <div>
              <p className="font-bold text-lg">{movie?.title || 'Movie Title'}</p>
              <p className="text-gray-600">{movie?.day} at {movie?.time}</p>
              <p className="text-gray-500 text-sm mt-1">Booked on: {bookingDate}</p>
            </div>
          </div>

          {/* Seat and Payment Info */}
          <div className="flex justify-between items-center mt-6">
            <div>
              <p className="text-sm text-gray-600">Seats</p>
              <p className="font-medium">{seats?.join(', ') || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="font-bold text-green-600">${total?.toFixed(2) || '0.00'}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleDownload}
              className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Save Tickets
            </button>
            <button
              onClick={() => navigate('/tickets')}
              className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
              </svg>
              View My Tickets
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </div>
      
      <footer className="bg-gray-800 text-white py-6 text-center mt-10">
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
    </>
  );
};

export default BookingConfirmation;