const { check, validationResult } = require('express-validator');
const moment = require('moment');
const validator = require('validator');


const validateUserSignup = (req, res, next) => {
    console.log('validateUserSignup called'); 
    const { firstname, lastname, username, email, phone, password, cpassword, city, address } = req.body;
    const errors = [];

    // Check for missing required fields
    if (!firstname) {
        console.log('Missing firstname');
        errors.push({ type: 'required', message: "The 'firstname' field is required.", field: 'firstname' });
    }
    if (!lastname) {
        console.log('Missing lastname');
        errors.push({ type: 'required', message: "The 'lastname' field is required.", field: 'lastname' });
    }
    if (!username) {
        console.log('Missing username');
        errors.push({ type: 'required', message: "The 'username' field is required.", field: 'username' });
    }
    if (!email) {
        console.log('Missing email');
        errors.push({ type: 'required', message: "The 'email' field is required.", field: 'email' });
    }
    if (!phone) {
        console.log('Missing phone');
        errors.push({ type: 'required', message: "The 'phone' field is required.", field: 'phone' });
    }
    if (!password) {
        console.log('Missing password');
        errors.push({ type: 'required', message: "The 'password' field is required.", field: 'password' });
    }
    if (!cpassword) {
        console.log('Missing confirm password');
        errors.push({ type: 'required', message: "The 'confirm password' field is required.", field: 'cpassword' });
    }
    if (!city) {
        console.log('Missing city');
        errors.push({ type: 'required', message: "The 'city' field is required.", field: 'city' });
    }
    if (!address) {
        console.log('Missing address');
        errors.push({ type: 'required', message: "The 'address' field is required.", field: 'address' });
    }

    // If there are any errors, return them
    if (errors.length > 0) {
        console.log('Validation errors:', errors);
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors
        });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        console.log('Invalid email format');
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate first name
    if (!validator.isAlpha(firstname)) {
        console.log('Invalid first name');
        return res.status(400).json({ error: 'Invalid first name' });
    }

    // Validate last name
    if (!validator.isAlpha(lastname)) {
        console.log('Invalid last name');
        return res.status(400).json({ error: 'Invalid last name' });
    }

    // Validate username
    if (!validator.isAlphanumeric(username)) {
        console.log('Invalid username');
        return res.status(400).json({ error: 'Invalid username' });
    }

    // Validate phone
    if (!validator.isMobilePhone(phone)) {
        console.log('Invalid phone number');
        return res.status(400).json({ error: 'Invalid phone number' });
    }

    // Validate city and address (assuming they should only contain letters and spaces)
    if (!validator.matches(city, /^[a-zA-Z\s]*$/)) {
        console.log('Invalid city name');
        return res.status(400).json({ error: 'Invalid city name' });
    }
    if (!validator.matches(address, /^[a-zA-Z0-9\s,]*$/)) {
        console.log('Invalid address');
        return res.status(400).json({ error: 'Invalid address' });
    }

    // Validate password length
    if (password.length < 8) {
        console.log('Password too short');
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    console.log('validateUserSignup completed without errors');
    next();
};
const userValidation = function (req, res, next) {
    console.log('Validating request:', req.body); // Log the request body

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next(); // No validation errors, proceed to the next middleware
    }

    // Extract and format validation errors
    const errorMessages = errors.array().map(error => ({
        field: error.param,
        message: error.msg
    }));

    console.log('Validation errors:', errorMessages);

    // Return a 400 response with all validation errors
    return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
    });
}

const validateUserLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    // Check for missing required fields
    
    if (!email) {
        errors.push({ type: 'required', message: "The 'email' field is required.", field: 'email' });
    }
    if (!password) {
        errors.push({ type: 'required', message: "The 'password' field is required.", field: 'password' });
    }

    // If there are any errors, return them
    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors
        });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    next(); // Proceed to the next middleware if all validations pass
};


const validateGetUser = (req, res, next) => {
    const { id } = req.params;
    const errors = [];

    if (!id) {
        errors.push({ type: 'required', message: "The 'id' field is required.", field: 'id' });
    }

    if (!validator.isInt(id)) {
        errors.push({ type: 'invalid', message: 'ID must be a valid integer', field: 'id' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors: errors });
    }

    next();
};

const validateGetUsers = (req, res, next) => {
    next();
};

const validateUpdateUser = (req, res, next) => {
    const { id } = req.params;
    const { firstname, lastname, username, email, phone, password, cpassword, city, address } = req.body;
    const errors = [];

    if (!id) {
        errors.push({ type: 'required', message: "The 'id' field is required.", field: 'id' });
    }

    if (!validator.isInt(id)) {
        errors.push({ type: 'invalid', message: 'ID must be a valid integer', field: 'id' });
    }

    if (firstname && !validator.isAlpha(firstname)) {
        errors.push({ type: 'invalid', message: 'First name must only contain letters', field: 'firstname' });
    }

    if (lastname && !validator.isAlpha(lastname)) {
        errors.push({ type: 'invalid', message: 'Last name must only contain letters', field: 'lastname' });
    }

    if (email && !validator.isEmail(email)) {
        errors.push({ type: 'invalid', message: 'Email must be a valid email address', field: 'email' });
    }

    if (password && password.length < 8) {
        errors.push({ type: 'invalid', message: 'Password must be at least 8 characters long', field: 'password' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors: errors });
    }

    next();
};

