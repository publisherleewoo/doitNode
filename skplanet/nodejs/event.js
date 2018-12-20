process.on('exit', function (code) {
    console.log('exit event : ', code)
});

process.once('exit', function (code) {
    console.log('exit once:', code)
})

process.emit('exit');
process.emit('exit', 0);
process.emit('exit', 1);

