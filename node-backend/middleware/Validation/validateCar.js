

const validateCar = (car) => {
    const { make, model, year, category_id, location_id, status } = car;
    let errors = [];

    // Check for missing required fields
    if (!make) {
        console.log('Missing make');
        errors.push({ type: 'required', message: "The 'make' field is required.", field: 'make' });
    }
    if (!model) {
        console.log('Missing model');
        errors.push({ type: 'required', message: "The 'model' field is required.", field: 'model' });
    }
    if (!year) {
        console.log('Missing year');
        errors.push({ type: 'required', message: "The 'year' field is required.", field: 'year' });
    }
    if (!category_id) {
        console.log('Missing category');
        errors.push({ type: 'required', message: "The 'category_id' field is required.", field: 'category' });
    }
    if (!location_id) {
        console.log('Missing location_id');
        errors.push({ type: 'required', message: "The 'location_id' field is required.", field: 'location_id' });
    }
    if (!status) {
        console.log('Missing status');
        errors.push({ type: 'required', message: "The 'status' field is required.", field: 'status' });
    }

    return errors;
};


const validateCarMiddleware = (req, res, next) => {
    const errors = validateCar(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};

module.exports = {
    validateCar,
    validateCarMiddleware
};
