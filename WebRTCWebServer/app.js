
// Module Load
var express = require("express");
var user = require("./routes/user");
var sample = require("./routes/sample");
var bodyParser = require("body-parser");
var express_domain = require("express-domain-middleware");
var fs = require("fs");
var morgan = require("morgan");
var logger = require("./utils/logger")

var app = express();

// Express Middleware Config
app.use(express.static("static"));
app.use(bodyParser.json());
app.use(express_domain);

// Logger Config
app.use(morgan({ "stream": logger.stream }));

// Route Config
app.use("/user", user);
app.use("/sample", sample);

// Application Error Handler
app.use(function (err, req, res, next) {
    logger.error(err.stack);
    res.send(500, 'found error, sorry');
});

// Server Start
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});