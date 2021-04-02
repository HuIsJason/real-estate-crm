const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const { User } = require('../models/User');
const { mongoose } = require('../db/mongoose');
const router = express.Router();

// Our own express middleware to check for
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/'); // redirect to dashboard if logged in.
  } else {
    next(); // next() moves on to the route.
  }
};

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    console.log('Issue with mongoose connection');
    res.sendStatus(500);
    return;
  } else {
    next();
  }
};

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user)
      .then((user) => {
        if (!user) {
          return Promise.reject();
        } else {
          req.user = user;
          next();
        }
      })
      .catch((err) => {
        res.sendStatus(401);
      });
  } else {
    res.sendStatus(401);
  }
};

function isMongoError(error) {
  // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return (
    typeof error === 'object' &&
    error !== null &&
    error.name === 'MongoNetworkError'
  );
}

router.post('/signup', mongoChecker, async (req, res) => {
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    phone,
    specialization,
    yearStarted,
    bio,
    licenseId,
    brokerage,
    brokerageAddress,
    brokerageNumber,
    accountType,
  } = req.body;
  if (
    !username ||
    !password ||
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !yearStarted ||
    !licenseId ||
    !brokerage ||
    !brokerageAddress ||
    !brokerageNumber ||
    !accountType
  ) {
    res.sendStatus(400);
  } else {
    const user = new User({
      username,
      password,
      firstName,
      lastName,
      email,
      phone,
      specialization,
      yearStarted,
      bio,
      licenseId,
      brokerage,
      brokerageAddress,
      brokerageNumber,
      accountType,
    });

    try {
      const newUser = await user.save();
      res.send(newUser);
    } catch (err) {
      console.log(err);
      if (isMongoError(err)) {
        res.sendStatus(500);
      } else {
        res.sendStatus(400);
      }
    }
  }
});

router.post('/login', mongoChecker, async (req, res) => {
  const { username, password } = req.body;

  try {
    // Use the static method on the User model to find a user
    // by their email and password.
    const user = await User.findByUsernamePassword(username, password);

    req.session.user = user._id;
    res.send({ loggedInAs: user.username });
    // res.redirect('/dashboard');
  } catch (err) {
    if (isMongoError(err)) {
      res.sendStatus(500);
    } else {
      res.sendStatus(404);
    }
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
