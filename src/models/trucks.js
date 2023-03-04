const mongoose = require('mongoose');
const validator = require('validator');

const truckSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    year : {
        type: String,
        required: true,
    },
    numberPlate : {
        type: String,
        required: true,
        unique: [true, 'Number Plate id already present'],
    },
    averageSpeed: {
        type: String,
        required: true,
    },
    averageFuel: {
        type: String,
        required: true,
    },
    
}, {timestamps: true}
);

// new collection
const Truck = new mongoose.model('Truck', truckSchema);

module.exports = Truck;