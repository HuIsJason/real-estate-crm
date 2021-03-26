const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    accountType: {
        type: String,
        required: true,
        enum: ["agent", "admin"]
    },
    lastLogin: {
        type: Date,
        required: true,
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        lowercase: true,
        validate: {
            validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
        }
    },
    phone: {
        type: String,
        validate: {
            validator: validator.isMobilePhone,
            message: 'Not valid phone number'
        }
    },
    specialization: {
        type: String,
        enum: ['BUYER', 'SELLER', 'BOTH']
    },
    yearStarted: Number,
    bio: String,
    licenseId: String,
    brokerage: String,
    brokerageAddress: String,
    brokeragePhone: String,
    activated: Boolean
});

const User = mongoose.model('User', UserSchema);
module.exports = { User }; 

