const express = require('express');
const router = express.Router();
const log = console.log;
const generator = require('generate-password');
const bcrypt = require('bcryptjs');

const { User } = require("../models/User");

router
    .route('/:username')
    /* Admin accessible route for updating a user, including resetting passwords
            TODO: admin authenticate middleware */
    .patch(async(req, res) => {

        log("PATCH /api/user/:username");
        const username = req.params.username;

        // Reset password
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
            const password = generator.generate({
                numbers: true,
                symbols: true,
            })

            passwordReset = password;
        }

        try {
            let user = await User.findOneAndUpdate({username: username}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false});
            if (!user) {
                res.status(404).send();
            } else {
                let result = user;
                if (passwordReset) { 
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