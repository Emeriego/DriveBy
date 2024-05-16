const validateLocation = (location) => {
    const { name, address, latitude, longitude } = location;
    let errors = [];

    // Check for missing required fields
    if (!name) {
        console.log('Missing name');
        errors.push({ type: 'required', message: "The 'name' field is required.", field: 'name' });
    }
    if (!address) {
        console.log('Missing address');
        errors.push({ type: 'required', message: "The 'address' field is required.", field: 'address' });
    }
    if (!latitude) {
        console.log('Missing latitude');
        errors.push({ type: 'required', message: "The 'latitude' field is required.", field: 'latitude' });
    }
    if (!longitude) {
        console.log('Missing longitude');
        errors.push({ type: 'required', message: "The 'longitude' field is required.", field: 'longitude' });
    }

    return errors;
};

const validateLocationMiddleware = (req, res, next) => {
    const errors = validateLocation(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};

module.exports = {
    validateLocation,
    validateLocationMiddleware
};