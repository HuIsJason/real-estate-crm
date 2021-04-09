'use strict';

const express = require('express');

const { User } = require('../models/User');
const { mongoose } = require('../db/mongoose');

const router = express.Router();

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

router.post('/', mongoChecker, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.sendStatus(400);
  } else {
    const admin = new User({ username, password, accountType: 'admin' });
    try {
      const newAdmin = admin.save();
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
