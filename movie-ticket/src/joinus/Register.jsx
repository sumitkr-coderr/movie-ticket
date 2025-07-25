import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
 
    
    toast.success('🎉 You have successfully registered!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        fontSize: '1.1rem',
        padding: '16px 24px'
      }
    });
    
    // Navigate to home after 1.5 seconds
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-4xl flex rounded-xl overflow-hidden shadow-2xl bg-gray-800">
        {/* Left Side - Background Image */}
        <div className="hidden md:block md:w-1/2 h-[650px] relative">
          <img
            src="/img/bg.webp"
            alt="Background"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <h3 className="text-3xl font-bold mb-2">Welcome to Movie Ticket Booking</h3>
            <p className="text-gray-300">Join our community of movie enthusiasts</p>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 text-white">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Create your account</h2>
            <p className="text-lg text-gray-400">Start your movie journey today</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-3 text-lg rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-5 py-3 text-lg rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-5 py-3 text-lg rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                minLength="6"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-lg transition-colors duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-lg mt-8 text-center text-gray-400">
            Already have an account?{' '}
            <span 
              onClick={handleSignIn}
              className="text-blue-400 hover:underline cursor-pointer font-medium"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;