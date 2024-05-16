// passport.js
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const { User } = require("../models");

passport.use(new BearerStrategy(
  async (token, done) => {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await User.findByPk(decode.id);

      if (!user) {
        return done(null, false, { message: 'Unauthorized access!' });
      }

      return done(null, user);
    } catch (error) {
      return done(null, false, { message: 'Authentication failed', error: error.message });
    }
  }
));

module.exports = passport;