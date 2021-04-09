'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  accountType: {
    type: String,
    required: true,
    enum: ['agent', 'admin'],
  },
  lastLogin: {
    type: Date,
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    lowercase: true,
    validate: {
      validator: validator.isEmail, // custom validator
      message: 'Not valid email',
    },
  },
  phone: {
    type: String,
    validate: {
      validator: validator.isMobilePhone,
      message: 'Not valid phone number',
    },
  },
  specialization: {
    type: String,
    enum: ['BUYER', 'SELLER', 'BOTH'],
  },
  yearStarted: Number,
  bio: String,
  licenseId: String,
  brokerage: String,
  brokerageAddress: String,
  brokeragePhone: String,
  activated: Boolean,
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function (username, password) {
  const User = this; // binds this to the User model

  // First find the user by their email
  return User.findOne({ username }).then((user) => {
    if (!user) {
      return Promise.reject(); // a rejected promise
    }
    // if the user exists, make sure their password is correct
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = { User };
