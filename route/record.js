const express = require("express");
const router = express.Router();
const record = require("../model/record");

router.get("/", (req, res, next) => {
  const userid = req.session.userid;
  if (!userid) return res.status(401).end();

  const start = req.query.start; //2019-11-14
  const end = req.query.end; //2019-11-15
  if (!start || !end) return res.status(400).end();

  record
    .find({
      userid: userid,
      conductedAt: { $gte: new Date(start), $lt: new Date(end) }
    })
    .then(result => {
      res.json(result);
    });
});

router.post("/", (req, res, next) => {
  const userid = req.session.userid;
  if (!userid) return res.status(401).end();
  let body = req.body;
  //body.userid = userid;
  console.log("conduct:", body.conductedAt);
  const r = new record({
    userid,
    excercises: body,
    conductedAt: new Date(body.conductedAt)
  });
  r.save((err, doc) => {
    if (err) throw err;
    res.status(201).end();
  });
  res.json(r);
});

module.exports = router;
