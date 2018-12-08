const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
var model = require("../models");
var bcrypt   = require('bcrypt-nodejs');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const Token = require('../models/verificationTokenModel');
const UserWeb = require('../models/userModelWeb');
const multer = require('multer');
//const randomstring = require('randomstring');

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const storage2 = multer.diskStorage({
    destination: function(req,file,cb){
         cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
         cb(null, file.originalname);
    }
});

const upload = multer({storage:storage2,
    limits:{
        fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilter
});

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
                //console.log(doc);
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

router.get('/getId/:userId',(req, res,next)=>{
    const id = req.params.userId;
    model.UserModel
    .find({_id: id})
    .exec()
    .then(
        doc=>{
            if(doc != null){
                //console.log("get user successxx");
                console.log(doc);
                res.status(200).send(doc);
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

router.patch('/imageUpload/:userId',upload.single('user_image'),(req,res,next)=>{
    console.log(req.file);
    req.body.user_image = req.file.path;
    model.UserModel.findByIdAndUpdate(req.params.userId,req.body)
    .exec()
    .then(result => {
        console.log("Success update");
        res.sendStatus(200);
    }, function(error){
        console.log(error.message);
    })
});

router.patch('/:userId',(req,res,next)=>{
    /*if(req.body.user_password == null){
        console.log("no pw");
    }*/
    console.log(req.body);
    if(!(req.body.user_password == null) && !(req.body.user_username == null)){
        var namecheck = false;
        var pwcheck = false;
        
        model.UserModel.findOne({
            user_username: req.body.user_username
          }, function(err, userx) {
          if (userx != null) {
              //res.json(null);
            console.log("duplicate username");
            //namecheck = false;
          }else{
            /*namecheck = true;
            console.log("ok username");*/
            model.UserModel.findOne({
                _id: req.params.userId
              }, function(err, user) {
              if (user != null) {
                  //res.json(null);
                  if(bcrypt.compareSync(req.body.prevpw,user.user_password)){
                    /*pwcheck = true;    
                    console.log("okay pw");*/
                    req.body.user_password = bcrypt.hashSync(req.body.user_password, bcrypt.genSaltSync(8), null);
                    model.UserModel.findByIdAndUpdate(req.params.userId,req.body)
                        .exec()
                        .then(result => {
                            console.log("Success update");
                            res.sendStatus(200);
                        }, function(error){
                            console.log(error.message);
                            //console.log("error xx")
                            res.sendStatus(500);
                    })  
                  }else{
                    console.log("wrong pw");
                    //pwcheck = false;
                  }
              }else{
                console.log("no user found");
                res.sendStatus(404);
              }
            })
    
          }
        })

        /*if(namecheck == true && pwcheck == true){
            req.body.user_password = bcrypt.hashSync(req.body.user_password, bcrypt.genSaltSync(8), null);
            model.UserModel.findByIdAndUpdate(req.params.userId,req.body)
                .exec()
                .then(result => {
                    console.log("Success update");
                    res.sendStatus(200);
                }, function(error){
                    console.log(error.message);
                    //console.log("error xx")
                    res.sendStatus(500);
            })  
        }else{
            console.log("Namecheck " + namecheck);
            console.log("Pwcheck " + pwcheck);
            console.log("error update username and password");
            res.sendStatus(500);
        }*/
    }

    if(!(req.body.user_username == null) && (req.body.user_password == null)){
        model.UserModel.findOne({
            user_username: req.body.user_username
          }, function(err, user) {
          if (user != null) {
              //res.json(null);
              console.log("duplicate username")
              return res.status(403).json({
                  message: "Username has already been taken."
              });
          }else{
            model.UserModel.findByIdAndUpdate(req.params.userId,req.body)
            .exec()
            .then(result => {
                console.log("Success update");
                res.sendStatus(200);
            }, function(error){
                console.log(error.message);
                res.sendStatus(500);
            })
          }
        })
    }
    if(!(req.body.user_password == null) && (req.body.user_username == null)){
        model.UserModel.findOne({
            _id: req.params.userId
          }, function(err, user) {
          if (user != null) {
              //res.json(null);
              if(bcrypt.compareSync(req.body.prevpw,user.user_password)){
                req.body.user_password = bcrypt.hashSync(req.body.user_password, bcrypt.genSaltSync(8), null);
                model.UserModel.findByIdAndUpdate(req.params.userId,req.body)
                .exec()
                .then(result => {
                    console.log("Success update");
                    res.sendStatus(200);
                }, function(error){
                    console.log(error.message);
                    res.sendStatus(500);
                })      
              }else{
                  console.log("Wrong password");
                  res.sendStatus(500);
              }
          }else{
            console.log("no user found");
            res.sendStatus(404);
          }
        })
    }
});

module.exports = router;