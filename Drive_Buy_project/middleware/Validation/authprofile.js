const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../../models');

// Middleware to authenticate the user
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                console.error('JWT verification failed:', err.message);
                return res.status(403).json({ error: 'Forbidden' });
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

router.get('/profile', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.userId } });
        // Handle user profile retrieval
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
