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

const BloodRequest = require('../models/bloodRequestModel');
//const randomstring = require('randomstring');

const Image = require('../models/imgModel');

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

router.post("/",upload.array('request_form'),(req, res,next)=> {
    //console.log(req.file);
    console.log(req.files.length);
    var pathval = [];
    for(var a=0; a < req.files.length; a++){
        pathval[a] = req.files[a].path;
    }
    const brequest = new BloodRequest({
        requester_id: req.body.requester_id,
        patient_name: req.body.patient_name,
        number_bags: req.body.number_bags,
        chapter_id: req.body.chapter_id,
        is_urgent: req.body.is_urgent,
        person_claim: req.body.person_claim,
        request_form: pathval
    });
    brequest
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Success"
        })
    })
    .catch(err => {
        res.sendStatus(500);
        console.log(err.message);
    })
});

router.get('/:userId',(req, res,next)=>{
    const id = req.params.userId;
    BloodRequest.find({requester_id: id}).sort({date_requested:-1}) 
    .select('_id patient_name number_bags date_requested request_status')
    .exec()
    .then(
        doc=>{
            if(doc != null){
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

router.patch('/:Id',(req,res,next)=>{
    BloodRequest.findByIdAndUpdate(req.params.Id,req.body)
    .exec()
    .then(result => {
        console.log("Success update");
        res.sendStatus(200);
    }, function(error){
        console.log(error.message);
    })
});

module.exports = router;