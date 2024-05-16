const Joi = require('joi');

const validateCategory = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(), // Add validation for description
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else {
        next();
    }
};

module.exports = validateCategory;