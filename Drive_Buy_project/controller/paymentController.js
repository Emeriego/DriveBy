const { Payment, Booking } = require('../models');

const getPaymentWithBooking = async (req, res) => {
  const paymentId = req.params.id;

  const paymentWithBooking = await Payment.findOne({
    where: { id: paymentId },
    include: [
      {
        model: Booking,
        as: 'booking'
      }
    ]
  });

  res.json(paymentWithBooking);
};


const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const { amount, status } = req.body;

    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }

    await Payment.update({ amount, status }, { where: { id: paymentId } });

    const updatedPayment = await Payment.findByPk(paymentId);

    res.json(updatedPayment);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};


module.exports = {
  getPaymentWithBooking,
  updatePayment
};