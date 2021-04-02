const express = require('express');
const router = express.Router();
const log = console.log;

const { Property } = require("../models/Property");
const { ObjectID } = require('mongodb');

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

router
    .route("/:project_id")
    .post(async(req, res) => {
        log("POST /api/property/:project_id");
        const projectId = req.params.project_id;

        if (!ObjectID.isValid(projectId)) {
            res.status(404).send();
            return;
        }

        const { address, city, province, postalCode } = req.body;

        try {
            const property = new Property({
                address: address,
                city: city,
                province: province,
                postalCode: postalCode,
                project: projectId
            });
            const result = await property.save();
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
    .get(async(req, res) => {
        log("GET /api/property/:project_id");
        const projectId = req.params.project_id;

        if (!ObjectID.isValid(projectId)) {
            res.status(404).send();
            return;
        }

        try {
            const properties = await Property.find({ project: projectId });
            res.send({ properties: properties });

        } catch(error) {
            log(error);
            res.status(500).send("Internal Server Error");
        }

    });

router
    .route("/:project_id/:property_id")
    .get(async(req, res) => {
        log("GET /api/property/:project_id/:property_id");
        const projectId = req.params.project_id;
        const propertyId = req.params.property_id;

        if (!ObjectID.isValid(projectId) || !ObjectID.isValid(propertyId)) {
            res.status(404).send();
            return;
        }

        try {
            const property = await Property.findById(propertyId);
            if (!property) {
                res.status(404).send();
                return;
            } else {
                res.send(property);
            }
        } catch (error) {
            log(error);
            res.status(500).send();
        }

    })
    .patch(async(req, res) => {
        log("PATCH /api/property/:project_id/:property_id");
        const projectId = req.params.project_id;
        const propertyId = req.params.property_id;

        if (!ObjectID.isValid(projectId) || !ObjectID.isValid(propertyId)) {
            res.status(404).send();
            return;
        }

        const validFields = ["address", "city", "province", "postalCode", "notes", "favourited"];
        const fieldsToUpdate = {}
        req.body.map((change) => {
            if (!validFields.includes(change.field)) {
                res.status(400).send("Invalid update field specified.")
            }
            fieldsToUpdate[change.field] = change.value;
        });

        try {
            const property = await Property.findByIdAndUpdate({_id: propertyId}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false});
            if (!property) {
                res.status(404).send();
            } else {
                res.send(property);
            }
        } catch (error) {
            log(error)
		    res.status(500).send('Internal Server Error');
        }
    })
    .delete(async(req, res) => {
        log("DELETE /api/property/:project_id/:property_id");
        const projectId = req.params.project_id;
        const propertyId = req.params.property_id;
        
        if (!ObjectID.isValid(projectId) || !ObjectID.isValid(propertyId)) {
            res.status(404).send();
            return;
        }

        try {

            const property = await Property.findByIdAndDelete(propertyId);
            if (!property) {
                res.status(404).send();
            } else {   
                res.send(property);
            }

        } catch (error) {
            log(error);
            res.status(500).send();
        }

    })
    // This route is for adding a new activity to the project property
    .post(async(req, res) => {
        log("POST /api/property/:project_id/:property_id");
        const projectId = req.params.project_id;
        const propertyId = req.params.property_id;
        
        if (!ObjectID.isValid(projectId) || !ObjectID.isValid(propertyId)) {
            res.status(404).send();
            return;
        }

        const { title, date, description } = req.body;

        try {
            const activity = {
                title: title, date: date, description: description
            };
            const property = await Property.findById(propertyId);
            if (!property) {
                res.status(404).send("Property not found!");
                return;
            } else {
                property.activities.push(activity);
                const newActivity = property.activities[property.activities.length - 1];
                const result = await property.save();
                res.status(201).send({ activity: newActivity, property: result });

            }

        } catch (error) {
            log(error);
            res.status(500).send();
        }
    });


router
    .route("/:project_id/:property_id/:activity_id")
    .get(async(req, res) => {

        log("GET /api/property/:project_id/:property_id/:activity_id");
        const projectId = req.params.project_id;
        const propertyId = req.params.property_id;
        const activityId = req.params.activity_id;
        
        if (!ObjectID.isValid(projectId) || !ObjectID.isValid(propertyId) || !ObjectID.isValid(activityId) ) {
            res.status(404).send();
            return;
        }

        try {
            const property = await Property.findById(propertyId);
            if (!property) {
                res.status(404).send("Property does not exist");
            } else {
                const activity = property.activities.id(activityId);
                if (!activity) {
                    res.status(404).send("Activity does not exist for this property");
                } else {
                    res.send(activity);
                }
            }


        } catch(error) {
            log(error);
            res.status(500).send();
        }
    })
    .put(async(req, res) => {
        log("PUT /api/property/:project_id/:property_id/:activity_id");
        const projectId = req.params.project_id;
        const propertyId = req.params.property_id;
        const activityId = req.params.activity_id;
        
        if (!ObjectID.isValid(projectId) || !ObjectID.isValid(propertyId) || !ObjectID.isValid(activityId) ) {
            res.status(404).send();
            return;
        }

        const { title, date, description } = req.body;

        try {
            const property = await Property.findById(propertyId);
            if (!property) {
                res.status(404).send("Property does not exist");
            } else {
                const activity = property.activities.id(activityId);
                if (!activity) {
                    res.status(404).send("Activity does not exist for this property");
                } else {
                    // Update the activity
                    activity.title = title;
                    activity.date = date;
                    activity.description = description;
                    const result = await property.save();

                    res.send({ activity: activity, property: result });
                }
            }
        } catch(error) {
            log(error);
            res.status(500).send();
        }
    })
    .delete(async(req, res) => {
        log("DELETE /api/property/:project_id/:property_id/:activity_id");
        const projectId = req.params.project_id;
        const propertyId = req.params.property_id;
        const activityId = req.params.activity_id;

        if (!ObjectID.isValid(projectId) || !ObjectID.isValid(propertyId) || !ObjectID.isValid(activityId) ) {
            res.status(404).send();
            return;
        }

        try {
            const property = await Property.findById(propertyId);
            if (!property) {
                res.status(404).send("Property does not exist");
            } else {
                const activity = await property.activities.id(activityId).remove();
                if (!activity) {
                    res.status(404).send("Activity does not exist"); 
                } else {
                    const result = await property.save();
                    res.send({ activity: activity, property: result });
                }

            }


        } catch(error) {
            log(error);
            res.status(500).send();
        }

    });

module.exports = router;