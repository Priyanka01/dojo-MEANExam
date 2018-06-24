var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json())

// Connect to angular
app.use(express.static(path.join(__dirname, 'client/dist/client')));
app.use(express.static(__dirname + '/client/dist/client'));

var mongoose = require('mongoose');
// var validate = require('mongoose-validator')
var uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost/PetsDB', function(err) {
    console.log("HEYYYAYAYYAAY")
});

const PetsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: [true, "Name should be unique"],
        minlength: [2, "Name should be atleast 3 characters"],
    },
    pettype: {
        type: String,
        required: [true, "Pet type is required"],
        minlength: [2, "Type should be atleast 3 characters"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [2, "Description should be atleast 3 characters"],
    },
    skill1: {
        type: String,
    },
    skill2: {
        type: String,
    },
    skill3: {
        type: String,
    },
    likes: {
        type: Number,
    }
}, { timestamps: true })

PetsSchema.plugin(uniqueValidator, { message: "Name should be unique" });

let Pet = mongoose.model('Pet', PetsSchema)
console.log("Pets..", Pet)



//CREATE PET
app.post('/create', function(req, res) {
    console.log("In server", req.body.name)
    console.log("In server", req.body.pettype)
    Pet.create(req.body, function(err, data) {
        if (err) {

            res.json(err)
        } else {
            console.log("Data", data)
            res.json({ message: "Record inserted" })
        }
    })
});


//GET ALL PETS
app.get('/getall', function(req, res) {
    Pet.find({}, function(err, data) {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }

    }).sort({ pettype: 1 });
});

//GET ONE PET
app.get('/getone:id', function(req, res) {

    Pet.findById({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log("Error", err)
        } else {
            console.log("Server data", data)
            res.json(data)
        }
    })
})



// ADD LIKE 
app.put('/addlike', function(req, res) {
    Pet.findOneAndUpdate({ "_id": req.body._id }, {
        "$set": {
            "likes": req.body.likes + 1
        }
    }, function(err, data) {
        if (err) {
            console.log("Server err", err)
            res.json(err)
        } else {
            console.log("Server data", data)
            res.json(data)
        }
    })
});


// UPDATE PET DETAILS
app.put('/update', function(req, res) {
    Pet.update({ _id: req.body }, {
            $set: { 'name': req.body.name, 'pettype': req.body.pettype, 'description': req.body.description, 'skill1': req.body.skill1, 'skill2': req.body.skill2, 'skill3': req.body.skill3 },
            runValidators: true,
        },
        function(err, data) {
            if (err) {
                console.log("Error", err)
            } else {
                res.json({ message: "Updated" })
            }

        });
});


// DELETE PET
app.delete('/removepet/:petid', function(req, res) {

    Pet.deleteOne({ _id: req.params.petid }, function(err, data) {
        if (err) {
            console.log("Error", err)
        } else {
            console.log("**********delete data", data)
            res.json(data)
        }
    })
})








app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./client/dist/client/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})