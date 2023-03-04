const express = require('express');
require('./db/con');
const User = require('./models/users');
const path = require('path');
const Trip = require('./models/trips');
const Forum = require('./models/forum');
const bodyParser = require('body-parser');
const Truck = require('./models/trucks');
const Cargo = require('./models/cargo');

const app = express();
const port = process.env.PORT || 3000;

var jsonParser = bodyParser.json()

app.use(express.json());
// app.use(express.static(path.join(__dirname, '/restfulApi/src')));

// app.set('view engine', 'ejs');
// app.get('/', (req, res) => {
//     res.render('signup');
// });

// app.get('/login', (req, res) => {
//     res.render('login');
//    });

// app.get('/home', (req, res) => {
//     res.render('home', {
//         email: 'asad@gmail.com',
//     });
// });


// USERS
app.post('/add-user', (req, res) => {
    //print(req);
    const user = new User(req.body);
        const createUser =  user.save().then((result)=>{
            res.send({"status": 0, "message": "Success"});
        })
        .catch((err)=>{
            //res.send(err);
            res.send({"status": 1, "message": "Use unique email or password"});
        })
        ;
    
});

//const client = new MongoClient('mongodb+srv://transportation:zZGTjxs93XYZc7ev@cluster0.57sp1be.mongodb.net/transporation?retryWrites=true&w=majority');

app.get('/all-users', (req, res) => {
    User.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
    ;
});

