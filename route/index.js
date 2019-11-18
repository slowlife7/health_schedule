const express = require("express");
const router = express.Router();
const calendar = require("../public/javascript/calendar")();
const record = require("../model/record");
const moment = require("moment");

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

<<<<<<< Updated upstream
    res.render("calendar", { title: dateString, days: cal.days, start:cal.startIndex, end:cal.days.length - 1 });
=======
    console.log(cal.days);

    const start = `"${dateString}.${cal.days[cal.startIndex]}"`;
    const end = `"${dateString}.${cal.days[cal.days.length - 1]}"`;
    console.log(start);
    console.log(end);

    record
      .find({
        userid: session.userid,
        conductedAt: { $gte: new Date(start), $lt: new Date(end) }
      })
      .then(result => {
        console.log(result);

        const completedDays = [];
        if (Array.isArray(result)) {
          result.forEach(item => {
            const day = moment(item.conductedAt).format("DD");
            completedDays.push(day);
          });
        }

        console.dir(completedDays);
        res.render("calendar", {
          title: dateString,
          days: cal.days,
          complete: completedDays
        });
      });
>>>>>>> Stashed changes
  }
});

module.exports = router;
