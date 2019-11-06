const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
//const fs = require('fs');
const http = require("http");

const indexRouter = require("./route/index");
const loginRouter = require("./route/login");
const excerciseRouter = require("./route/excercise");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://rasgo.iptime.org:27017/fitness", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("=====>Succeeded in connecting..");
  })
  .catch(err => {
    console.log(err);
  });

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "herry@#$1",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

app.use("*.ico", FaviconHandler);
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/excercises", excerciseRouter);

app.use(ErrorHandler);
app.use(CatchError);

/*const ssl_option = {
        key : fs.readFileSync('/home/node/ssl/privkey.pem'),
        cert : fs.readFileSync('/home/node/ssl/cert.pem')
}; */

http.createServer(app).listen(7002, function() {
  console.log("app listening on port 7002!");
});

function FaviconHandler(req, res, next) {
  res.status(200).end();
}

function ErrorHandler(req, res, next) {
  console.log("Can not found any router!!!!");
  res.status(404).end();
}

function CatchError(err, req, res, next) {
  res.status(500).end(err);
}
