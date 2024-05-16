const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const passport = require('./middleware/passport');


// Import routes
const authRouter = require("./routes/authControllerRoute");
const resetPassword = require('./routes/passwordRouter');
const car = require('./routes/carRoutes');
const categorizer = require('./routes/categoryRoutes');
const booking = require('./routes/bookingRoutes');
const location = require('./routes/locationRoutes');
const review = require('./routes/reviewRoutes');
const payment = require('./routes/paymentRoutes');
const authprofile = require('./middleware/Validation/authprofile');
const message = require('./routes/messagecontrollerRoute');

// Create an Express application instance
const app = express();

console.log('Resolved Path:', path.join(__dirname, 'dist', 'assets'));
// Serve static files from the 'assets' directory inside the 'dist' directory
app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets'))); 

// Passport setup
app.use(passport.initialize());


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontend', 'dist', 'assets')));

// Session middleware
app.use(session({
  secret: 'e611b94ddec66922dd9708709615d3f2e61a66acc5cb19ab871ca393ae57f06b',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Note: secure: true option requires an HTTPS connection
}));


// CORS middleware
app.use(cors({
  origin: '*', // Allow requests from all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// app.js
app.use('/uploads', express.static('uploads'));


app.use((req, res, next) => {
  console.log(`Received a ${req.method} request on ${req.path} from ${req.ip}`);
  console.log('Request body:', req.body);
  next();
});

// Mount routes
app.use(authRouter);
app.use(resetPassword);
app.use(car);
app.use(categorizer);
app.use(booking);
app.use(location);
app.use(review);
app.use(payment);
app.use(authprofile);
app.use(message);

// 404 Not Found middleware
// app.use((req, res, next) => {
//   res.status(404).send({ error: 'Not Found' });
// });

// Catch-all route handler
app.use((req, res) => {
  console.log('Received a request on an undefined route:', req.originalUrl);
  res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace
  res.status(500).send({ error: 'Something went wrong' });
});

module.exports = app;