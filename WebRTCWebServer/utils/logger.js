var winston = require("winston");
winston.emitErrs = true;

var logger = new winston.Logger( {
    transports: [
        new winston.transports.File( {
            level: "error",
            filename: "logs/error.log",
            handleExceptions: true,
            json: false,
            maxsize: 5242880,
            maxFilese: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: "info",
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};