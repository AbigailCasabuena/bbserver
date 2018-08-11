const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var passport = require('passport');
//Passport
require('./config/passport')(passport); // pass passport for configuration
//Routes
const prodRoutes = require('./api/routes/products');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE');
        return res.status(200).json({});
    }
});*/

app.use('/products',prodRoutes);

app.use((req,res,next)=> {
    res.status(200).json({
        message: 'It works!'
    });
});

app.use((req,res,next)=>{
    const error= new Error('not found');
    error.status= 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;