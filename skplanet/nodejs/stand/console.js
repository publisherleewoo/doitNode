var fs = require('fs');
var output = fs.createWriteStream('stdout.log')
var errorOutput = fs.createWriteStream('error.log')


var Console = require('console').Console;
var logger = new Console(output, errorOutput);
/* console.info */
/* console.log */
/* console.warn */
/* console.error */
logger.info('info message');
logger.log('log message');

logger.warn('warning');
logger.error('error');


