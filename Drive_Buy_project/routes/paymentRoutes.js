const express = require('express');
const router = express.Router();
const { getPaymentWithBooking, updatePayment } = require('../controller/paymentController');

// Get a payment with its booking
// router.get('/getPaymentWithBooking/:id', getPaymentWithBooking);

// Update a payment
router.put('/updatePayment/:id', updatePayment);

module.exports = router;



module.exports = router;