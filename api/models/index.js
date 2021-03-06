var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/bloodbankphdb", { useNewUrlParser: true });
mongoose.set("debug", true);


module.exports.ProductModel = require("./productModel");
module.exports.UserModel = require('./userModel');
module.exports.VerificationTokenModel = require('./verificationTokenModel');
module.exports.AnnouncementModel = require('./announcementModel');
module.exports.UserWebModel = require('./userModelWeb');
module.exports.NotificationModel = require('./notificationModel');
module.exports.ImageModel = require('./imgModel');
module.exports.ResponseModel = require('./responseModel');
module.exports.BloodRequestModel = require('./bloodRequestModel');
module.exports.BloodStockModel = require('./bloodStockModel');
module.exports.ChapterModel = require('./chapterModel');
module.exports.BloodDonationModel = require('./bloodDonationModel');