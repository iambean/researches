// 斐波那契数列 [0, 1, 1 ,2, 3, 5, 8, 13, 21, 34, 55]
const Num = 6000 // 用于测试的值（普通递归50就差不多要2分钟。）
console.log('-----------------------------------------------------------------')


/**
 * 普通递归版
 */
let fb_call_count = 0
function fb(n){
    fb_call_count++
    return n < 2 ? n : (fb(n-1) + fb(n-2)) 
}
// console.time('original')
// console.log(`Original, n=${Num}, result is ${fb(Num)}, function call count:${fb_call_count}.`)
// console.timeEnd('original')
// console.log('-----------------------------------------------------------------')

/**
 * 递归+缓存优化版
 */
let fb_cachelize_call_count = 0
const cachelizedMap = new Map()
function fb_cachelize(n){
    fb_cachelize_call_count++
    if(n < 2){
        return n 
    }
    if(cachelizedMap.has(n)){
        return cachelizedMap.get(n)
    }else{
        let res = fb_cachelize(n-1) + fb_cachelize(n-2)
        cachelizedMap.set(n, res)
        return res
    }
}
console.time('cachelized')
console.log(`Cache mode, n=${Num}, result is ${fb_cachelize(Num)} , function call count:${fb_cachelize_call_count}`)
console.timeEnd('cachelized')
console.log('-----------------------------------------------------------------')

/**
 * 递归改迭代版
 */ 
let fb_iterator_call_count = 0
function fb_iterator(n){
    fb_iterator_call_count++
    if(n < 2){
        return n
    }
    let results = [0, 1]
    for(let i = 2; i<n+1; i++){
        results[i] = results[i-2] + results[i-1]
    }
    return results[n]
}
console.time('fb_iterator')
console.log(`Iterator mode, n=${Num}, result is ${fb_iterator(Num)}, function call count:${fb_iterator_call_count}. `)
console.timeEnd('fb_iterator')
console.log('-----------------------------------------------------------------')

/**
 * 尾递归优化版
 * (5, 0, 1) , (4, 1, 1), (3, 1, 2), (2, 2, 3), (1, 3, 5), (0, 5, 8)
 */
let fb_tail_call_count = 0
function fb_tail_call(n, a=0, b=1){
    fb_tail_call_count++
    if(n < 1){
        return a
    }
    return fb_tail_call(n-1, b, a+b)
}
console.time('fb_tail_call')
console.log(`Tail call mode, n=${Num}, result is ${fb_tail_call(Num)}, function call count:${fb_tail_call_count}.`)
console.timeEnd('fb_tail_call')
console.log('-----------------------------------------------------------------')
