const https = require("https");
const fs = require("fs");
const app = require("../app");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://rasgo.iptime.org:27017/fitness", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("=====>Succeeded in connecting..");
    const ssl_option = {
      key: fs.readFileSync("/home/node/ssl/privkey.pem"),
      cert: fs.readFileSync("/home/node/ssl/cert.pem")
    };

    https.createServer(ssl_option, app).listen(7002, function() {
      console.log("Server is running on port 7002.");
    });
  })
  .catch(err => {
    console.log(err);
  });
