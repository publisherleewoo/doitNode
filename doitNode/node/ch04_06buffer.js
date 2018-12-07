var output = '안녕!';
var buffer1 = new Buffer(10);
var len = buffer1.write(output, 'utf8')
console.log('버퍼에 쓰인 문자열의 길이 : ' + len)
console.log('첫번째 버퍼에 쓰인 문자열 : ' + buffer1.toString())
console.log('버퍼객체인지여부 : ' + Buffer.isBuffer(buffer1))

var byteLen = Buffer.byteLength(buffer1);
console.log('byteLen : ' + byteLen);

var str1 = buffer1.toString('utf8', 0, 6);
console.log('str1 : ' + str1);

var buffer2 = Buffer.from('Hello', 'utf8');
console.log('두번째 버퍼의 길이 : ' + Buffer.byteLength(buffer2));

var str2 = buffer2.toString('utf8', 0, Buffer.byteLength(buffer2));
console.log('str2 : ' + str2);