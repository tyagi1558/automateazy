const authService = require('../services/authService');
const validate = require('../utils/validate');

// Signup Controller
const signup = async (req, res) => {
  const { name, mobile_no, email, password } = req.body;

  // Validate input
  const { error } = validate.signup(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const result = await authService.signup(name, mobile_no, email, password);

    // Check the result object for success status
    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  const { error } = validate.login(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const result = await authService.login(email, password);

    // Check the result object for success status
    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    res.json({ success: true, token: result.token });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Export the functions
module.exports = { signup, login };
