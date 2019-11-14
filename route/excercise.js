const express = require("express");
const router = express.Router();
const excercise = require("../model/excercise");
const paging = require("../private/paging")(excercise);

const COUNT_PER_PAGE = 6;
const COUNT_PAGINATION = 5;

const hasPaging = function(req) {
  if (req.query.hasOwnProperty("pageNo")) return req.query.pageNo - 1;
  return 0;
};

router.get("/", (req, res, next) => {
  const userid = req.session.userid;
  if (!userid) return res.status(401).end();

  let q = {};
  if (req.session.userid) {
    q = { auth: true };
  }

  const pageNo = hasPaging(req);
  const exec = {
    condition: { userid: userid },
    sort: { created: -1 },
    skip: pageNo * COUNT_PER_PAGE,
    limit: parseInt(COUNT_PER_PAGE),
    currentpage: parseInt(pageNo),
    maxpaging: parseInt(COUNT_PAGINATION)
  };

  req.exec = exec;

  paging
    .findItems(exec)
    .then(result => {
      res.json({ ...result, ...q });
    })
    .catch(err => {
      next(new errors.QueryError(err.name, err.message));
    });
});

router.get('/pick', function(req, res) {
  const userid = req.session.userid;
  if (!userid) return res.status(401).end();

  excercise.find({userid:userid, pick:true}, {pick:false, created:false, updated:false, __v:false, _id:false})
  .then(result=>{
      res.json(result);
  })
  .catch(err=>{
      res.status(500).end();
  })
});

router.post("/", function(req, res) {
  let body = req.body;
  const userid = req.session.userid;
  if (!userid) return res.status(401).end();

  const name = body.name;
  if (!name) return res.status(400).end();

  body.userid = userid;
  const excer = new excercise(body);
  excer.save((err, doc) => {
    if (err) throw err;
    res.status(201).end();
  });
});

router.put("/", function(req, res) {
  let body = req.body;
  const userid = req.session.userid;
  if (!userid) return res.status(401).end();

  excercise
    .findOneAndUpdate({ userid: userid, _id: body._id }, body)
    .then(result => {
      console.log(result);
      res.status(200).end();
    })
    .catch(err => {});
});

router.delete("/", function(req, res) {
  let body = req.body;
  const userid = req.session.userid;
  if (!userid) return res.status(401).end();

  excercise.findOneAndDelete({ userid: userid, _id: body._id }).then(result => {
    res.status(200).end();
  });
});

module.exports = router;
