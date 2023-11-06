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
//     console.info('1 success:',data)
// })
// .catch(err => {
//     console.error('1 error:', err)
// })

// // 2)
// let g1 = getData(1000)
// let g2 = getData(1500)
// let g3 = getData(2000)
// // Promise.all([g1, g2, g3])
// // .then(list => {
// //     console.log('2 P.all success, result is a array:', list)
// // }).catch(e => {
// //     console.error('2 P.all some error ocupied.', e)
// // })
// Promise.race([g1, g2, g3]).then(d => {
//     console.log('3 P.race success:', d)
// }, err => {
//     console.error('3 P.race error:', err)
// })

// // dom.click(function(e){ console.log(e) })

// // dom.click = fn => {
// //     dom.addEventListener('click', function(e){
// //         fn.call(dom, e)
// //     }, false)
// // }

// // function Person(fn){
// //     fn(function(){
// //         console.log('fn...')
// //     })
// // }

// // // 
// // new Person(function(x){
// //     console.log('person..')
// //     x()
// // })


const MyPromise = require('./Promise')
// import MyPromise from './Promise'
// const MyPromise = Promise

const getPromiseWithDelayFinish = (delay, isResolved = true) => {
    return new Promise(function(resolve, reject){
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