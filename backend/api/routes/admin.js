"use strict";

const express = require('express');
const router = express.Router();
const log = console.log;

router
    .route("/")
    .post(async (req, res) => {
        log("POST request to /api/admin/");

        // Create a new admin account

    });

router
    .route("/:user_id")
    .get(async(res, req) => {

        log("GET request to /api/admin/:user_id");

    });



module.exports = router;