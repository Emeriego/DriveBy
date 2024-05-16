const { User } = require("../models");
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { 
  getUsers,
  registerUser,
  loginUser,
  getUserProfile,
  refreshToken,
  updateUserProfile
 } = require("../controller/authController");


// router.get('/api/users',  getUsers);
router.post('/api/users/register/', registerUser);
router.post('/api/users/login/', loginUser);
router.post('/api/login/refresh/', refreshToken); 

// router.get('/api/users/profile', passport.authenticate('bearer', { session: false }), getUserProfile);
// router.put('/profile', passport.authenticate('bearer', { session: false }), updateUserProfile);

module.exports = router;
