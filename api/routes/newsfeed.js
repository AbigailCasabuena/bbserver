const express = require('express');
const router = express.Router();
var model = require("../models");
const multer = require('multer');
const upload = multer({dest: '/uploads/'});

router.get('/',(req, res,next)=>{
    model.AnnouncementModel
    .find()
    .then(
        function(announcements){
            //res.json(products);
            console.log("get announcements");
            if(announcements.length> 0){
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



module.exports = router;
