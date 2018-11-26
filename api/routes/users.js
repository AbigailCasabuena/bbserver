const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
var model = require("../models");
var bcrypt   = require('bcrypt-nodejs');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const Token = require('../models/verificationTokenModel');
const UserWeb = require('../models/userModelWeb');
//const randomstring = require('randomstring');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /users'
    });
}); 

//signup w/o verification
router.post("/signup", function(req, res) {
    model.UserModel.findOne({
      user_username: req.body.user_username
    }, function(err, user) {
    if (user != null) {
        //res.json(null);
        console.log("duplicate username")
        return res.status(403).json({
            message: "Username has already been taken."
        });
    } 
    else {
        model.UserModel.findOne({
            user_emailAdd: req.body.user_emailAdd
        },function(err, user){
            if(user != null){
                console.log("duplicate email")
                return res.status(403).json({
                    message: "Email has already been used."
                });
            }else{
                req.body.user_password = bcrypt.hashSync(req.body.user_password, bcrypt.genSaltSync(8), null);
                model.UserModel
                .create(req.body)
                .then(
                function() {
                    // res.statusMessage = "hello"; // sets custom status message
                    res.sendStatus(200);
                    console.log('user created');
                },
                function(error){
                    console.log(error.message)
                    res.sendStatus(400);
                }
                )
            }
        })
    }
    });
});

router.get('/:username',(req, res,next)=>{
    const uname = req.params.username;
    model.UserModel
    .find({user_username: uname})
    .exec()
    .then(
        doc=>{
            if(doc != null){
                console.log("get user successxx");
                res.status(200).send(doc);
                console.log(doc);
            }else{
                res.status(404).json({
                    message: 'Not found.'
                })
            }
        },
        function (error){
            res.status(404).json({
                message: error.message
            })
            console.log('error');
        }
    )
    .catch();
});



//signup w/ email(not yet working)
/*router.post("/signup", function(req, res) {
    model.UserModel.findOne({
      user_username: req.body.user_username
    }, function(err, user) {
    if (user != null) {
        //res.json(null);
        console.log("duplicate username")
        return res.status(403).json({
            message: "Username has already been taken."
        });
    } 
    else {
        model.UserModel.findOne({
            user_emailAdd: req.body.user_emailAdd
        },function(err, user){
            if(user != null){
                console.log("duplicate email")
                return res.status(403).json({
                    message: "Email has already been used."
                });
            }else{
                req.body.user_password = bcrypt.hashSync(req.body.user_password, bcrypt.genSaltSync(8), null);
                model.UserModel
                .create(req.body)
                .then(
                function() {
                    // res.statusMessage = "hello"; // sets custom status message
                    res.sendStatus(200);
                    console.log('user created');
                    var token = new Token({ user_username: req.body.user_username, token: crypto.randomBytes(16).toString('hex') });
 
                    // Save the verification token
                    token.save(function (err) {
                        if (err) { return res.status(500).send({ msg: err.message }); }
            
                        // Send the email
                        var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
                        var mailOptions = { from: 'no-reply@yourwebapplication.com', to: req.body.user_emailAdd, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
                        transporter.sendMail(mailOptions, function (err) {
                            if (err) { return res.status(500).send({ msg: err.message + "error sendmail" }); }
                            res.status(200).send('A verification email has been sent to ' + user.user_emailAdd + '.');
                        });
                    });
                },
                function(error){
                    console.log(error.message)
                    res.sendStatus(400);
                }
                )
            }
        })
    }
    });
});*/

router.post('/login',(req,res,next)=>{
    User.find({user_username: req.body.user_username})
    .exec()
    .then(user => {
        if(user.length < 1){
            /*return res.status(401).json({
                message: 'auth failed'
            })*/

            //return
            /*
                console.log('username not found');
            res.sendStatus(401);
            return res.status(401);
            */
           UserWeb.find({user_username: req.body.user_username})
           .exec()
           .then(userweb => {
               if(userweb.length < 1){
                console.log('username not found');
                res.sendStatus(401);
                return res.status(401);
               }
               if(bcrypt.compareSync(req.body.user_password,userweb[0].user_password)){
                /*return res.status(200).json({
                    message: 'auth successful',
                    user: user[0]
                })*/
                    console.log('auth successful web');
                    res.sendStatus(200);
                    return res.status(200);
                }
                else{
                    /*res.status(401).json({
                        message: 'auth failed'
                    })*/
                    console.log('wrong pw');
                    res.sendStatus(401);
                    return res.status(401);
                }
           })
        }
        if(bcrypt.compareSync(req.body.user_password,user[0].user_password)){
            /*return res.status(200).json({
                message: 'auth successful',
                user: user[0]
            })*/
            console.log('auth successful');
            res.sendStatus(200);
            return res.status(200);
        }
        else{
            /*res.status(401).json({
                message: 'auth failed'
            })*/
            console.log('wrong pw');
            res.sendStatus(401);
            return res.status(401);
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    });
});

module.exports = router;