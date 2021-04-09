const express = require('express');
const router = express.Router();
const log = console.log;

const { Client } = require("../models/Client");
const { ObjectID } = require('mongodb');
const { mongoose } = require('../db/mongoose');

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

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

router
    .route("/:agent_id/")
    .post(mongoChecker, async(req, res) => {
        log("POST /api/clients/:agent_id");
        const agent = req.params.agent_id;

        if (!ObjectID.isValid(agent)) {
            res.status(404).send();
            return;
        }

        if (!req.body.firstName) {
            res.status(400).send("Some body field(s) missing");
            return;
        }

        try {
            const client = new Client({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                description: req.body.description,
                tags: req.body.tags,
                agent: agent
            }); 

            const result = await client.save();
            res.send(result);

        } catch (error) {
            log(error);
            if (isMongoError(error)) {
                res.status(500).send('Internal server error');
            } else {
                res.status(400).send('Bad Request');
            }
        }
    })
    .get(mongoChecker, async(req, res) => {
        log("GET /api/clients/:agent_id");
        const agent = req.params.agent_id;

        if (!ObjectID.isValid(agent)) {
            res.status(404).send();
            return;
        }

        try {
            const clients = await Client.find({ agent: agent });
            res.send({ clients: clients });

        } catch(error) {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    })

router
    .route("/:agent_id/:client_id")
    .get(mongoChecker, async(req, res) => {
        log("GET (single) /api/clients/:agent_id/:client_id");
        const clientId = req.params.client_id;
        const agentId = req.params.agent_id;

        if (!ObjectID.isValid(clientId) || !ObjectID.isValid(agentId)) {
            res.status(404).send();
            return;
        }

        try {
            const client = await Client.findOne({ _id: clientId, agent: agentId });
            if (!client) {
                res.status(404).send();
            } else {
                res.send(client);
            }

        } catch(error) {
            log(error);
            res.status(500).send("Internal Server Error");
        }

    }) 
    .put(mongoChecker, async(req, res) => {
        log("PUT /api/clients/:agent_id/:client_id");
        const clientId = req.params.client_id;
        const agentId = req.params.agent_id;

        if (!ObjectID.isValid(clientId) || !ObjectID.isValid(agentId)) {
            res.status(404).send();
            return;
        }

        try {
            const client = await Client.findOneAndUpdate({ _id: clientId, agent: agentId }, req.body, {
                new: true
            });

            if (!client) {
                res.status(404).send();
            } else {
                res.send(client);
            }

        } catch(error) {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    })
    .delete(mongoChecker, async(req, res) => {
        log("DELETE /api/clients/:agent_id/:client_id");
        const clientId = req.params.client_id;
        const agentId = req.params.agent_id;

        if (!ObjectID.isValid(clientId) || !ObjectID.isValid(agentId)) {
            res.status(404).send();
            return;
        }

        try {
            const client = await Client.findOneAndRemove({ _id: clientId, agent: agentId })
            if (!client) {
                res.status(404).send();
            } else {   
                res.status(204).send(client);
            }

        } catch (error) {
            log(error);
        }

    });

module.exports = router;