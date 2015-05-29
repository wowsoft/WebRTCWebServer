var express = require("express");
var router = express.Router();
var db = require("../database");

var returnObj = function (err, msg, rows) {
    if (err) { return { result: "ERROR", err: msg }; }

    return {
        result: "OK",
        err: "",
        json: rows,
        length: rows.length
    };
}

router.get("/", function (req, res) {
    res.json({ user: "tobi" });
});

router.get("/add", function (req, res){
    param = req.body;
    //console.log(param);
    db.getUserInfo(param, function (err, msg, rows) {
        res.header("Content-Type", "application/json");

        if (err) { res.send(500, returnObj(err, msg)); return; }

        res.send(200, returnObj(err, msg, rows));
    });
})

module.exports = router;