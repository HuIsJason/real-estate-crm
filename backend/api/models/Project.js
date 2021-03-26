const mongoose = require('mongoose');
const validator = require('validator');

const ProjectSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    status: {
        type: String,
        required: true,
        enum: ["active" | "closed"],
        default: "active"
    },
    tags: {
        type: [String],
        required: true,
        default: [],
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = { Project }; 