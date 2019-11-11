const app = require("../app");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://rasgo.iptime.org:27017/fitness", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("=====>Succeeded in connecting..");

    app.listen(7002, function() {
      console.log("Server is running on port 7002.");
    });
  })
  .catch(err => {
    console.log(err);
  });
