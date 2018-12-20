function task1(callback) {
    console.log('Task1 시작');
    setTimeout(function () {
        console.log('Task1 끝')
        callback()
    }, 300)
}

function task2(callback) {
    console.log('Task2 시작');
    setTimeout(function () {
        console.log('Task2 끝')
        callback()
    }, 200)
}

task1(function () {
    task2(function () { })
})
