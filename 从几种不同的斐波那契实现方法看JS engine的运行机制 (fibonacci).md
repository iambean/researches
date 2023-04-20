
> 在这些时候，我可以附和着笑，老板是决不责备的。而且老板见了孔乙己，也每每这样问他，引人发笑。孔乙己自己知道不能和他们谈天，便只好向孩子说话。有一回对我说道，“你学过JS么？”我略略点一点头。他说，“学过JS，……我便考你一考。斐波那契数列，怎样写的？”我想，讨饭一样的人，也配考我么？便回过脸去，不再理会。孔乙己等了许久，很恳切的说道，“不能写罢？……我教给你，记着！这些写法应该记着。将来做了老板的时候，也还会用到。”我暗想我和老板的等级还很远呢，而且我老板也从不在意斐波那契的写法；又好笑，又不耐烦，懒懒的答他道，“谁要你教，不就是`f(n)=f(n-1)+f(n-2)`？”孔乙己显出极高兴的样子，将两个指头的长指甲敲着柜台，点头说，“对呀对呀！……不过它有四样写法，你知道么？”我愈不耐烦了，努着嘴走远。孔乙己刚用指甲蘸了酒，想在柜上写出来，见我毫不热心，便又叹一口气，显出极惋惜的样子。


下面一一实现一下孔乙己口中的斐波那契数列四种实现方式：
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
console.log(`Primitive Mode,  n=${Num}, result is ${fb_primitive(Num)}, function call count:${fb_call_count}.`)
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
