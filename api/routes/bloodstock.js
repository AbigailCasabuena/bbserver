const express = require('express');
const router = express.Router();
var model = require("../models");
const BloodStock = require('../models/bloodStockModel');

router.get('/',(req, res,next)=>{
    BloodStock
    .find()
    .select('_id blood_type rh_factor num_stock blood_component chapter')
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
    .find({blood_type: req.body.blood_type, rh_factor: req.body.rh_factor, blood_component: req.body.blood_component, remaining_stock: {$gte: req.body.num_stock}})
    .select('_id blood_type rh_factor blood_component chapter reserved_stock remaining_stock num_stock')
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
