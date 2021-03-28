const express = require('express');
const router = express.Router();

router
    .route("/:agent_id")
    .get(async(res, req) => {

        log("GET request to /api/agent/:agent_id");

    });





module.exports = router;