const express = require('express');
const router = express.Router();
var model = require("../models");

router.get('/',(req, res,next)=>{
    model.AnnouncementModel
    .find()
    .then(
        function(announcements){
            //res.json(products);
            console.log("get announcements");
            if(announcements.length > 0){
                res.status(200).send(announcements);
                var jsonval = [];
                jsonval = announcements;
                //console.log(jsonval);
            }else{
                res.status(404).json({
                    message: 'No entries found.'
                })
            }
        },
        function(err){
            res.sendStatus(400);
        }
        );
});

router.get('/:newsFeedId',(req, res,next)=>{
    const id = req.params.newsFeedId;
    model.AnnouncementModel
    .find({_id: id})
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

module.exports = router;
