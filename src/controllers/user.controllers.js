const User = require('../models/user.model.js');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt=require('bcryptjs')
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of users."
        });
    });
};
// Create and Save a new User
exports.create = (req, res) => {
    console.log(req)
// Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
// Create a new User
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    });
    console.log(user)
// Save user in the database
    user.save()
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
    User.findById(req.params.id)
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
    User.findByIdAndUpdate(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.last_name,
        phone: req.body.last_name
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
    User.findByIdAndRemove(req.params.id)
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

exports.register = async (req, res) => {

    // Our register logic starts here
    let encryptedPassword;
    try {
        // Get user input
        const {first_name, last_name, email, password,age} = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({email});

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            age,
        });

        // Create token
        // save user token
        user.token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        // return new user
        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
};

exports.login =async (req, res) => {
    console.log('uitliser')
    // Our login logic starts here
    try {
        // Get user input
        console.log(req.body)
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            console.log('token')
            // save user token
            user.token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // user
            return res
                .status(200)
                .json(user);
        }
        return res
            .status(400)
            .send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
};