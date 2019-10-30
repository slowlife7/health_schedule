const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    const session = req.session;
    console.log(req.body);
    if (!session.userid) {
        res.redirect("/login");
    } else {
        console.log('index:', session.userid);
        res.render('index', { userid: session.userid });
    }
});

module.exports = router;