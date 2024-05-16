const validateBooking = (booking) => {
    const { user_id, car_id, from_date, to_date, status } = booking;
    let errors = [];

    // Check for missing required fields
    if (!user_id) {
        console.log('Missing user_id');
        errors.push({ type: 'required', message: "The 'user_id' field is required.", field: 'user_id' });
    }
    if (!car_id) {
        console.log('Missing car_id');
        errors.push({ type: 'required', message: "The 'car_id' field is required.", field: 'car_id' });
    }
    if (!from_date) {
        console.log('Missing from_date');
        errors.push({ type: 'required', message: "The 'from_date' field is required.", field: 'from_date' });
    }
    if (!to_date) {
        console.log('Missing to_date');
        errors.push({ type: 'required', message: "The 'to_date' field is required.", field: 'to_date' });
    }
    if (!status) {
        console.log('Missing status');
        errors.push({ type: 'required', message: "The 'status' field is required.", field: 'status' });
    }

    // Check if from_date is a valid date
    if (from_date && isNaN(Date.parse(from_date))) {
        console.log('Invalid from_date');
        errors.push({ type: 'invalid', message: "The 'from_date' field must be a valid date.", field: 'from_date' });
    }

    // Check if to_date is a valid date
    if (to_date && isNaN(Date.parse(to_date))) {
        console.log('Invalid to_date');
        errors.push({ type: 'invalid', message: "The 'to_date' field must be a valid date.", field: 'to_date' });
    }

    // Check if from_date is before to_date
    if (from_date && to_date && Date.parse(from_date) > Date.parse(to_date)) {
        console.log('Invalid date range');
        errors.push({ type: 'invalid', message: "The 'from_date' must be before the 'to_date'.", field: 'date_range' });
    }

    return errors;
};

const validateBookingMiddleware = (req, res, next) => {
    const errors = validateBooking(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};

module.exports = {
    validateBooking,
    validateBookingMiddleware
};