const { User } = require("../models"); // Update the path according to your project structure

const userExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).send("User not found");
        }
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = userExists;