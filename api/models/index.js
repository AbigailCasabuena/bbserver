var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/sampledb", { useNewUrlParser: true });
mongoose.set("debug", true);


module.exports.ProductModel = require("./productModel");
module.exports.UserModel = require('./userModel');