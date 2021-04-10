const express = require('express');
const router = express.Router();
const log = console.log;

const { User } = require("../models/User");
const { ObjectID } = require('mongodb');
const { mongoose } = require('../db/mongoose');

// ========== MIDDLEWARE =============== //

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

// Middleware for authentication of resources:
// Ensures that only agent with same username, or an admin can modify these resources
const authenticateAgent = (req, res, next) => {
    const username = req.params.username;
    
    if (ObjectID.isValid(req.session.MongoId) && req.session.MongoId) {
      User.findById(req.session.MongoId)
        .then((user) => {
          console.log(user);
          if (!user || (user.accountType === 'agent' && user.username !== username)) {
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


function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// ======= ROUTES ========= //

router
    .route("/")
    /*  Gets a list of all agent accounts, 
        if query param inactivated=true, then gets a list of all accounts with activated=false
        and if inactivated=false, then gets a list of all accounts with activated=true */
    .get(mongoChecker, async(req, res) => {
        log("GET /api/agent");
        const inactivated = req.query.inactivated;

        try {
            const query = { accountType: 'agent'}
            if (!(inactivated == null)) {
                query.activated = (inactivated === 'false');
            }
            const agents = await User.find(query);
            res.send({ agents: agents });

        } catch (error) {
            log(error);
            if (isMongoError(error)) {
                res.sendStatus(500);
            }
            res.sendStatus(400);
        }
    })

router
    .route("/:username")
    .delete(authenticateAgent, async(req, res) => {
        log("DELETE /api/agent/:username");
        const agentUsername = req.params.username;

        try {
            const agent = await User.findOneAndRemove({ username: agentUsername });
            if (!agent) {
                res.status(404).send();
            } else {   
                res.status(204).send(agent);
            }

        } catch (error) {
            log(error);
            if (isMongoError(error)) {
                res.sendStatus(500);
            }
            res.sendStatus(404);
        }

    })
    .get(authenticateAgent, async(req, res) => {
        log("GET /api/agent/:username");
        const agentUsername = req.params.username;

        try {
            const agent = await User.findOne({ username: agentUsername });
            
            if(!agent) {
                res.status(404).send();
            } else {
                res.send(agent);
            }

        } catch(error) {
            log(error);
            if (isMongoError(error)) {
                res.sendStatus(500);
            }
            res.sendStatus(404);
        }
    })
    .put(authenticateAgent, async(req, res) => {
        log("PUT /api/agent/:username");
        const agentUsername = req.params.username;
        const { username, password } = req.body;

        if (username || password) {
            res.status(400).send("Request body should not include username or password.");
        }
        

        try {
            const agent = await User.findOneAndUpdate({ username: agentUsername } , req.body, {
                new: true
            });

            if (!agent) {
                res.status(404).send("Username does not belong to an account");
            } else {
                res.send(agent);
            }

        } catch(error) {
            log(error);
            if (isMongoError(error)) {
                res.sendStatus(500);
            }
            res.sendStatus(400);
        }
    })
    .patch(authenticateAgent, async(req, res) => {
        log("PATCH /api/agent/:username");
        const agentUsername = req.params.username;

        // Can only update username and password
        const fieldsToUpdate = {}
        let passwordReset = '';
        req.body.map((change) => {
            if (change.field === "username") {
                fieldsToUpdate[change.field] = change.value;
            }
            else if (change.field === "password") {
                passwordReset = change.value;
            } else {
                res.status(400).send("Invalid update field specified.")
                return;
            }
        });

        try {
            const agent = await User.findOneAndUpdate({username: agentUsername}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false});
            if (!agent) {
                res.status(404).send();
            } else {
                if (passwordReset) {
                    agent.password = passwordReset;
                    result = await agent.save();   
                    res.send(result);
                } else {
                    res.send(agent);
                }
            }

        } catch (error) {
            log(error);
            res.sendStatus(500);
        }

    })


module.exports = router;