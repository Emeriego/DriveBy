const validateReview = (review) => {
    const { user_id, car_id, rating, comment } = review;
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
    if (rating === undefined) {
        console.log('Missing rating');
        errors.push({ type: 'required', message: "The 'rating' field is required.", field: 'rating' });
    }
    if (!comment) {
        console.log('Missing comment');
        errors.push({ type: 'required', message: "The 'comment' field is required.", field: 'comment' });
    }

    return errors;
};

const validateReviewMiddleware = (req, res, next) => {
    const errors = validateReview(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};

module.exports = {
    validateReview,
    validateReviewMiddleware
};