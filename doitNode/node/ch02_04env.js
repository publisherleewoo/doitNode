var nconf = require('nconf');
nconf.env();
var value = nconf.get('OS')

console.log(value);