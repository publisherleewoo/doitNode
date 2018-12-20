const fs = require('fs');
const os = fs.createWriteStream('./output2.txt')

os.on('finish', function () {
    console.log('finish!')
})

var is = process.stdin; //콘솔 입력
is.pipe(os);

// 서버 실행하고 입력해보기