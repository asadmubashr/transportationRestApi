const mongoose = require('mongoose');
const validator = require('validator');

const tripSchema = new mongoose.Schema({
    startLocation : {
        type: String,
        required: true,
    },
    destinationLocation : {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    
}, {timestamps: true}
);

// new collection
const Trip = new mongoose.model('Trip', tripSchema);

module.exports = Trip;