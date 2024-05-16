const { Booking, User, Car } = require('../models');
const moment = require('moment');




const getCarBookings = async (req, res) => {
  const { car_id } = req.params;

  try {
    const bookings = await Booking.findAll({
      where: { car_id },
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: Car,
          as: 'car',
        },
      ],
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, as: 'user' },
        { model: Car, as: 'car' }
      ]
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving booking details' });
  }
};

const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await Booking.findOne({
      where: { id: bookingId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'], // Only include id and username fields of the user
        },
        {
          model: Car,
          as: 'car',
          attributes: ['id', 'model', 'brand'], // Only include id, model, and brand fields of the car
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error retrieving booking:', error);
    res.status(500).json({ error: error.message });
  }
};


const bookCar = async (req, res) => {
    try {
        const { user_id, car_id, start_date, end_date, total_price, total_hours } = req.body;
        // const car_id = req.params.car_id;

        const newBooking = await Booking.create({
            user_id,
            car_id,
            start_date,
            end_date,
            total_price,
            total_hours,
            status: 'Pending'
        });

        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ message: 'Error booking car', error: err });
    }
};

const createBookcar = async (req, res) => {
  const data = req.body;

  try {
    // Find the user and car
    const user = await User.findByPk(req.user.id);
    const car = await Car.findByPk(data.car_id);

    if (!user || !car) {
      return res.status(400).json({ error: 'User or Car not found' });
    }

    // Convert formatted date strings to Date objects
    const startDate = moment(data.startDate, "DD MM YYYY HH:mm").format("YYYY-MM-DD HH:mm");
    const endDate = moment(data.endDate, "DD MM YYYY HH:mm").format("YYYY-MM-DD HH:mm");

    // Create the bookcar
    const bookcar = await Booking.create({
      user_id: user.id,
      car_id: car.id,
      start_date: startDate,
      end_date: endDate,
      total_hours: data.totalHours,
      total_price: data.totalPrice,
      status: data.status
    });

    // Fetch the bookcar along with its associated user and car
    const bookcarWithAssociations = await Booking.findOne({
      where: { id: bookcar.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
        {
          model: Car,
          as: 'car',
          attributes: ['id', 'brand', 'model'],
        },
      ],
    });

    // Format dates as desired
    const from = new Date(bookcarWithAssociations.start_date).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const to = new Date(bookcarWithAssociations.end_date).toISOString().replace(/T/, ' ').replace(/\..+/, '');

    console.log(from, to); // Add this line

    // Sending response with formatted dates
    res.json({
      ...bookcarWithAssociations.toJSON(),
      from, // Changed key from 'start_date' to 'from'
      to // Changed key from 'end_date' to 'to'
    });
  } catch (error) {
    console.error('Error creating bookcar:', error);
    res.status(500).json({ error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user's ID is available in req.user.id

    const bookings = await Booking.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'], // Only include id and username fields of the user
        },
        {
          model: Car,
          as: 'car',
          attributes: ['id', 'model', 'brand'], // Only include id, model, and brand fields of the car
        },
      ],
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error retrieving user bookings:', error);
    res.status(500).json({ error: error.message });
  }
};


const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving all bookings', error: err });
    }
};


const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.bookingId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'], // Only include id and username fields of the user
        },
        {
          model: Car,
          as: 'car',
          attributes: ['id', 'brand', 'model'], // Only include id, brand, and model fields of the car
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Confirm the booking
    booking.status = 'Confirmed';
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ error: error.message });
  }
};
const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.bookingId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'], // Only include id and username fields of the user
        },
        {
          model: Car,
          as: 'car',
          attributes: ['id', 'brand', 'model'], // Only include id, brand, and model fields of the car
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Complete the booking
    booking.status = 'Completed';
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error('Error completing booking:', error);
    res.status(500).json({ error: error.message });
  }
};

const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.bookingId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'], // Only include id and username fields of the user
        },
        {
          model: Car,
          as: 'car',
          attributes: ['id', 'brand', 'model'], // Only include id, brand, and model fields of the car
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Reject the booking
    booking.status = 'Rejected';
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error('Error rejecting booking:', error);
    res.status(500).json({ error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.bookingId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'], // Only include id and username fields of the user
        },
        {
          model: Car,
          as: 'car',
          attributes: ['id', 'brand', 'model'], // Only include id, brand, and model fields of the car
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Cancel the booking
    booking.status = 'Cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: error.message });
  }
};

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { car_id: req.params.car_id },
      include: [
        { model: Car, as: 'car' }
      ]
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving booking', error: err });
  }
};




const updateBookingToCompleted = async (req, res) => {
    try {
        const booking = await Booking.update({ status: 'completed' }, { where: { id: req.params.id } });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: 'Error updating booking to completed', error: err });
    }
};


module.exports = {
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
};
