process.on('exit', function () {
     console.log('exit이벤트 실행')
});


setTimeout(function () {
     console.log('2초후에 실행되었음')
     process.exit()

}, 2000)