const express = require("express");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");
const indexRouter = require("./route/index");
const loginRouter = require("./route/login");
const excerciseRouter = require("./route/excercise");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(flash());
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

module.exports = app;
