const express = require('express');
const router = express.Router();
var model = require("../models");
const Chapter = require('../models/chapterModel');

router.get('/',(req, res,next)=>{
    Chapter
    .find()
    .exec()
    .then(
        doc=>{
            res.status(200).json(doc)
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

module.exports = router;
