const express = require("express");
const router = express.Router();
const record = require("../model/record");
const excercise = require("../model/excercise");

router.get('/', (req, res, next)=>{
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
