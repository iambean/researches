// console.log('\r\n\r\n')
// // Promsie的使用
// const getData = (param) => {
//     let date = new Date()
//     // let err = date - 1
//     return new Promise(function(resolve, reject){
//         setTimeout(function(){
//             if(date % 2){
//                 resolve(date.toLocaleTimeString())
//             }else{
//                 reject(date.toLocaleTimeString())
//             }
//         }, param)
//     })
// }

// // 1)
// getData(1500)
// .then(data => {

const MyPromise = require('./Promise')
// import MyPromise from './Promise'
// const MyPromise = Promise

const getPromiseWithDelayFinish = (delay, isResolved = true) => {
    return new MyPromise(function(resolve, reject){
        let data = [1,2,4,5,7]
        let err = 'can\'t find.'
        
        setTimeout(function(){
            // 如果未定义是否resolved，就随机。
            if(isResolved === undefined){
                isResolved = Date.now() % 2
            }
            isResolved ? resolve(data) : reject(err)

        }, delay)
    })
}

let p1 = getPromiseWithDelayFinish(1000)
let p2 = getPromiseWithDelayFinish(2000)

// p
// .then(data => {
//     console.log('success:', data)
// }).catch(e => {
//     console.log('error:', e)
// })

// console.log(MyPromise.resolve({n:'Success'}))
setTimeout(()=>{
    p1.then(d=>console.info('......', d))
    console.log(p1)
}, 5000)

console.log(p1)



/**
 * 以下代码运行结果得出的结论：
 * 每个then()运行后返回的都是一个全新的Promise对象，因此即使连续then()，一个Promise对象也不需要一个回调函数队列而只需要一个回调函数就行
 */
var p = new Promise(resolve => resolve(1))
var p1 = p.then(d => d+1)
var p2 = p.then(d => d+2)
var p3 = p.then(d => d+1).then(d => d+2)
setTimeout(() => {
    // 1, 2, 3, 4, false, false, false
	console.log(p, p1, p2, p3, p === p1, p1 === p2, p === p3)
}, 0)
