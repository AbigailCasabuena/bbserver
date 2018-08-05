const express = require('express');
const router = express.Router();
var prod = require("../models");

/*router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});*/

router.get('/',(req, res,next)=>{
    prod.ProductModel
    .find()
    .then(
        function(products){
            res.json(products);
            console.log("get");
        },
        function(err){
            res.sendStatus(400);
        }
        );
});

router.post("/", (req, res,next)=> {
    prod.ProductModel
        .create(req.body)
        .then(
            function (postObj){
                console.log('success');
                res.sendStatus(200);
            },
            function (error){
                console.log('error');
            }
        );
});


/*router.post('/',(req,res,next)=>{
    const product = {
        name: req.body.name,
        price: req.body.price
    };

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});*/

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    if(id==='special'){
        res.status(200).json({
            message: 'You discovered the special id',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'You passed an id'
        });
    }
});

module.exports = router;
