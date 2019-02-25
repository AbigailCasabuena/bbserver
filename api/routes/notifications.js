const express = require('express');
const router = express.Router();
var model = require("../models");

router.get('/:userId',(req, res,next)=>{
    const id = req.params.userId;
    model.NotificationModel
    .find({$and: [{$or: [ { user_id: id}, { user_id: "null"}]},{$or: [{user_type: "null"}, {user_type: "bbusers"}]}]})
    //.find({$or: [ { user_id: id}, { user_id: "null"}, {user_type: "null"}, {user_type: "bbusers"}]})
    .exec()
    .then(
        doc=>{
            if(doc != null){
                console.log("get notification success");
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

router.get('/chapter/bloodbank',(req, res,next)=>{
    //const chapterid = req.params.chapterId;
    model.NotificationModel
    .find({$or: [{user_type: "null"}, {user_type: "bbpersonnel"}]})
    .exec()
    .then(
        doc=>{
            if(doc != null){
                console.log("get notification admin success");
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

/*router.get('/',(req, res,next)=>{
    model.NotificationModel
    .find({all_users: true})
    .exec()
    .then(
        doc=>{
            if(doc != null){
                console.log("get notification success");
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
});*/

module.exports = router;
