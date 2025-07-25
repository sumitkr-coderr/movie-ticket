import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const images = [
  '/img/images1.jpeg',
  '/img/images2.jpeg',
  '/img/image3.jpeg'
];

const Login = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle authentication
    // For demo purposes, we'll just show success and navigate
    
    toast.success('You have successfully logged in!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    
    // Navigate to home after 1 second
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleSignUp = () => {
    navigate('/register'); // Or your signup route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[800px] flex rounded-lg overflow-hidden shadow-lg bg-gray-800">
        {/* Left side - Carousel */}
        <div className="w-1/2 h-[500px] relative">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Right side - Login Form */}
        <div className="w-1/2 p-10 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back,</h2>
          <p className="mb-6 text-sm text-gray-400">Sign in to your account</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter password"
                required
              />
              <p className="text-xs mt-2 text-right text-gray-400 cursor-pointer hover:underline">Forgot password?</p>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-500 hover:bg-red-600 rounded text-white font-semibold"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm mt-6 text-center">
            Don't have an account? 
            <span 
              className="text-red-400 hover:underline cursor-pointer ml-1"
              onClick={handleSignUp}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;