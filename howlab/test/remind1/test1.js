const fs = require('fs')
const path = require('path')


// fs.mkdirSync('./test2');
// for (var i = 0; i < 9; i++) {
//     fs.writeFileSync('./test2/b' + i, 'hi' + i)
// }


for (var i = 0; i < 9; i++) {

    fs.rmdir('./test/a' + i, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
    });

}