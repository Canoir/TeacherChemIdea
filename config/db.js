var mongoose = require("mongoose");
// var url = "mongodb://webopeni_aramestanU:V3RdpJKmwvCYiNx@localhost:27017/webopeni_aramestan";
var url = "mongodb://localhost:27017/Examiner";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    throw e;
  }
};
module.exports = InitiateMongoServer;
