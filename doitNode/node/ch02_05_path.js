var path = require('path');

var directories = ['Users', 'Mars', 'docs'];
console.log(directories.join())

var dirStr = directories.join(path.sep);
console.log('dirStr : ' + dirStr)

var filepath = path.join('/Users/Mars', 'notepad.exe');
console.log('filepath : ' + filepath)

var dirname = path.dirname(filepath)
console.log('dirname : ' + dirname)

var basename = path.basename(filepath);
console.log('basename : ' + basename);

var extname = path.extname(filepath);
console.log('extname : ' + extname)