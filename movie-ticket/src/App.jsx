import { Routes, Route, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/configureStore';
import Header from './component/Header';
import Movies from './component/Movies';
import Wishlist from './component/Wishlist';
import MovieCard from './movie/MovieCard';
import MovieDetails from './seat/MovieDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import SeatSelection from './seat/SeatSelection';
import BookingConfirmation from './seat/BookingConfirmation';
import PaymentOptions from './payment/PaymentOptions';
import Paymentpage from './payment/Paymentpage';
import Ticket from './component/Ticket';
import Login from './joinus/Login';
import Register from './joinus/Register';

export default function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Movies />} />
          <Route path="movies" element={<Movies />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="movie-card/:id" element={<MovieCard />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="seat-selection" element={<SeatSelection />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="payment-options" element={<PaymentOptions/>} />
          <Route path="/payment" element={<Paymentpage />} />
          <Route path="tickets" element={<Ticket />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      
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
    </Provider>
  );
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}