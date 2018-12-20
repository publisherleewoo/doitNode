const querystring = require('querystring');
const str = 'group=EXID&name=하니&since=';

var parsed = querystring.parse(str)

console.log(parsed)
console.log(parsed.group)
console.log(parsed.name)
console.log(parsed.since)
console.log(parsed.friend)