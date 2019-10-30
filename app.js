const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const fs = require('fs');
const https = require('https');

const indexRouter = require("./route/index");
const loginRouter = require("./route/login");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://rasgo.iptime.org:27017/health_schedule", { useNewUrlParser: true })
  .then(() => {
    console.log("=====>Succeeded in connecting..");
  })
  .catch(err => {
    console.log(err);
  });

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

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

app.use(ErrorHandler);
app.use(CatchError);

const ssl_option = {
        key : fs.readFileSync('/home/node/ssl/privkey.pem'),
        cert : fs.readFileSync('/home/node/ssl/cert.pem')
};

https.createServer(ssl_option, app).listen(7002, function() {
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
