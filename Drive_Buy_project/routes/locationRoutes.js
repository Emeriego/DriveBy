const express = require('express');
const router = express.Router();
const { validateLocationMiddleware } = require('../middleware/Validation/validatelocation');
const {
  createLocation,
  getAllLocations,
  getLocation,
  updateLocation,
  deleteLocation,
} = require('../controller/locationController');

// Create a new location
router.post('/createlocation', validateLocationMiddleware, createLocation);

// Get all locations
// router.get('/getalllocation', getAllLocations);

// Get a single location
router.get('/getalllocation/:id', getLocation);

// Update a location
router.put('/updatelocation/:id', validateLocationMiddleware, updateLocation);

// Delete a location
router.delete('/deletelocation/:id', deleteLocation);

module.exports = router;