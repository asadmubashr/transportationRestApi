const mongoose = require('mongoose');
const validator = require('validator');

const forumSchema = new mongoose.Schema({
    message : {
        type: String,
        required: true,
    },
    senderEmail : {
        type: String,
        required: true,
    },
    
}, {timestamps: true}
);

// new collection
const Forum = new mongoose.model('Forum', forumSchema);

module.exports = Forum;