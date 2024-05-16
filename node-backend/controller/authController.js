const { User, Booking, Car, TempUser } = require("../models");
const { isValidNumber } = require("libphonenumber-js");
const validator = require('validator');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode').decode;
const bcrypt = require('bcryptjs');
const userExists = require('../middleware/userExists'); // Update the path according to your project structure
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;




const loginUser = async (req, res) => {
  try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) return res.status(400).json({ message: 'User does not exist' });

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

      const fullName = `${user.firstname} ${user.lastname}`;

      const access = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        fullName: fullName,
        phone: user.phone,
        address: user.address,
        date_joined: user.date_joined
      }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

      const refresh = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' });

      jwt.verify(access, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
          if (err) {
              console.error('Failed to decode token', err);
              return res.status(403).json({ message: 'Failed to decode token', error: err });
          }

          // Send the response inside the callback
          res.json({ access, refresh });
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging in user', error: err });
  }
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}

const refreshToken = (req, res) => {
const refresh = req.body.refresh;

if (refresh == null) return res.sendStatus(401);

if (typeof refresh === 'string' && refresh) {
  jwt.verify(refresh, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: 'Failed to verify refresh token', error: err });
    }

    const access = generateAccessToken({ id: user.id });
    res.json({ accessToken: access });
  });
} else {
  console.error('Invalid token:', refresh);
}
};

const registerUser = async (req, res) => {
    try {
        // Check if a user with the given email already exists
        const existingEmailUser = await User.findOne({ where: { email: req.body.email } });
        if (existingEmailUser) {
            return res.status(400).json({ message: 'A user with this email already exists' });
        }

        // Check if a user with the given username already exists
        const existingUsernameUser = await User.findOne({ where: { username: req.body.username } });
        if (existingUsernameUser) {
            return res.status(400).json({ message: 'A user with this username already exists' });
        }

        // Check if a user with the given phone number already exists
        const existingPhoneUser = await User.findOne({ where: { phone: req.body.phone } });
        if (existingPhoneUser) {
            return res.status(400).json({ message: 'A user with this phone number already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ ...req.body, password: hashedPassword });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
};
const getUserProfile = async (req, res) => {
    const user = req.user;
    res.json(user);
};

const getUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

const updateUserProfile = async (req, res) => {
    const user = req.user;
    const data = req.body;

    user.firstname = data.name;
    user.username = data.username;
    user.email = data.email;
    await user.save();

    res.json(user);
};

module.exports = {
    registerUser,
    getUserProfile,
    getUsers,
    updateUserProfile,
    loginUser,
    refreshToken
};