const express = require('express');
const passport = require('../middleware/passport');

// Import Multer middleware

const { 
    createCar,
    getAllCars,
    getUserPostings,
    getCarById,
    upload,
    uploadImage 
} = require('../controller/carController');


const router = express.Router();

router.post('/api/cars/upload/',  passport.authenticate('bearer', { session: false }), upload.single('image'), uploadImage);
router.get('/api/cars/',  getAllCars);
router.get('/api/cars/', passport.authenticate('bearer', { session: false }), getUserPostings);
router.get('/api/cars/:car_id', getCarById);
router.post('/api/cars/create/', passport.authenticate('bearer', { session: false }), upload.single('image'), createCar);

module.exports = router;
