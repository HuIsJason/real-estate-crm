'use strict';

const express = require('express');
const router = express.Router();

const { User } = require('../models/User');
const { mongoose } = require('../db/mongoose');

// middleware for mongo connection error
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

// middleware for checking that the username is not already taken
const uniqueUserChecker = async (req, res, next) => {
  const username = req.body.username;

  if (!username) {
    res.sendStatus(400);
    return;
  }

  try { 
    const user = await User.findOne({ username: username });
    if (user) {
        res.status(400).send("Username taken");
        return;
    } else {
        next();
    }
  } catch(err) {
      res.sendStatus(500);
  }
  
}

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}


router.post('/', mongoChecker, uniqueUserChecker, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.sendStatus(400);
  } else {
    const admin = new User({ username, password, accountType: 'admin' });
    try {
      const newAdmin = await admin.save();
      res.send(newAdmin);
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

module.exports = router;
