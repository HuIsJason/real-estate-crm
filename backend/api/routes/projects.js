const express = require('express');
const router = express.Router();
const log = console.log;

const { Project } = require("../models/Project");
const { ObjectID } = require('mongodb');
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

// checks for first error returned by promise rejection if Mongo database suddently disconnects
function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

router
    .route("/:client_id/")
    .post(mongoChecker, async(req, res) => {
        log("POST /api/projects/:client_id");
        const client = req.params.client_id;

        if (!ObjectID.isValid(client)) {
            res.status(404).send();
            return;
        }

        if (!req.body.title) {
            res.status(400).send("Some body field(s) missing");
        }

        try {
            const project = new Project({
                title: req.body.title,
                description: req.body.description,
                tags: [],
                client: client
            }); // status="active" will be added by default by mongoose

            const result = await project.save();
            res.status(201).send(result);

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
        log("GET /api/projects/:client_id");
        const client = req.params.client_id;

        if (!ObjectID.isValid(client)) {
            res.status(404).send();
            return;
        }

        try {
            const projects = await Project.find({ client: client });
            res.send({ projects: projects });

        } catch(error) {
            log(error);
            res.status(500).send("Internal Server Error");
        }
    })

router
    .route("/:client_id/:project_id")
    .get(mongoChecker, async(req, res) => {
        log("GET (single) /api/projects/:client_id/:project_id");
        const client = req.params.client_id;
        const projectId = req.params.project_id;

        if (!ObjectID.isValid(client) || !ObjectID.isValid(projectId)) {
            res.status(404).send();
            return;
        }

        try {
            const project = await Project.findById(projectId);
            if (!project) {
                res.status(404).send();
            } else {
                res.send(project);
            }

        } catch(error) {
            log(error);
            res.status(500).send("Internal Server Error");
        }

    }) 
    .patch(mongoChecker, async(req, res) => {
        log("PATCH /api/projects/:client_id/:project_id");
        const client = req.params.client_id;
        const projectId = req.params.project_id;

        if (!ObjectID.isValid(client) || !ObjectID.isValid(projectId)) {
            res.status(404).send();
            return;
        }

        const validFields = ["tags", "title", "description", "status"];
        const fieldsToUpdate = {}
        req.body.map((change) => {
            if (!validFields.includes(change.field)) {
                res.status(400).send("Invalid update field specified.")
            }
            fieldsToUpdate[change.field] = change.value;
        })

        try {
            const project = await Project.findByIdAndUpdate({_id: projectId}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false});
            if (!project) {
                res.status(404).send();
                return;
            } else {   
                res.send(project)
            }

        } catch (error) {
            log(error);
            if (isMongoError(error)) {
                res.status(500).send('Internal server error');
            } else {
                res.status(400).send('Bad Request');
            }
            return;
        }
    })
    .delete(mongoChecker, async(req, res) => {
        log("DELETE /api/projects/:client_id/:project_id");
        const client = req.params.client_id;
        const projectId = req.params.project_id;

        if (!ObjectID.isValid(client) || !ObjectID.isValid(projectId)) {
            res.status(404).send();
            return;
        }

        try {
            const project = await Project.findByIdAndDelete(projectId);
            if (!project) {
                res.status(404).send();
            } else {   
                res.send(project);
            }

        } catch (error) {
            log(error);
            res.sendStatus(500);
        }

    });
    
module.exports = router;