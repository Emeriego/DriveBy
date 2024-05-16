const express = require('express');
const router = express.Router();
// const { validateReviewMiddleware } = require('../middleware/Validation/validatereview');
const {
  getAllReviews,
  createReview,
  getReview,
  getCarReviews
} = require('../controller/reviewController');

// router.get('/', getAllReviews);
router.post('/create', createReview);
// router.get('/:id', getReview);
// router.get('/car/:id', getCarReviews);

module.exports = router;