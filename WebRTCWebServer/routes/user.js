﻿var express = require("express");
var router = express.Router();
var db = require("../database");

var returnObj = function (err, msg, rows) {
    if (err) {
        return {
            result: "ERROR"
        };
    }

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

router.post("/add", function (req, res){
    param = req.body;
    db.insertUser(param, function (err, msg, rows) {
        res.header("Content-Type", "application/json");

        if (err) {
            console.log("error: " + msg);
            res.send(500, returnObj(err, msg));
            return;
        }

        res.send(200, returnObj(err, msg, rows));
    });
})

module.exports = router;