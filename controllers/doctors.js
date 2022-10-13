const Doctor = require('../models/doctors');
const jwt = require('jsonwebtoken');

module.exports.register = async function (req, res) {
    try {
        
        if(req.body.name.trim() == "" || req.body.name == undefined) {
            return res.json(400, {
                message: "Name is not provided .Please enter valid details",
            });
        }
        if(req.body.email.trim() == "" || req.body.email == undefined) {
            return res.json(400, {
                message: "Email is not provided.Please enter valid details",
            });
        }

        if(req.body.password.trim() == "" || req.body.password == undefined) {
            return res.json(400, {
                message: "Password is not provided .Please enter valid details",
            });
        }

        if(req.body.username.trim() == "" || req.body.username == undefined) {
            return res.json(400, {
                message: "User name is not provided .Please enter valid details",
            });
        }

        let user = await Doctor.findOne({ email: req.body.email } && { username: req.body.username});
        if (!user) {
            user = await Doctor.create(req.body);
            return res.json(201, {
                message: "User Created",
                data: {
                    doctor: user
                }
            });
        } else {
            return res.json(409, {
                message: "User already exists"
            });
        }
    } catch (err) {      
        console.log(`error in creating user:`,err);

        if(err.keyPattern.email){
            return res.json(409, {
                message: "User email already registered"
            });
        }
        return res.json(500, {
            message: "Internal server error"
        });
    }
}

module.exports.login = async function (req, res) {
    try {
        let user = await Doctor.findOne({ email: req.body.email } && { username: req.body.username });

        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: "Invalid username or password"
            });
        }
        return res.json(200, {
            message: "Sign in successful, here is your token, keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), 'doctor', { expiresIn: '500000' })
            }
        })
    } catch (err) {
        console.log(`error in creatuing user ${err}`);
        return res.json(500, {

            message: "Internal server error"
        });
    }
}