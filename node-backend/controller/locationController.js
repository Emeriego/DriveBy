const { Location } = require('../models');

// Create a new location
const createLocation = async (req, res) => {
  try {
    // Create a new location
    const newLocation = await Location.create(req.body);

    // Find the newly created location with its associated cars
    const locationWithCars = await Location.findByPk(newLocation.id, {
      include: [{
        model: Car,
        as: 'cars'
      }]
    });

    return res.status(201).json(locationWithCars);
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Get all locations
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    return res.status(200).json(locations);
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Get a single location
const getLocation = async (req, res) => {
  try {
    const location = await Location.findOne({ where: { id: req.params.id } });
    if (location) {
      return res.status(200).json(location);
    }
    return res.status(404).json({ error: 'Location not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Update a location
const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Location.update(req.body, { where: { id } });

    if (updated) {
      const updatedLocation = await Location.findOne({ where: { id } });
      return res.status(200).json(updatedLocation);
    }

    return res.status(404).json({ error: 'Location not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a location
const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Location.destroy({ where: { id } });

    if (deleted) {
      return res.status(204).json('Location deleted');
    }

    return res.status(404).json({ error: 'Location not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  getLocation,
  updateLocation,
  deleteLocation,
};