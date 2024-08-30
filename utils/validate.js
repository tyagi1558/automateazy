const Joi = require('joi');

// Signup Validation
exports.signup = data => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(), // Ensure `name` is a non-empty string
    email: Joi.string().email().required(), // Validate email format
    mobile_no: Joi.string().pattern(/^\d{10}$/).required(), // Validate 10-digit mobile number
    password: Joi.string().min(6).required() // Password should be at least 6 characters
  });
  return schema.validate(data);
};

// Login Validation
exports.login = data => {
  const schema = Joi.object({
    email: Joi.string().email().required(), // Validate email format
    password: Joi.string().min(6).required() // Password should be at least 6 characters
  });
  return schema.validate(data);
};
