const Book = require('../models/book.model.js');
require("dotenv").config();
const bcrypt=require('bcryptjs')
const csvtojson = require("csvtojson");
const path = require("path");
const fs = require("fs");
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Book.find()
        .then(book => {
            res.send(book);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of users."
        });
    });
};
// Create and Save a new User
exports.create = (req, res) => {
// Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
// Create a new User
    const book = new Book({
        name: req.body.name,
        type: req.body.type,
        image_url: req.body.image_url,
        synopsis: req.body.synopsis,
        volume:req.body.volume,
        chapters:req.body.chapters,
        mal_id:req.body.mal_id,
    });
// Save user in the database
    book.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new user."
        });
    });
};
// Find a single User with a id
exports.findOne = (req, res) => {
    Book.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error getting user with id " + req.params.id
        });
    });
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
// Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
// Find user and update it with the request body
    Book.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        type: req.body.type,
        image_url: req.body.image_url,
        synopsis: req.body.synopsis,
        volume:req.body.volume,
        chapters:req.body.chapters,
        mal_id:req.body.mal_id,
    }, {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send({message: "user deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.id
        });
    });
};
exports.import =(req,res) =>{
    const fileName = path.join(__dirname, "mangaList.csv");
    console.log(fileName)
    var arrayToInsert = [];
    csvtojson().fromFile(fileName).then(source => {
        // Fetching the all data from each row
        for (var i = 0; i < source.length; i++) {
            console.log(source[i]);
            // break;
            const manga = new Book({
                name: source[i]["name"],
                type: source[i]["type"],
                image_url: source[i]["image_url"],
                synopsis: source[i]["synopsis"],
                volume:source[i]["volume"],
                chapters:source[i]["chapters"],
                mal_id:source[i]["mal_id"],
            });
            arrayToInsert.push(manga);


        }     //inserting into the table “employees”
        Book.insertMany(arrayToInsert, (err, result) => {
            if (err) console.log(err);
            if(result){
                console.log("Import CSV into database successfully.");
            }
        });


    });
}
exports.findForlder = (req, res) => {
    console.log(req)
    let element =req.params.name
    console.log(element)
    const dir=path.join(__dirname,'..',`../src/uploads/` +element)
    // console.log(dir)
    fs.readdir(dir, (err, files) => {
        console.log(files.length);
        if(files){
            res.send(files)
            //res.sendStatus(200);
        }
        if (err){
            return res.sendStatus(400,{
                message: "not allowed"
            });
        }

    });
};
exports.sendEpub = (req, res) => {
    let name=req.params.name
    res.sendFile(path.join(__dirname, "../uploads/"+name+"/1.pdf"));
};
