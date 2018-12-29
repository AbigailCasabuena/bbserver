const express = require('express');
const router = express.Router();
var model = require("../models");
const BloodStock = require('../models/bloodStockModel');

router.get('/',(req, res,next)=>{
    BloodStock
    .find()
    .select('_id blood_group num_stock blood_category chapter')
    .populate('chapter')
    .exec()
    .then(
        doc=>{
            //res.status(200).json(doc);
            res.status(200).send(doc);
            console.log(doc);
        }
    )
    .catch();
});

router.post('/check',(req, res,next)=>{
    BloodStock
    .find({blood_group: req.body.blood_group, blood_category: req.body.blood_category, remaining: {$gte: req.body.num_stock}})
    .select('_id blood_group blood_category chapter reserved remaining num_stock')
    .populate('chapter')
    .exec()
    .then(
        doc=>{
            //res.status(200).json(doc);
            res.status(200).send(doc);
            console.log(doc);
        }
    )
    .catch();
});

router.patch('/:stockId',(req,res,next)=>{
    BloodStock.findByIdAndUpdate(req.params.stockId,req.body)
    .exec()
    .then(result => {
        console.log("Success update");
        res.sendStatus(200);
    }, function(error){
        console.log(error.message);
    })
});

module.exports = router;
