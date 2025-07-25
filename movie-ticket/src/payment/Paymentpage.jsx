import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCreditCard, 
  FaPaypal, 
  FaGooglePay, 
  FaApplePay, 
  FaFilm, 
  FaChair, 
  FaArrowLeft,
  FaCheck
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { completeBooking, clearBooking } from '../Redux/bookingSlice';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const booking = useSelector(state => state.booking);
  const { currentMovie: selectedMovie, selectedSeats, totalAmount } = booking;

  const paymentMethods = [
    { id: 'credit', name: 'Credit Card', icon: <FaCreditCard size={24} /> },
    { id: 'paypal', name: 'PayPal', icon: <FaPaypal size={24} /> },
    { id: 'google', name: 'Google Pay', icon: <FaGooglePay size={24} /> },
    { id: 'apple', name: 'Apple Pay', icon: <FaApplePay size={24} /> }
  ];

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    const confirmationData = {
  movie: {
   title: selectedMovie.title,
      day: selectedMovie.day,
      time: selectedMovie.time,
      image: selectedMovie.image || '/default-movie.jpg' 
  },
  seats: selectedSeats,
  total: totalAmount,
  bookingDate: new Date().toLocaleString()
};

    setIsProcessing(true);
    
    try {
      // 1. Simulate payment processing (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 2. Show success animation
      setShowSuccess(true);
      
      // 3. Prepare confirmation data
      const confirmationData = {
        movie: selectedMovie,
        seats: selectedSeats,
        total: totalAmount,
        bookingDate: new Date().toLocaleString()
      };
      
      // 4. Wait for animation to complete (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 5. Navigate to BookingConfirmation page with data
      navigate('/booking-confirmation', { state: confirmationData });
      
      // 6. Clear booking state
      dispatch(clearBooking());
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!selectedMovie || !selectedSeats) {
    return (
      <div className="container mx-auto p-4">
        <p>Redirecting to seat selection...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl relative">
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
      />
      
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-center text-white p-8"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <FaCheck className="w-24 h-24 mx-auto text-green-500" />
              </motion.div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold mb-2"
              >
                Payment Successful!
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl"
              >
                Preparing your tickets...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of your payment page UI */}
      <button 
        onClick={() => navigate('/seat-selection')}
        className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to seat selection
      </button>

      <h1 className="text-3xl font-bold mb-8">Complete Your Payment</h1>
      
      <div className="grid md:grid-cols-3 gap-8">

        <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Booking Details</h2>
          
          <div className="flex items-start mb-4">
            <FaFilm className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">{selectedMovie.title}</h3>
              <p className="text-gray-600">{selectedMovie.day} at {selectedMovie.time}</p>
            </div>
          </div>
          
          <div className="flex items-start mb-6">
            <FaChair className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Selected Seats</h3>
              <p className="text-gray-600">{selectedSeats.join(', ')}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${(totalAmount * 0.9).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (10%):</span>
              <span>${(totalAmount * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Payment Method</h2>
          
          <div className="space-y-3">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                onClick={() => !showSuccess && setSelectedMethod(method.id)}
                className={`p-4 border rounded-lg flex items-center transition-all ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                } ${showSuccess ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
              >
                <span className="mr-3">{method.icon}</span>
                <span>{method.name}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing || !selectedMethod || showSuccess}
            className={`w-full py-3 px-4 rounded-lg text-white font-bold transition-colors ${
              isProcessing || !selectedMethod || showSuccess
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Pay $${totalAmount.toFixed(2)}`
            )}
          </button>
        </div>
       
      </div>

    </div>
  );
};

export default PaymentPage;