import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import PageLayout from './pages/PageLayout'
import Dashboard from './pages/Dashboard'
import Guide from './pages/Guide'
import Profile from './pages/Profile'
// import Car2 from './pages/Car2'
import CarDetail from './pages/Car2'

import CreateBooking from './pages/CreateBooking'
import CarReviews from './pages/CarReviews'
import Booking from './pages/Booking'
import CreateCar from './pages/CreateCar'
import CreateMessage from './pages/CreateMessage'
import CreateCarReview from './pages/CreateCarReview'
import CreateUserReview from './pages/CreateUserReview'

import Categories from './pages/Categories'
import Index from './pages/Index'

import UnrestrictedRoute from './utils/UnrestrictedRoute';
import RestrictedRoute from './utils/RestrictedRoute';
// import { loadReviews } from './utils/LoadReviews'
import { useDispatch } from 'react-redux'



import './App.css'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 1000,
});
function App() {
  const dispatch = useDispatch()
  const allCarReviews = useSelector(state => state.reviews.allCarReviews)

  useEffect(() => {
   
  }, []);
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnrestrictedRoute element={<PageLayout />} />}>
          <Route index element={<Index />} />
          <Route path="/Home" element={<UnrestrictedRoute element={<Home />} />}/>
          <Route path="/login" element={<UnrestrictedRoute element={<Login />} />} />
          <Route path="/msg" element={<UnrestrictedRoute element={<CarReviews />} />} />
          <Route path="/signup" element={<UnrestrictedRoute element={<Signup />} />} />
          <Route path="/dashboard" element={<RestrictedRoute element={<Dashboard />} />} />
          <Route path="/guide" element={<UnrestrictedRoute element={<Guide />} />} />
          <Route path="/contact" element={<UnrestrictedRoute element={<Contact />} />} />
          <Route path="/profile" element={<RestrictedRoute element={<Profile />} />} />
          <Route path="/cars/:car_id" element={<UnrestrictedRoute element={<CarDetail />} />} />
          <Route path="/book/:car_id" element={<UnrestrictedRoute element={<CreateBooking />} />} />
          <Route path="/cars/:car_id/reviews" element={<UnrestrictedRoute element={<CarReviews />} />} />
          <Route path="/cars/:car_id/bookings/:booking_id" element={<RestrictedRoute element={<Booking />} />} />
          <Route path="/createcar" element={<RestrictedRoute element={<CreateCar />} />} />
          {/* <Route path="/messages" element={<RestrictedRoute element={<Messages />} />} /> */}
          <Route path="/messages/create" element={<RestrictedRoute element={<CreateMessage />} />} />
          {/* <Route path="/bookings" element={<RestrictedRoute element={<Bookings />} />} /> */}
          <Route path="/review/car/:car_id/create" element={<RestrictedRoute element={<CreateCarReview />} />} />
          <Route path="/review/user/:user_id/create" element={<RestrictedRoute element={<CreateUserReview />} />} />
          <Route path="/categories" element={<UnrestrictedRoute element={<Categories />} />} />
          <Route path="*" element={<UnrestrictedRoute element={<NotFound />} />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
