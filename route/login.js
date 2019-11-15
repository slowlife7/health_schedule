const express = require("express");
const router = express.Router();
const user = require("../model/user");

router.post("/", (req, res, next) => {
  const session = req.session;
  console.log(req.body);
  if (session.userid) {
    res.redirect("/");
  } else {
    user.findOne({ userid: req.body.userid }).then(result => {
     
      console.log(result.password, req.body.password);

      

      if (result == null) {
        res.status(401).end();
      } else if (result._doc.password === req.body.password) {
        session.userid = req.body.userid;
        session.password = req.body.password;
        res.redirect("/");
      } else {
        req.flash("errors", { msg: "로그인 실패" });
        res.redirect("/");
      }
    });
  }
});

router.get("/", (req, res, next) => {
  const session = req.session;
  if (session.userid) {
    res.redirect("/");
  } else {
    const errors = req.flash("errors")[0] || {};
    console.log(":", errors);

    res.render("login", { error: errors.msg });
  }
});

module.exports = router;
