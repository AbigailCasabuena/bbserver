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

module.exports = router;