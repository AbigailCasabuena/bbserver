const express = require('express');
const router = express.Router();
var model = require("../models");

router.get('/:userId',(req, res,next)=>{
    const id = req.params.userId;
    model.NotificationModel
    .find({$or: [ { user_id: id}, { user_id: "null"} ]})
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
