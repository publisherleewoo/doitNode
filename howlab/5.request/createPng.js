const request = require('request')
const fs = require('fs');


request('https://previews.123rf.com/images/nveri/nveri1601/nveri160100050/50903400-%EB%8B%A4%EC%B1%84%EB%A1%9C%EC%9A%B4-%EC%9D%8C%EC%95%85-%EB%B0%B0%EA%B2%BD.jpg').pipe(fs.createWriteStream('doodle.png'))