import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaPhone, FaEnvelope, FaDownload, FaInfoCircle, FaHome } from 'react-icons/fa';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  // Get booking data from Redux store with proper fallbacks
  const booking = useSelector(state => state.booking.currentBooking) || {
    movie: {
      title: 'EndGame',
      image: '/img/endgame.jpg',
      theater: 'Cineplex Downtown',
      date: '2025-07-25',
      time: '7:30 PM'
    },
    seats: ['84', '81'],
    total: 24.00
  };

  // Safely format the total amount
  const formattedTotal = booking?.total?.toFixed?.(2) || '0.00';

  const handleDownloadTicket = () => {
    // Implement download functionality
    console.log('Downloading ticket...');
  };

  const handleViewDetails = () => {
    // Implement view details functionality
    console.log('Viewing booking details...');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
    

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Confirmation Header */}
          <div className="bg-green-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
                <p className="mt-1">Your tickets have been successfully booked</p>
              </div>
              <div className="bg-white text-green-500 p-2 rounded-full">
                <FaCheck className="h-8 w-8" />
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="p-6 border-b">
            <div className="flex items-start">
              {booking.movie?.image && (
                <img 
                  src={booking.movie.image} 
                  alt={booking.movie.title} 
                  className="w-24 h-32 object-cover rounded-lg mr-4"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{booking.movie?.title || 'Movie Title'}</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 text-gray-600">
                  <div>
                    <p className="text-sm text-gray-500">Theater</p>
                    <p>{booking.movie?.theater || 'Theater Name'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p>{booking.movie?.date || 'Date'} • {booking.movie?.time || 'Time'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p>{(booking.seats && booking.seats.join(', ')) || 'Seat Numbers'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-indigo-600 font-bold">${formattedTotal}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 flex flex-col sm:flex-row justify-between gap-4">
            <button 
              onClick={handleDownloadTicket}
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              <FaDownload className="mr-2" /> Download Ticket
            </button>
            <button 
              onClick={handleViewDetails}
              className="flex items-center justify-center px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
            >
              <FaInfoCircle className="mr-2" /> View Details
            </button>
            <button 
              onClick={handleBackToHome}
              className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <FaHome className="mr-2" /> Back to Home
            </button>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-full mr-4">
                <FaPhone className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Contact Support</h4>
                <p className="text-sm text-gray-500">Call us at +1 (555) 123-4567 for immediate assistance</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-full mr-4">
                <FaEnvelope className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Email Support</h4>
                <p className="text-sm text-gray-500">Send us an email at support@movietix.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmation;