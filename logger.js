import winston from 'winston'
const logger = winston.createLogger({
  'transports': [
        new winston.transports.File({
        filename:'logs/dailyLogs.log'
    })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format:'DD-MMM-YYYY HH:mm:ss'
        }),
        winston.format.align(),
        winston.format.printf(info=>`${info.level} : ${[info.timestamp]}:${info.message}`)
    )
})
export default logger