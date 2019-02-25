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
const bdonationRoutes = require('./api/routes/blooddonation');

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
app.use('/blooddonation', bdonationRoutes);

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

prod.BloodRequestModel
    .find({request_status: 'pending'})
    .then(
        function(brequests){
            console.log("checking blood requests");
            if(brequests.length> 0){
                for(var x=0; x<brequests.length; x++){
                    //console.log(brequests[x].date_requested);
                    var oneDay = 24*60*60*1000; 
                    var dt = brequests[x].date_requested;
                    var firstDate = new Date(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
                    var current = new Date();
                    var secondDate = new Date(current.getFullYear(), current.getMonth() + 1, current.getDate());
                    //console.log(firstDate);
                    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                    console.log(diffDays);
                    if(diffDays == 3){ //should be greater than 4 DAYS
                        body = {
                            request_status: 'expired'
                        };
                        prod.BloodRequestModel.findByIdAndUpdate(brequests[x]._id,body)
                        .exec()
                        .then(result => {
                            console.log("blood request was expired");
                            //res.sendStatus(200);
                        }, function(error){
                            console.log(error.message);
                        })
                    }
                }
            }else{
                
            }
            },
            function(err){
                //res.sendStatus(400);
            }
    );


//console.log(diffDays);

function intervalFunc() {
    console.log('checking blood requests');
    prod.BloodRequestModel
    .find({request_status: 'pending'})
    .then(
        function(brequests){
            //console.log("get blood requests");
            if(brequests.length> 0){
                for(var x=0; x<brequests.length; x++){
                    //console.log(brequests[x].date_requested);
                    var oneDay = 24*60*60*1000; 
                    var dt = brequests[x].date_requested;
                    var firstDate = new Date(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
                    var current = new Date();
                    var secondDate = new Date(current.getFullYear(), current.getMonth() + 1, current.getDate());
                    //console.log(firstDate);
                    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                    console.log(diffDays);
                    if(diffDays == 3){ //should be greater than 4 DAYS
                        body = {
                            request_status: 'expired'
                        };
                        prod.BloodRequestModel.findByIdAndUpdate(brequests[x]._id,body)
                        .exec()
                        .then(result => {
                            console.log("blood request was expired");
                            //res.sendStatus(200);
                        }, function(error){
                            console.log(error.message);
                        })
                    }
                }
            }else{
                
            }
            },
            function(err){
                //res.sendStatus(400);
            }
    );
}
  
setInterval(intervalFunc, 86400000); //24 hrs

module.exports = app;