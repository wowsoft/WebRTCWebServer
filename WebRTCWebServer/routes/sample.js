var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/", function (req, res) {
    var filepath = '/root';
    fs.open(filepath, 'r', function (err) {
        throw new Error("TEST");
        //
        // 당연히 에러가 나면
        // throw !!!
        // 문자열을 사용할 때는 new Error('') 추천
        //
        if (err) throw err;
        res.send(200, { title: 'Express' });
    });
});

module.exports = router;