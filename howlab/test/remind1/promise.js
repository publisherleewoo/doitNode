

// new Promise((resolve, reject) => {
//     resolve('hi')
//     // reject('bye')


// }).then(r => {
//     console.log('여기', r)
//     return r
// }).then(r => {
//     console.log('터치r', r)
// }).catch(err => {
//     console.log('에러', err)
// })


// function test() {
//     return new Promise((resolve, reject) => {
//         setTimeout(function () {
//             resolve('hi')
//         }, 2000)
//     })
// }

// async function abc() {
//     console.log('hi')
//     var result = await test()
//     console.log('result')
// }

// abc()


var a = new Promise((res, rej) => {
    setTimeout(() => {
        res('hi')

    }, 2000)
})


a.then(r => { console.log(r) })


// var test = () => {
//     return new Promise((res, rej) => {
//         res('성공')
//     })
// }

// async function aaa() {
//     console.log('hi')
//     var k = await test()
//     console.log(k)
// }

// aaa()

























