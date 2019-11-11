const express = require("express");
const router = express.Router();
const calendar = require("../public/javascript/calendar")();

router.get("/", (req, res, next) => {
  const session = req.session;
  console.log(req.body);
  if (!session.userid) {
    res.redirect("/login");
  } else {
    const date = new Date();
    const dateString = date.getFullYear() + "." + (date.getMonth() + 1);

    const cal = calendar.get({
      year: date.getFullYear(),
      month: date.getMonth() + 1
    });
    res.render("calendar", { title: dateString, days: cal.days });
  }
});

module.exports = router;
