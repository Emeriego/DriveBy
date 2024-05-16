const { Review } = require('../models');
// Create a new review

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving all reviews', error: err });
    }
};

const createReview = async (req, res) => {
  try {
    const { user, rating, review } = req.body;

    const newReview = await Review.create({
      user_id: user,
      rating,
      review,
    }, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'], // Only include id and username fields of the user
        },
      ],
    });

    res.json(newReview);
  } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err });
  }
};

const getReview = async (req, res) => {
    try {
        const review = await Review.findOne({ where: { id: req.params.id } });
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving review', error: err });
    }
};

const getCarReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { car_id: req.params.id } });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving car reviews', error: err });
    }
};

module.exports = {
    getAllReviews,
    createReview,
    getReview,
    getCarReviews
};