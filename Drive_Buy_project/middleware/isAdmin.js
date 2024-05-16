const isAdmin = (req, res, next) => {
  // Check if the user is authenticated and if they are an admin
  if (req.user && req.user.isAdmin) {
    // If the user is an admin, pass control to the next middleware function
    next();
  } else {
    // If the user is not an admin, send a response with an error message
    res.status(403).send({ message: 'Admin access is required.' });
  }
};

module.exports = isAdmin;