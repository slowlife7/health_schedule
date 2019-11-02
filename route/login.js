const express = require("express");
const router = express.Router();
const user = require("../model/user");

router.post("/", (req, res, next) => {
  console.log("router login");
  const session = req.session;
  console.log(req.body);
  if (session.userid) {
    res.redirect("/");
  } else {
    user.findOne({ userid: req.body.userid }).then(result => {
        console.dir(result._doc.password);
        console.log(result.password, req.body.password);
      if (result == null) {
        res.status(401).end();
      } else if (result._doc.password === req.body.password) {
        session.userid = req.body.userid;
        session.password = req.body.password;
        res.redirect("/");
      } else {
        res.status(401).end();
      }
    });
  }
});

router.get("/", (req, res, next) => {
  console.log('11111');
  const session = req.session;
  if (session.userid) {
    res.redirect('/');
  } else {
      console.log('login..');
    res.render('login', {});
  }
});

module.exports = router;
