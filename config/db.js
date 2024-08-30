const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is loaded

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove the `useCreateIndex` option
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
