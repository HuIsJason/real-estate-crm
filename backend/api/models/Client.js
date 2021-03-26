const mongoose = require('mongoose');
const validator = require('validator');

const ClientSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    phoneNumber: {
        type: String,
        validate: {
            validator: validator.isMobilePhone,
            message: 'Not valid phone number'
        }
    },
    email: {
        type: String,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
			message: 'Not valid email'
        }
    },
    address: String,
    city: String,
    description: String,
    profileImg: String,
    tags: {
        type: [String],
        required: true,
        default: []
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

const Client = mongoose.model('Client', ClientSchema);
module.exports = { Client }; 