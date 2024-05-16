const jwt = require('jsonwebtoken');
const { User } = require("../models");

const isAuth = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(decode); // Check the decoded JWT token

            const user = await User.findByPk(decode.id);
            console.log(user); // Check the retrieved user

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized access!'
                });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed',
                error: error.message
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access!'
        });
    }
};
module.exports = isAuth;