const validateDeleteUser = (req, res, next) => {
    const { id } = req.params;
    const errors = [];

    if (!id) {
        errors.push({ type: 'required', message: "The 'id' field is required.", field: 'id' });
    }

    if (!validator.isInt(id)) {
        errors.push({ type: 'invalid', message: 'ID must be a valid integer', field: 'id' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors: errors });
    }

    next();
};


const validateCreateAdmin = (req, res, next) => {
    console.log('validateCreateAdmin called'); 

    if (!req.body) {
        console.log('Missing request body');
        return res.status(400).json({ error: 'Missing request body' });
    }

    const { firstname, lastname, username, isAdmin, email, phone, password } = req.body;
    const errors = [];

    // Check for missing required fields
    if (!firstname) {
        console.log('Missing firstname');
        errors.push({ type: 'required', message: "The 'firstname' field is required.", field: 'firstname' });
    }
    if (!lastname) {
        console.log('Missing lastname');
        errors.push({ type: 'required', message: "The 'lastname' field is required.", field: 'lastname' });
    }
        // Check for missing required fields
    if (typeof req.body.isAdmin === 'undefined') {
        console.log('Missing isAdmin');
        errors.push({ type: 'required', message: "The 'isAdmin' field is required.", field: 'isAdmin' });
    } else if (typeof req.body.isAdmin !== 'boolean') {
        console.log('Invalid isAdmin');
        errors.push({ type: 'invalid', message: "The 'isAdmin' field must be a boolean.", field: 'isAdmin' });
    }
    if (!email) {
        console.log('Missing email');
        errors.push({ type: 'required', message: "The 'email' field is required.", field: 'email' });
    }
    if (!password) {
        console.log('Missing password');
        errors.push({ type: 'required', message: "The 'password' field is required.", field: 'password' });
    }

    // If there are any errors, return them
    if (errors.length > 0) {
        console.log('Validation errors:', errors);
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors
        });
    }

    // Validate date format
    const formattedBirthdate = moment(birthdate, 'YYYY-MM-DD', true); // Parse and validate date
    if (!formattedBirthdate.isValid()) {
        console.log('Invalid birthdate format');
        return res.status(400).json({ error: 'Invalid date format for birthdate' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        console.log('Invalid email format');
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate first name
    if (!validator.isAlpha(firstname.replace(/\s+/g, ''))) {
        console.log('Invalid first name');
        return res.status(400).json({ error: 'Invalid first name' });
    }

    // Validate last name
    if (!validator.isAlpha(lastname.replace(/\s+/g, ''))) {
        console.log('Invalid last name');
        return res.status(400).json({ error: 'Invalid last name' });
    }

    

    // Validate password length
    if (password.length < 8) {
        console.log('Password too short');
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    console.log('validateCreateAdmin completed without errors');
    next(); // Proceed to the next middleware if all validations pass
};


const validateUpdateAdmin = (req, res, next) => {
    console.log('validateUpdateAdmin called');

    if (!req.params || !req.body) {
        console.log('Missing request parameters or body');
        return res.status(400).json({ error: 'Missing request parameters or body' });
    }

    const { id } = req.params;
    const { firstname, lastname, username, email, phone, password, cpassword, city, address } = req.body;
    const errors = [];

    if (!id) {
        errors.push({ type: 'required', message: "The 'id' field is required.", field: 'id' });
    }

    if (!validator.isInt(id)) {
        errors.push({ type: 'invalid', message: 'ID must be a valid integer', field: 'id' });
    }

    if (firstname && !validator.isAlpha(firstname.replace(/\s+/g, ''))) {
        errors.push({ type: 'invalid', message: 'First name must only contain letters', field: 'firstname' });
    }

    if (lastname && !validator.isAlpha(lastname.replace(/\s+/g, ''))) {
        errors.push({ type: 'invalid', message: 'Last name must only contain letters', field: 'lastname' });
    }

    if (email && !validator.isEmail(email)) {
        errors.push({ type: 'invalid', message: 'Email must be a valid email address', field: 'email' });
    }

    if (password && password.length < 8) {
        errors.push({ type: 'invalid', message: 'Password must be at least 8 characters long', field: 'password' });
    }

    if (errors.length > 0) {
        console.log('Validation errors:', errors);
        return res.status(400).json({ message: 'Validation failed', errors: errors });
    }

    console.log('validateUpdateAdmin completed without errors');
    next();
};

module.exports = {
    validateUserSignup,
    userValidation,
    validateUserLogin,
    validateGetUser,
    validateGetUsers,
    validateUpdateUser,
    validateDeleteUser,
    validateCreateAdmin,
    validateUpdateAdmin
};
