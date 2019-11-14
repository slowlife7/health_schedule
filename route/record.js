const express = require("express");
const router = express.Router();
const record = require("../model/record");

router.get('/', (req, res, next)=>{
    const userid = req.session.userid;
    if (!userid) return res.status(401).end();

    const start = req.query.start; //2019-11-14
    const end = req.query.end;      //2019-11-15
    if(!start || !end) return res.status(400).end();

    record.find({userid:userid, conductedAt: { "$gte": start, "$lt": end }})
    .then(result => {
        res.json(result);
    });
});

router.post('/', (req, res, next)=>{
    const userid = req.session.userid;
    if (!userid) return res.status(401).end();
    let body = req.body;
    body.userid = userid;
    const r = new record(body);
    r.save((err, doc) => {
        if (err) throw err;
        res.status(201).end();
    });
})

module.exports = router;
