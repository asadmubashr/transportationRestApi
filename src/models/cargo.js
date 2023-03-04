const mongoose = require('mongoose');
const validator = require('validator');

const cargoSchema = new mongoose.Schema({
    uniqueId : {
        type: String,
        unique: [true, 'Number Plate id already present'],
    },
    items : {
        type: String,
        required: true,
    },
    location : {
        type: String,
        required: true,
    },
    
}, {timestamps: true}
);

// new collection
const Cargo = new mongoose.model('Cargo', cargoSchema);

module.exports = Cargo;