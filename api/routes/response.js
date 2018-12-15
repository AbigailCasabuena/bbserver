const express = require('express');
const router = express.Router();
var model = require("../models");
const Response = require('../models/responseModel');

router.post('/',(req,res,next)=>{
    const response = new Response({
        event_id: req.body.event_id,
        user_id: req.body.user_id,
        response: req.body.response
    })
    response
    .save()
    .then(result=>{
        console.log(result);
        res.sendStatus(201);
    })
    .catch(err=>{
        res.sendStatus(500);
        console.log(err.message);
    })
})

router.get('/:userId',(req, res,next)=>{
    const id = req.params.userId;
    model.ResponseModel
    .find({user_id: id})
    .exec()
    .then(
        doc=>{
            if(doc != null){
                console.log("get response success");
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

router.delete('/:responseId',(req,res,next)=>{
    const id = req.params.responseId;
    model.ResponseModel.remove({_id: id})
    .exec()
    .then(result => {
        /*res.status(200).json({
            message: 'Delete successful.'
        });*/
        console.log("delete successful");
        res.sendStatus(200);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    });
});

module.exports = router;