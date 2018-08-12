const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /users'
    });
});

router.post('/login',(req,res,next)=>{
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if(user.length < 1){
            /*return res.status(401).json({
                message: 'auth failed'
            })*/
            console.log('username not found');
            res.sendStatus(401);
            return res.status(401);
        }
        if(user[0].password === req.body.password){
            /*return res.status(200).json({
                message: 'auth successful',
                user: user[0]
            })*/
            console.log('auth successful');
            res.sendStatus(200);
            return res.status(200);
        }
        else{
            /*res.status(401).json({
                message: 'auth failed'
            })*/
            console.log('wrong pw');
            res.sendStatus(401);
            return res.status(401);
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    });
});

module.exports = router;