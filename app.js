const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var passport = require('passport');
const mongoose = require('mongoose');

//const myrouter = express.Router();
var prod = require("./api/models");

var server = require('http').Server(app);
const port = process.env.PORT || 3000;
server.listen(port);

var socketio = require('socket.io');
var websocket = socketio(server);

//appxx = require('socket.io')();

websocket.on('connection', (socket) => {
    console.log('A client just joined on', socket.id);
    socket.on('hello',()=>{
        socket.emit('xx');
    })
    socket.on('try',()=>{
        //myrouter.get('/',(req, res,next)=>{
            prod.ProductModel
            .find()
            .then(
                function(products){
                    //res.json(products);
                    console.log("get products");
                    if(products.length> 0){
                        socket.emit('prods',products);
                        //res.status(200).send(products)
                    }else{
                        /*res.status(404).json({
                            message: 'No entries found.'
                        })*/
                    }
                },
                function(err){
                    //res.sendStatus(400);
                }
                );
        //});
        //console.log('hello');
    })
});

//Passport
require('./config/passport')(passport); // pass passport for configuration
//Routes
const prodRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/users');
const newsfeedRoutes = require('./api/routes/newsfeed');
const notificationRoutes = require('./api/routes/notifications');
const responseRoutes = require('./api/routes/response');
const bloodstockRoutes = require('./api/routes/bloodstock');
const chapterRoutes = require('./api/routes/chapter');
const brequestRoutes = require('./api/routes/bloodrequest');

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/uploads/',express.static('uploads'));

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
app.use('/users',userRoutes);
app.use('/newsfeed',newsfeedRoutes);
app.use('/notification',notificationRoutes);
app.use('/response',responseRoutes);
app.use('/bloodstock', bloodstockRoutes);
app.use('/chapter', chapterRoutes);
app.use('/bloodrequest', brequestRoutes);

/*app.use((req,res,next)=> {
    res.status(200).json({
        message: 'It works!'
    });
});*/
/*app.use('/',(req,res,next)=>{
    res.json({
        message: "hello",
    })
})*/

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

console.log('listening to ' + port);

module.exports = app;