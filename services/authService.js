const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');
const { secretKey } = require('../config/secret');

// Signup Service
const signup = async (name, mobile_no, email, password) => {
  // Check if user already exists
  let user = await userDao.findUserByEmail(email);
  if (user) {
    // Return an object indicating the error
    return { success: false, message: 'User already exists' };
  }

  // Hash password and save user
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await userDao.createUser({ name, mobile_no, email, password: hashedPassword });

  // Return a success object if user creation is successful
  return { success: true, user };
};

// Login Service
const login = async (email, password) => {
  const user = await userDao.findUserByEmail(email);
  if (!user) {
    return { success: false, message: 'Invalid credentials' };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: 'Invalid credentials' };
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

  // Return a success object with the token
  return { success: true, token };
};

// Export the functions
module.exports = { signup, login };
