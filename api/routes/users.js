const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
var model = require("../models");
var bcrypt   = require('bcrypt-nodejs');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /users'
    });
});

/*router.post("/signup", (req, res,next)=> {
    model.UserModel
        .create(req.body)
        .then(
            function (postObj){
                console.log('success');
                res.sendStatus(200);
            },
            function (error){
                console.log(error.message);
                res.sendStatus(400);
            }
        );
});*/

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

router.post('/login',(req,res,next)=>{
    User.find({user_username: req.body.user_username})
    .exec()
    .then(user => {
        if(user.length < 1){
            /*return res.status(401).json({
                message: 'auth failed'
            })*/
            console.log('username not found');
            res.sendStatus(401);
            return res.status(401);
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