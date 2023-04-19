通过斐波那契数列的几种实现方法，递归和循环的差异，以及最后在TC39在ES6时代提出的尾递归优化TCO（Tail Call Optimization）在探究各种引擎上的处理方式。

+ 普通递归版
+ 递归+缓存优化版
+ 递归改迭代版
+ 尾递归优化(?)版

```js code:```
```javascript

// 斐波那契数列： [1, 1 ,2, 3, 5, 8, 13, 21, 34, 55, ...]
const Num = 7390 // 用于测试的值（测试未优化版本时不要超过50）
console.log('-----------------------------------------------------------------')



/**
 * 普通递归版
 * [NodeJS] 计算压力过大，n=44的时候计算时间已达16s，不会触发爆栈。
 */
let fb_call_count = 0
function fb_primitive(n){
    fb_call_count++
    return n < 2 ? 1 : (fb(n-1) + fb(n-2)) 
}
console.time('primitive-mode-time-cost')
console.log(`Primitive Mode,  n=${Num}, result is ${fb(Num)}, function call count:${fb_call_count}.`)
console.timeEnd('primitive-mode-time-cost')
console.log('-----------------------------------------------------------------')




/**
 * 普通递归+缓存优化版
 * 运行结果：
 * [NodeJS] 爆栈的临界值是n在 `[10471-10473]` 左右,time cost 10ms 上下
 */
let fb_cachelize_call_count = 0
const cacheMap = new Map()
function fb_cachelize(n){
    fb_cachelize_call_count++
    if(n < 2){
        return 1 
    }
    if(cacheMap.has(n)){
        return cacheMap.get(n)
    }else{
        let res = fb_cachelize(n-1) + fb_cachelize(n-2)
        cacheMap.set(n, res)
        return res
    }
}
console.time('cache-mode-time-cost')
console.log(`Cache mode, n=${Num}, result is ${fb_cachelize(Num)} , function call count:${fb_cachelize_call_count}`)
console.timeEnd('cache-mode-time-cost')
console.log('-----------------------------------------------------------------')




/**
 * 递归改迭代（循环）版
 * 运行结果：
 * [NodeJS] 没有使用栈，纯粹计算耗时，在n=5kw时耗时才达到1s的级别，综合性能最优。
 */ 
function fb_iterator(n){
    if(n < 2){
        return 1
    }
    let results = [1, 1]
    for(let i = 2; i<n+1; i++){
        results[i] = results[i-2] + results[i-1]
    }
    return results[n]
}
console.time('iterator-mode-time-cost')
console.log(`Iterator mode, n=${Num}, result is ${fb_iterator(Num)}. `)
console.timeEnd('iterator-mode-time-cost')
console.log('-----------------------------------------------------------------')




/**
 * 尾递归版
 * [NodeJS] 爆栈的临界值7390左右，耗时1ms左右（仍然发生爆栈错误说明还是保留了栈，并未完全去栈化）。
 *   其性能明显比非尾递归调用要更好，但是跟迭代版的远不在一个数量级。
 */
let fb_tail_call_count = 0
// (5, 1, 1) , (4, 1, 2), (3, 2, 3), (2, 3, 5), (1, 3, 5), (0, 5, 8)
function fb_tail_call(n, a=1, b=1){
    fb_tail_call_count++
    if(n < 1){
        return a
    }
    return fb_tail_call(n-1, b, a+b) 
}
console.time('tailcall-mode-time-cost')
console.log(`Tail call mode, n=${Num}, result is ${fb_tail_call(Num)}, function call count:${fb_tail_call_count}.`)
console.timeEnd('tailcall-mode-time-cost')
console.log('-----------------------------------------------------------------')

```
