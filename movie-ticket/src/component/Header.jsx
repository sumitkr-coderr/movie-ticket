import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaHeart, 
  FaTicketAlt, 
  FaPhone, 
  FaUser, 
  FaSignInAlt, 
  FaUserPlus,
  FaSearch
} from 'react-icons/fa';

export default function Header() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-50" >
      <header className="bg-gray-800 text-white p-4 flex items-center justify-between h-20 shadow-lg">
        
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold ml-4 flex items-center pl-5">
            <FaTicketAlt className="mr-2 text-green-400" />
            Movie Ticket Booking
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="mr-4 pr-15 " >
          <ul className="flex space-x-6 text-lg items-center">
            <li>
              <Link 
                to="/" 
                className="hover:underline hover:text-green-400 transition duration-300 flex items-center"
              >
                <FaHome className="mr-1" /> Home
              </Link>
            </li>
            <li>
              <Link 
                to="/wishlist" 
                className="hover:underline hover:text-green-400 transition duration-300 flex items-center"
              >
                <FaHeart className="mr-1" /> WishList
              </Link>
            </li>
            <li>
              <Link 
                to="/tickets" 
                className="hover:underline hover:text-green-400 transition duration-300 flex items-center"
              >
                <FaTicketAlt className="mr-1" /> Tickets
              </Link>
            </li>
            <li>
              <button
                onClick={scrollToContact}
                className="hover:underline hover:text-green-400 transition duration-300 flex items-center"
              >
                <FaPhone className="mr-1" /> Contact Us
              </button>
            </li>
            
            {/* Join Us Dropdown */}
            <li className="group relative">
              <button className="hover:underline hover:text-green-400 transition duration-300 flex items-center">
                <FaUser className="mr-1" /> Join Us
              </button>
              <div className="absolute hidden group-hover:block bg-gray-700 rounded-md shadow-lg z-10 w-48 right-0">
                <Link 
                  to="/login" 
                  className="block px-4 py-2 hover:bg-gray-600 hover:text-green-400 transition duration-300 flex items-center"
                >
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-4 py-2 hover:bg-gray-600 hover:text-green-400 transition duration-300 flex items-center"
                >
                  <FaUserPlus className="mr-2" /> Register
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}