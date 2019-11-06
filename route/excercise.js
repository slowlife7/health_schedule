const express = require("express");
const router = express.Router();
const excercise = require("../model/excercise");
const paging = require("../private/paging")(excercise);

const COUNT_PER_PAGE = 6;
const COUNT_PAGINATION = 5;

const hasQuery = function(req) {
  return Object.keys(req.query).length && req.query.hasOwnProperty("query");
};

const hasPaging = function(req) {
  if (req.query.hasOwnProperty("pageNo")) return req.query.pageNo - 1;
  return 0;
};

router.get(
  "/",
  (req, res, next) => {
    const pageNo = hasPaging(req);
    const exec = {
      condition: {},
      sort: { created: -1 },
      skip: pageNo * COUNT_PER_PAGE,
      limit: parseInt(COUNT_PER_PAGE),
      currentpage: parseInt(pageNo),
      maxpaging: parseInt(COUNT_PAGINATION)
    };

    req.exec = exec;

    let q = {};
    if (req.session.userid) {
      q = { auth: true };
    }

    paging
      .findItems(exec)
      .then(result => {
        res.json({ ...result, ...q });
      })
      .catch(err => {
        next(new errors.QueryError(err.name, err.message));
      });
  }
);

module.exports = router;