app.post('/login', (req, res) => {
    const users = User.find({email: req.body['email'],
    password: req.body['password'], type: req.body['type']})
    .then((result)=>{
        if(result.length >= 1) {
            res.send({"status": 0, "message": "Success"});
        }
        else {
            res.send({"status": 1, "message": "Failed"});
        }
        //res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
    ;
});

app.post('/update-user', (req, res) => {
    const modelId = req.body['_id'];
    const newName = req.body['name'];
    const newSurname = req.body['surname'];
    const newPhoneNumber = req.body['phoneNumber'];
    const newDateOfBirth = req.body['dateOfBirth'];
    const newEmail = req.body['email'];
    const newPassword = req.body['password'];

    User.findById(modelId).then((model) => {
        return Object.assign(model, {name: newName, surname: newSurname,
            phoneNumber: newPhoneNumber, dateOfBirth: newDateOfBirth,
             email: newEmail, password: newPassword});
    }).then((model) => {
        return model.save();
    }).then((updatedModel) => {
        res.send({"status": 0, "message": "Success"});
    }).catch((err) => {
        res.send(err);
        //res.send({"status": 1, "message": "Failed"});
    });
});

app.post('/delete-user', (req, res) => {
    const modelId = req.body['_id'];

    User.findByIdAndRemove(modelId)
    .then((updatedModel) => {
        res.send({"status": 0, "message": "Success"});
    }).catch((err) => {
        res.send({"status": 1, "message": "Failed"});
    });
});

// TRIPS
app.post('/add-trip', async (req, res) => {
    const trip = new Trip(req.body);
    const createUser =  trip.save().then((result)=>{
        res.send({"status": 0, "message": "Success"});
    })
    .catch((err)=>{
        res.send({"status": 1, "message": "Failed"});
    })
    ;
    
});

app.get('/all-trips', (req, res) => {
    Trip.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
    ;
});

app.post('/update-trip', (req, res) => {
    const modelId = req.body['_id'];
    const newStartLocation = req.body['startLocation'];
    const newDestinationLocation = req.body['destinationLocation'];
    const newStartDate = req.body['startDate'];
    const newEndDate = req.body['endDate'];
    const newAssignedTo = req.body['assignedTo'];
    const newStatus = req.body['status'];

    Trip.findById(modelId).then((model) => {
        return Object.assign(model, {startLocation: newStartLocation,
             destinationLocation: newDestinationLocation,
             startDate: newStartDate, endDate: newEndDate,
             assignedTo: newAssignedTo, status: newStatus});
    }).then((model) => {
        return model.save();
    }).then((updatedModel) => {
        res.send({"status": 0, "message": "Success"});
    }).catch((err) => {
        res.send({"status": 1, "message": "Failed"});
    });
});

app.post('/delete-trip', (req, res) => {
    const modelId = req.body['_id'];

    Trip.findByIdAndRemove(modelId)
    .then((updatedModel) => {
        res.send({"status": 0, "message": "Success"});
    }).catch((err) => {
        res.send({"status": 1, "message": "Failed"});
    });
});

// CARGO
app.post('/add-cargo', async (req, res) => {
    const cargo = new Cargo(req.body);
    const createCargo =  cargo.save().then((result)=>{
        res.send({"status": 0, "message": "Success"});
    })
    .catch((err)=>{
        //res.send(err);
        res.send({"status": 1, "message": "Failed"});
    })
    ;
    
});

app.get('/all-cargos', (req, res) => {
    Cargo.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
    ;
});

app.post('/update-cargo', (req, res) => {
    const modelId = req.body['_id'];
    const newUniqueId = req.body['uniqueId'];
    const newItems = req.body['items'];
    const newLocation = req.body['location'];

    Cargo.findById(modelId).then((model) => {
        return Object.assign(model, {uniqueId: newUniqueId,
            items: newItems, location: newLocation});
    }).then((model) => {
        return model.save();
    }).then((updatedModel) => {
        res.send({"status": 0, "message": "Success"});
    }).catch((err) => {
        res.send({"status": 1, "message": "Failed"});
    });
});

app.post('/delete-cargo', (req, res) => {
    const modelId = req.body['_id'];

    Cargo.findByIdAndRemove(modelId)
    .then((updatedModel) => {
        res.send({"status": 0, "message": "Success"});
    }).catch((err) => {
        res.send({"status": 1, "message": "Failed"});
    });
});

// TRUCKS
app.post('/add-truck', async (req, res) => {
    const truck = new Truck(req.body);
    const createTruck =  truck.save().then((result)=>{
        res.send({"status": 0, "message": "Success"});
    })
    .catch((err)=>{
        res.send({"status": 1, "message": "Failed"});
    })
    ;
    
});

app.get('/all-trucks', (req, res) => {
    Truck.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
    ;
});

app.post('/update-truck', (req, res) => {
    const modelId = req.body['_id'];
    const newName = req.body['name'];
    const newYear = req.body['year'];
    const newNumberPlate = req.body['numberPlate'];
    const newAverageSpeed = req.body['averageSpeed'];
    const newAverageFuel = req.body['averageFuel'];

    Truck.findById(modelId).then((model) => {
        return Object.assign(model, {name: newName,
            year: newYear, numberPlate: newNumberPlate,
            averageSpeed: newAverageSpeed, averageFuel: newAverageFuel});
    }).then((model) => {
        return model.save();
    }).then((updatedModel) => {
        res.send({"status": 0, "message": "Success"});
    }).catch((err) => {
        res.send({"status": 1, "message": "Failed"});
    });
});

app.post('/delete-truck', (req, res) => {
    const modelId = req.body['_id'];

    Truck.findByIdAndRemove(modelId)
    .then((updatedModel) => {
        res.send({"status": 0, "message": "Success"});
    }).catch((err) => {
        res.send({"status": 1, "message": "Failed"});
    });
});

// FORUM
app.post('/add-forum', async (req, res) => {
    const forum = new Forum(req.body);
        const createMessage =  forum.save().then((result)=>{
            res.send({"status": 0, "message": "Success"});
        })
        .catch((err)=>{
            res.send({"status": 1, "message": "Failed"});
        })
        ;

    
});

app.get('/all-forums', (req, res) => {
    Forum.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
    ;
});


app.listen(port, () => {
    console.log('connection is setup at port ' + port);
});

