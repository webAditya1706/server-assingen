const Joi = require('joi');

// Define Joi schema for validation
const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of 3 characters',
        'string.max': 'Name should have a maximum length of 30 characters',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password is required',
        'string.min': 'Password should have a minimum length of 8 characters',
        'any.required': 'Password is required'
    }),
    contact: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({
        'string.base': 'Contact should be a type of text',
        'string.empty': 'Contact is required',
        'string.pattern.base': 'Contact must be a valid 10-digit number',
        'any.required': 'Contact is required'
    }),
	logo: Joi.string().uri().optional().messages({
        'string.uri': 'Logo must be a valid URL'
    }),
    role: Joi.string().optional().messages({
        'string.uri': 'role must be string'
    })

});


// Validation middleware
const validateRequest = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateRequest;