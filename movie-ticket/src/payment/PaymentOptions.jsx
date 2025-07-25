      import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaFilm, FaChair, FaArrowLeft } from 'react-icons/fa';

const PaymentOptions = () => {
  const navigate = useNavigate();
  const { selectedMovie, selectedSeats, totalAmount } = useSelector(state => state.booking);

  // Redirect if no booking data
  useEffect(() => {
    if (!selectedMovie || !selectedSeats) {
      navigate('/seat-selection');
    }
  }, [selectedMovie, selectedSeats, navigate]);

  if (!selectedMovie || !selectedSeats) {
    return <div className="container mx-auto p-4">Redirecting...</div>;
  }

  return (
    <div className="container mx-auto p-4">
     <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back to seat selection
      </button>

      <h2 className="text-2xl font-bold mb-6">Complete Your Booking</h2>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Booking Details</h3>
        
        <div className="flex items-center mb-3">
          <FaFilm className="text-blue-500 mr-2" />
          <div>
            <p className="font-semibold">Movie:</p>
            <p>{selectedMovie.title}</p>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <FaChair className="text-blue-500 mr-2" />
          <div>
            <p className="font-semibold">Selected Seats:</p>
            <p>{selectedSeats.join(', ')}</p>
          </div>
        </div>

        <div className="border-t pt-3 mt-3">
          <p className="flex justify-between">
            <span>Price per seat:</span>
            <span>${selectedMovie.price.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Number of seats:</span>
            <span>{selectedSeats.length}</span>
          </p>
          <p className="flex justify-between font-bold text-lg mt-2">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* Payment methods would go here */}
      <div className="text-center py-8">
        <h3 className="text-xl font-bold mb-4">Payment Methods Coming Soon</h3>
        <p>This is where payment options would be displayed</p>
      </div>
      <button 
        onClick={() => navigate('/confirmation')}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"     
      >
        Confirm Booking
      </button>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Thank you for choosing our service!</p>


    </div>
    </div>
  );
};

export default PaymentOptions;