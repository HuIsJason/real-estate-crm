const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true, 
        default: "",
    }
})

const PropertySchema = mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
        length: 2,
    },
    postalCode: {
        type: String,
        required: true,
        length: 6
    },
    activities: {
        type: [ActivitySchema],
        required: true, 
        default: []
    },
    notes: {
        type: String,
        required: true,
        default: "",
    },
    favourited: {
        type: Boolean,
        required: true, 
        default: false,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

const Property = mongoose.model('Property', PropertySchema);
module.exports = { Property }; 