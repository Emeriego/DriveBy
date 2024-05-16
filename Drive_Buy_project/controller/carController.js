const multer = require('multer');
const { Car, User, Category, Location } = require("../models");
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  }
});
const upload = multer({ storage: storage });

const uploadImage = async (req, res) => {
    try {
        const car = await Car.findById(req.body.car_id);
        if (!car) {
            return res.status(404).send({ message: 'Car not found' });
        }

        const fileExt = path.extname(req.file.originalname);
        let contentType;

        switch (fileExt) {
            case '.jpeg':
            case '.jpg':
                contentType = 'image/jpeg';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.gif':
                contentType = 'image/gif';
                break;
            default:
                return res.status(400).send({ message: 'Invalid file type' });
        }

        car.img = { data: fs.readFileSync(req.file.path), contentType: contentType };
        await car.save();

        res.send({ message: 'Image was uploaded' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

// Function to create a new car
const createCar = async (req, res) => {
  const data = req.body;

  // Log the request body
  console.log('Request body:', req.body);

  try {
    // Find the category
    const category = await Category.findOne({ where: { name: data.category } });

    if (!req.user || !category) {
      return res.status(400).json({ error: 'User or Category not found' });
    }

    // Create the car
    const car = await Car.create({
      user_id: req.user.id, // Use req.user.id instead of user.id
      brand: data.brand,
      model: data.model,
      color: data.color,
      price: data.price,
      category_id: category.id,
      location: data.location,
      city: data.city,
      power: data.power,
      condition: data.condition,
      img: req.file ? req.file.path : null, // req.file is set by Multer
    });

    // Fetch the car along with its associated category and user
    const carWithAssociations = await Car.findOne({
      where: { id: car.id },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'created_at', 'updated_at'], // Only include these fields of the category
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'], // Only include id and username fields of the user
        },
      ],
    });

    res.json(carWithAssociations);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: error.message });
  }
};

const getAllCars = async (req, res, next) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getUserPostings = async (req, res, next) => {
  try {
    const username = req.user.username;
    const cars = await Car.findAll({
      include: [
        {
          model: User,
          as: 'user',
          where: { username: username },
          attributes: ['id', 'username', 'email']
        }
      ]
    });
    res.json(cars);
  } catch (error) {
    console.error('Error fetching user cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getCarById = async (req, res) => {
  try {
    const car = await Car.findOne({
      where: { id: req.params.car_id },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'], // Only include id and name fields of the category
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'], // Only include id and username fields of the user
        },
      ],
    });

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    createCar,
    getUserPostings,
    getAllCars,
    uploadImage,
    getCarById,
    upload
};