const express = require("express");
const router = express.Router();
const user = require("../model/user");

router.get("/", (req, res, next) => {
  res.render("signup");
});

router.post("/", (req, res, next) => {
  const body =req.body;
  console.log(body);
  console.dir(body);
  if(!body || !body.userid || !body.password ) return res.status(400).end();

  console.log(body.password);
  const u = new user({
    userid: body.userid,
    password: body.password,
    email : body.email
  });

  u.save((err, doc) => {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = router;
