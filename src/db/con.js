const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://transportation:zZGTjxs93XYZc7ev@cluster0.57sp1be.mongodb.net/transporation?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
}).then(() => {
    console.log('connection is done');
}).catch((a) => {
    console.log('no connection ' + a);
});
