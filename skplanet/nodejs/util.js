var util = require('util');

var str1 = util.format('%d + %d = %d', 1, 2, (1 + 2))

console.log(str1)

var str2 = util.format('%s %s', 'hello', 'world')
console.log(str2)