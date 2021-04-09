const express = require('express');
const router = express.Router();
const log = console.log;

const { User } = require("../models/User");
const { ObjectID } = require('mongodb');

// Middleware for authentication of resources -> only agent with same username, 
// or an admin can modify these resources
const authenticateAgent = (req, res, next) => {

    const username = req.params.username;
    log(req.session.MongoId);
    if (req.session.MongoId) {
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

router
    .route("/")  // TEMP ROUTE UNTIL JASON FINISHES
    // .post(async(req, res) => {
    //     log("POST /api/agent");

    //     if (!req.body.username || !req.body.password) {
    //         res.status(400).send("Some body field(s) missing");
    //         return;
    //     }

    //     try {
    //         const agent = new User({
    //             username: req.body.username,
    //             password: req.body.password,
    //             accountType: "agent",
    //             lastLogin: req.body.lastLogin,
    //             firstName: req.body.firstName,
    //             lastName: req.body.lastName,
    //             email: req.body.email,
    //             phone: req.body.phone,
    //             specialization: req.body.specialization,
    //             yearStarted: req.body.yearStarted,
    //             bio: req.body.bio,
    //             licenseId: req.body.licenseId,
    //             brokerage: req.body.brokerage,
    //             brokerageAddress: req.body.brokerageAddress,
    //             brokeragePhone: req.body.brokeragePhone,
    //             activated: false
    //         }); 

    //         const result = await agent.save();
    //         res.send(result);

    //     } catch (error) {
    //         log(error);
    //         if (isMongoError(error)) {
    //             res.status(500).send('Internal server error: ' + error);
    //         } else {
    //             res.status(400).send('Bad Request: ' + error);
    //         }
    //     }
    // })
    /* Gets a list of all agent accounts, if query param inactivated=true, it
       will get only the agents with activation requests pending. */
    .get(async(req, res) => {
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
            res.sendStatus(500);
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
        }

    })
    .get(authenticateAgent, async(req, res) => {
        log("GET /api/agent/:username");
        const agentUsername = req.params.username;

        // if (!ObjectID.isValid(agentId)) {
        //     res.status(404).send();
        //     return;
        // }

        try {
            const agent = await User.findOne({ username: agentUsername });
            
            if(!agent) {
                res.status(404).send();
            } else {
                res.send(agent);
            }

        } catch(error) {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    })
    .put(authenticateAgent, async(req, res) => {
        log("PUT /api/agent/:username");
        const agentUsername = req.params.username;

        try {
            const agent = await User.findOneAndUpdate({ username: agentUsername } , req.body, {
                new: true
            });

            if (!agent) {
                res.status(404).send();
            } else {
                res.send(agent);
            }

        } catch(error) {
            log(error);
            res.status(500).send("Internal Server Error");
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
                agent.password = passwordReset;
                result = await agent.save();   
                res.send(result)
            }

        } catch (error) {
            log(error);
            res.sendStatus(500);
        }

    })


module.exports = router;