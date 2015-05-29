var mysql = require("mysql");
var logger = require("./utils/logger")

var pool = mysql.createPool({
    host: "localhost",
    user: "yhkim",
    password: "1111",
    database: "sampeldb",
    connectionLimit: 10
});

exports.getUserInfo = function (obj, callback) {
    var sql = "SELECT title, content1 FROM entries WHERE title = ?";

    pool.getConnection(function (err, connection) {
        if (err) {
            logger.error(err.stack);
            callback(true, "connection error");
            return;
        }

        connection.query(sql, [obj["title"]], function (err, results) {
            connection.release();
            if (err) {
                logger.error(err.stack);
                callback(true, "getUserInfo query error");
                return;
            }

            callback(false, null, results);
        });
    });
};