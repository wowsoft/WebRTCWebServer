var mysql = require("mysql");
var logger = require("./utils/logger")

var pool = mysql.createPool({
    host: "localhost",
    user: "yhkim",
    password: "1111",
    database: "webrtcdb",
    connectionLimit: 10
});

exports.insertUser = function (obj, callback) {
    var sql = "insert into user1 (user_email, user_password, user_year, user_sex, user_gcm_register_id) values (?, ?, ?, ?, ?)";

    pool.getConnection(function (err, connection) {
        if (err) {
            logger.error(err.stack);
            callback(true, "connection error");
            return;
        }
        connection.query(sql, [obj.email, obj.password, obj.year, obj.sex, obj.gcm_register_id], function (err, results) {
            connection.release();
            if (err) {
                logger.error(err.stack);
                callback(true, "insertUser query error");
                return;
            }
            
            callback(false, null, results);
        });
    });
};

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