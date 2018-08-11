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
            //res.json(products);
            console.log("get products");
            if(products.length> 0){
                res.status(200).json(products)
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
                res.sendStatus(400);
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

/*router.get('/:productId',(req,res,next)=>{
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
});*/

router.get('/:productId',(req, res,next)=>{
    const id = req.params.productId;
    prod.ProductModel
    .findById(id)
    .exec()
    .then(
        doc=>{
            if(doc != null){
                console.log(doc);
                res.status(200).json({
                product: doc
                })
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

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    prod.ProductModel.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Delete successful.'
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    });
});

module.exports = router;
