const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const { 
    getAllBookings,
    getUserBookings,
    updateBookingToCompleted,
    confirmBooking,
    rejectBooking,
    cancelBooking,
    bookCar,
    getBookingDetails,
    getBooking,
    completeBooking,
    getCarBookings,
    createBookcar,
    getBookingById
} = require('../controller/bookingController');
// const { validateBooking, validateBookingMiddleware } = require('../middleware/Validation/validatebooking');


router.post('/api/cars/book/', bookCar);
router.get('/api/bookings/', getAllBookings);
router.get('/api/bookings/:bookingId/booking/', getBookingById);
router.get('/api/bookings/user/', passport.authenticate('bearer', { session: false }), getUserBookings);
router.get('/api/bookings/:car_id', getCarBookings);
// router.patch('/api/cars/book/:id', updateBookingToCompleted);
// router.patch('/api/bookings/:id/confirm', confirmBooking);
// router.patch('/api/bookings/:id/reject', rejectBooking);
// router.delete('/api/bookings/:id', cancelBooking);
// router.get('/api/bookings/:id/details', getBookingDetails);
// router.get('/api/bookings/:car_id', getBooking);
// router.post('/api/cars/book/:car_id', passport.authenticate('bearer', { session: false }), completeBooking);
router.post('/api/cars/book/:car_id', passport.authenticate('bearer', { session: false }), createBookcar);
router.post('/api/bookings/:bookingId/confirm/', passport.authenticate('bearer', { session: false }), confirmBooking);
router.post('/api/bookings/:bookingId/complete/', passport.authenticate('bearer', { session: false }), completeBooking);
router.post('/api/bookings/:bookingId/reject/', passport.authenticate('bearer', { session: false }), rejectBooking);
router.post('/api/bookings/:bookingId/cancel/',  cancelBooking);

module.exports = router;
