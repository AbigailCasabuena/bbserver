const express = require('express');
const router = express.Router();
var prod = require("../models");
const multer = require('multer');
//const upload = multer({dest: 'uploads/'});
const Product = require('../models/productModel');
const Images = require('../models/imgModel');
var updateid;

/*const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});*/

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const storage2 = multer.diskStorage({
    destination: function(req,file,cb){
         cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
         cb(null, file.originalname);
    }
});

const upload = multer({storage:storage2,
    limits:{
        fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilter
});

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

router.post("/", upload.single('productImage'), (req, res,next)=> {
    console.log(req.file);
    const productx = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    productx
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Success"
        })
    })
    .catch(err => {
        res.sendStatus(500);
        console.log(err.message);
    })
});


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

router.patch('/:productId',upload.single('productImage'),(req,res,next)=>{
    console.log(req.file);
    /*const image = new Images({
        path: req.file.path
    });
    image
    .save()
    .then(result => {*/
        //console.log(result);
        req.body.productImage = req.file.path;
        prod.ProductModel.findByIdAndUpdate(req.params.productId,req.body)
        .exec()
        .then(result => {
            console.log("Success update");
            res.sendStatus(200);
        })
    /*})
    .catch(err => {
        res.sendStatus(500);
        console.log(err.message);
    })*/
});

module.exports = router;
