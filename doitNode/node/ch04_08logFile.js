var winston = require('winston');
var winstonDaily = require('winston-daily-rotate-file'); //날짜마다 추가되서 로그파일생성
var moment = require('moment'); //날짜나 시간

function timeSteampFormat() {
     return moment().format('YYYY-MM-DD HH:mm:ss:.SSS ZZ')
}

var logger = new(winston.Logger)({
     transports: [
          new(winstonDaily)({
               name: 'info-file',
               filename: '/log/server',
               datePattern: '_yyyy-MM-DD-HH.log',
               colorize: false,
               maxsize: 50000000,
               maxFiles: 1000,
               level: 'info',
               showLevel: true,
               json: false,
               timesteamp: timeSteampFormat
          }),
          new(winston.transports.Console)({
               name: 'debug-console',
               colorize: true,
               level: 'debug',
               showLevel: true,
               json: false,
               timesteamp: timeSteampFormat
          })
     ]
});


logger.debug('디버깅 메시지 입니다');
logger.error('에러 메시지입니다');