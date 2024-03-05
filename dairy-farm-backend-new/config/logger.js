const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.printf(({ level, message, timestamp, ip }) => {
            return `[${timestamp}] [${level.toUpperCase()}] [${ip}] ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logfile.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple(),
                winston.format.printf(({ level, message, timestamp, ip }) => {
                    return `[${timestamp}] [${level.toUpperCase()}] [${ip}] ${message}`;
                    console.log(timeStamp)
                })
            )
        }),
    ],
});

module.exports = logger;
