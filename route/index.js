const express = require("express");
const router = express.Router();
const calendar = require("../public/javascript/calendar")();

router.get("/", (req, res, next) => {
  const session = req.session;
  console.log(req.body);
  if (!session.userid) {
    res.redirect("/login");
  } else {
    console.log("index:", session.userid);

    const date = new Date();
    const dateString = date.getFullYear() + "." + (date.getMonth() + 1);
    console.log(dateString);

    const cal = calendar.get({
      year: date.getFullYear(),
      month: date.getMonth() + 1
    });
    // res.status(200).end();
    console.log(cal.days);
    res.render("calendar", { title: dateString, days: cal.days });
  }
});

module.exports = router;
