const express = require('express');
const session = require('express-session');
const { ObjectID } = require('mongodb');
const log = console.log;
const generator = require('generate-password');

const { User } = require('../models/User');
const { mongoose } = require('../db/mongoose');
const router = express.Router();


// ======= MIDDLEWARE ========== //

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

// middleware for checking that the current session user is an admin
const adminAuthenticate = (req, res, next) => {
  if (req.session.MongoId) {
    User.findById(req.session.MongoId)
      .then((user) => {
        if (!user || user.accountType !== 'admin') {
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

function isMongoError(error) {
  // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return (
    typeof error === 'object' &&
    error !== null &&
    error.name === 'MongoNetworkError'
  );
}

router.post('/signup', mongoChecker, uniqueUserChecker, async (req, res) => {
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
    !brokerageNumber
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
      specialization: specialization || 'BOTH',
      yearStarted,
      bio,
      licenseId,
      brokerage,
      brokerageAddress,
      brokerageNumber,
      accountType: 'agent',
      activated: false,
      lastLogin: new Date().toISOString(),
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
    console.log(user);
    if (user.activated || user.accountType === 'admin') {
      await User.findOneAndUpdate(
        { username },
        { lastLogin: new Date().toISOString() },
        { new: true }
      );
      req.session.username = user.username;
      req.session.MongoId = user._id;
      req.session.name = `${user.firstName} ${user.lastName}`;
      req.session.accountType = user.accountType;
      res.send({
        username: user.username,
        MongoId: user._id,
        loggedInAs: `${user.firstName} ${user.lastName}`,
        accountType: user.accountType,
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    if (isMongoError(err)) {
      res.sendStatus(500);
    } else {
      res.sendStatus(400);
    }
  }
});

router.get('/logout', mongoChecker, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/checkSession', (req, res) => {
  if (req.session.username) {
    res.send({
      loggedInAs: req.session.name,
      MongoId: req.session.MongoId,
      username: req.session.username,
      accountType: req.session.accountType,
    });
  } else {
    res.sendStatus(401);
  }
});

router.patch(
  '/request/:agent_id',
  mongoChecker,
  adminAuthenticate,
  async (req, res) => {
    log("PATCH /api/authenticate/request/:agent_id");
    const agent_id = req.params.agent_id;
    if (!ObjectID.isValid(agent_id)) {
      res.sendStatus(404);
      return;
    }
    if (req.body.value == null) {
      res.sendStatus(400);
    }
    const fieldsToUpdate = { activated: req.body.value };

    try {
      const agent = await User.findOneAndUpdate(
        { _id: agent_id },
        { $set: fieldsToUpdate },
        { new: true }
      );
      if (!agent) {
        res.sendStatus(404);
      } else {
        res.send(agent);
      }
    } catch (err) {
      if (isMongoError(err)) {
        res.sendStatus(500);
      } else {
        res.sendStatus(404);
      }
    }
  }
);

router
  .route('/user/:username')
  /* Admin accessible route for updating a user, including resetting passwords */
  .patch(mongoChecker, adminAuthenticate, async(req, res) => {
      log("PATCH /api/authenticate/user/:username");
      const username = req.params.username;
      const validFields = ["username", "password", "firstName", "lastName", "email", "phone", "specialization", 
                          "yearStarted", "licenseId", "brokerage", "brokerageAddress", "brokeragePhone"];
      
      const fieldsToUpdate = {};
      let passwordReset;
      req.body.map((change) => {
          if (!validFields.includes(change.field)) {
              res.status(400).send("Invalid update field specified.");
          }
          if (change.op === "set") {
              fieldsToUpdate[change.field] = change.value;
          } else if (change.op === "reset" && change.field === "password") {
              passwordReset = "";
          }
      });

      if (passwordReset === "") {
        // Generate a random password to set the new password to
        const password = generator.generate({
            numbers: true,
            symbols: true,
        })

          passwordReset = password;
      }

      try {
          let user = await User.findOneAndUpdate({username: username}, 
            {$set: fieldsToUpdate}, {new: true, useFindAndModify: false});
          if (!user) {
            res.status(404).send();
          } else {
            let result = user;
            if (passwordReset) { 
              //Reset password
              user.password = passwordReset; 
              result = await user.save();
            }
            res.send({ user: result, passwordReset: passwordReset });
          }

      } catch (error) {
          log(error);
          res.sendStatus(500);
      }

  });


module.exports = router;
