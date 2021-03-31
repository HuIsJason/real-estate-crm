const express = require('express');
const router = express.Router();
const log = console.log;

const { User } = require("../models/User");
const { ObjectID } = require('mongodb');

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

router
    .route("/")  // TEMP ROUTE UNTIL JASON FINISHES
    .post(async(req, res) => {
        log("POST /api/agent");

        if (!req.body.username || !req.body.password) {
            res.status(400).send("Some body field(s) missing");
            return;
        }

        try {
            const agent = new User({
                username: req.body.username,
                password: req.body.password,
                accountType: "agent",
                lastLogin: req.body.lastLogin,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                specialization: req.body.specialization,
                yearStarted: req.body.yearStarted,
                bio: req.body.bio,
                licenseId: req.body.licenseId,
                brokerage: req.body.brokerage,
                brokerageAddress: req.body.brokerageAddress,
                brokeragePhone: req.body.brokeragePhone
            }); 

            const result = await agent.save();
            res.send(result);

        } catch (error) {
            log(error);
            if (isMongoError(error)) {
                res.status(500).send('Internal server error: ' + error);
            } else {
                res.status(400).send('Bad Request: ' + error);
            }
        }
    })

router
    .route("/:agent_id/")
    .delete(async(req, res) => {
        log("DELETE /api/agent/:agent_id");
        const agentId = req.params.agent_id;

        if (!ObjectID.isValid(agentId)) {
            res.status(404).send();
            return;
        }

        try {
            const agent = await User.findByIdAndRemove(agentId);
            if (!agent) {
                res.status(404).send();
            } else {   
                res.status(204).send(agent);
            }

        } catch (error) {
            log(error);
        }

    })
    .get(async(req, res) => {
        log("GET /api/agent/:agent_id");
        const agentId = req.params.agent_id;

        if (!ObjectID.isValid(agentId)) {
            res.status(404).send();
            return;
        }

        try {
            const agent = await User.findById(agentId);
            
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
    .put(async(req, res) => {
        log("PUT /api/agent/:agent_id");
        const agentId = req.params.agent_id;

        if (!ObjectID.isValid(agentId)) {
            res.status(404).send();
            return;
        }

        try {
            const agent = await User.findByIdAndUpdate(agentId , req.body, {
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


module.exports = router;