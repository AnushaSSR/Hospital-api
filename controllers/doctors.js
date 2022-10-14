const Doctor = require('../models/doctors');// Doctor model
const jwt = require('jsonwebtoken');//to get the json web token
require('dotenv').config();
const secret = process.env.JWT_SECRET;

//Register doctor
module.exports.register = async function (req, res) {
    try {
        //validating user inputs
        if (req.body.name.trim() == "" || req.body.name == undefined) {
            // if the name entered is null or undefined
            return res.json(400, {
                message: "Name is not provided .Please enter valid details",
            });
        }
        if (req.body.email.trim() == "" || req.body.email == undefined) {
            // if the email entered is null or undefined
            return res.json(400, {
                message: "Email is not provided.Please enter valid details",
            });
        }
        if (req.body.password.trim() == "" || req.body.password == undefined) {
            // if the password entered is null or undefined
            return res.json(400, {
                message: "Password is not provided .Please enter valid details",
            });
        }
        if (req.body.username.trim() == "" || req.body.username == undefined) {
            //if the username entered is null or undefined
            return res.json(400, {
                message: "User name is not provided .Please enter valid details",
            });
        }
        let user = await Doctor.findOne({ email: req.body.email } && { username: req.body.username });//Check if the doctor already exists
        if (!user) {
            //if user does not exist, create a new record
            user = await Doctor.create(req.body);
            return res.json(201, {
                message: "User Created",
                data: {
                    doctor: user
                }
            });
        } else {
            //else return message
            return res.json(409, {
                message: "User already exists"
            });
        }
    } catch (err) {
        //catching errors
        console.log(`error in creating user:`, err);

        //catching if email is not unique
        if (err.keyPattern.email) {
            return res.json(409, {
                message: "User email already registered"
            });
        }
        return res.json(500, {
            message: "Internal server error"
        });
    }
}

//Doctor login
module.exports.login = async function (req, res) {
    //Doctor will login with user_name and password
    try {
        let user = await Doctor.findOne({ email: req.body.email } && { username: req.body.username });//check if the doctor exists
        if (!user || user.password != req.body.password) {
            //if the username doesnot exist and password is invalid
            return res.json(422, {
                message: "Invalid username or password"
            });
        }
        //returns new JWT token if the user is valid. Token is valid for 1 hour.
        return res.json(200, {
            message: "Sign in successful, here is your token, keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), secret, { expiresIn: '3600000' })
            }
        })
    } catch (err) {
        //catching the errors
        console.log(`error in creatuing user ${err}`);
        return res.json(500, {
            message: "Internal server error"
        });
    }
}