const express = require('express');
const router = express.Router();
const log = console.log;

const { Project } = require("../models/Project");
const { ObjectID } = require('mongodb');

// TODO: add middleware for checking mongoose connection

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

router
    .route("/:agent_id/:client_id/")
    .post(async(req, res) => {
        log("POST /api/projects/:agent_id/:client_id");
        const agent = req.params.agent_id;
        const client = req.params.client_id;

        if (!ObjectID.isValid(agent) || !ObjectID.isValid(client)) {
            res.status(404).send();
            return;
        }

        if (!req.body.title || !req.body.description) {
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
    .get(async(req, res) => {
        log("GET /api/projects/:agent_id/:client_id");
        const agent = req.params.agent_id;
        const client = req.params.client_id;

        if (!ObjectID.isValid(agent) || !ObjectID.isValid(client)) {
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
    .route("/:agent_id/:client_id/:project_id")
    .patch(async(req, res) => {
        const agent = req.params.agent_id;
        const client = req.params.client_id;
        const projectId = req.params.project_id;

        if (!ObjectID.isValid(agent) || !ObjectID.isValid(client) || !ObjectID.isValid(projectId)) {
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
            } else {   
                res.send(project)
            }

        } catch (error) {
            log(error);
        }
    })
    .delete(async(req, res) => {
        const agent = req.params.agent_id;
        const client = req.params.client_id;
        const projectId = req.params.project_id;

        if (!ObjectID.isValid(agent) || !ObjectID.isValid(client) || !ObjectID.isValid(projectId)) {
            res.status(404).send();
            return;
        }

        try {
            const project = await Project.findByIdAndRemove(projectId)
            if (!project) {
                res.status(404).send();
            } else {   
                res.send(project);
            }

        } catch (error) {
            log(error);
        }

    });
    







module.exports = router;