const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    User = require('../models/user'),
    config = require('../config/main'),
    async = require('async'),
    mailHandler = require('./mailHandler')

function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
    });
}

function setUserInfo(request) {
    return {
        _id: request._id,
        email: request.email,
        role: request.role,
    }
}

//========================================
// Login Route
//========================================
exports.login = function (req, res, next) {

    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
}


//========================================
// Registration Route
//========================================
exports.register = async function (req, res, next) {
    try {
        const email = req.body.email;
        // Return error if no email provided
        if (!email) {
            throw 'You must enter an email address.'

        }
        const password = Math.random().toString(36).slice(-8);

        let existingUser = await User.findOne({
            email: email
        })
        // If user is not unique, return error
        if (existingUser) {
                throw 'That email address is already in use.'
        }
        // If email is unique and password was provided, create account
        let user = new User({
            email: email,
            password: password,
        });
        let createUser = await user.save()
        if (createUser.err) {
            return next(err);
        }
        let sendEmail =  await await mailHandler.sendEmail(email,password)
        let userInfo = setUserInfo(createUser);
        res.status(201).json({
            success: true,
            url: sendEmail
        });
    } catch (err) {
        return res.status(420).send({
            success: false,
            error: err
        });
    }
    
}