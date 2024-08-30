const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');  // Ensure JWT is imported
const { secretKey } = require('../config/secret');  // Ensure you import your secret key correctly

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    mobile_no: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please use a valid 10-digit mobile number.'],
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Method to generate JWT token
userSchema.methods.generateJwt = function() {
    return jwt.sign({
        id: this._id,  // Use `_id` instead of `id` for Mongoose documents
        email: this.email,
        mobile_no: this.mobile_no, // Corrected from `phone` to `mobile_no`
        name: this.name   // Include name
    }, secretKey, {
        expiresIn: '1h'  // Changed to 1 hour for security reasons
    });
};

// Method to verify JWT token
userSchema.statics.verifyToken = function(token, callback) {
    if (!token) {
        return callback(false);
    }
    token = token.split(' ')[1];
    jwt.verify(token, secretKey, function(err, decoded) {
        if (err) {
            return callback(false);
        } else {
            return callback(decoded);
        }
    });
};

module.exports = mongoose.model('User', userSchema);
