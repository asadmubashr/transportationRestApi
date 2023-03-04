const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength:  3
    },
    surname : {
        type: String,
        required: true,
        minlength:  3
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 10,
        unique: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email id already present'],
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
    
}, {timestamps: true}
);

// new collection
const User = new mongoose.model('User', userSchema);

module.exports = User;