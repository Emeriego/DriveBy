const { Category, Car } = require("../models");
const isAdmin = require('../middleware/isAdmin'); 
// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving all categories', error: err });
    }
};

const createCategory = async (req, res) => {
  const data = req.body;

  try {
    // Create the category
    const category = await Category.create({
      name: data.name,
      // other fields...
    });

    // Fetch the category along with its associated cars
    const categoryWithCars = await Category.findOne({
      where: { id: category.id },
      include: [
        {
          model: Car,
          as: 'cars',
          // Only include these fields of the cars
          attributes: ['id', 'brand', 'model', 'color', 'price', 'location', 'city', 'power', 'condition', 'img'],
        },
      ],
    });

    res.json(categoryWithCars);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { id: req.params.id } });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving category', error: err });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.update(req.body, { where: { id: req.params.id } });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: 'Error updating category', error: err });
    }
};

const deleteCategory = async (req, res) => {
    try {
        await Category.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting category', error: err });
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
};