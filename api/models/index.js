var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/bloodbankphdb", { useNewUrlParser: true });
mongoose.set("debug", true);


//module.exports.ProductModel = require("./productModel");
module.exports.UserModel = require('./userModel');
module.exports.VerificationTokenModel = require('./verificationTokenModel');
module.exports.AnnouncementModel = require('./announcementModel');