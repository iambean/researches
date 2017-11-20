>超越全人类的前端界无敌牛人John.Resig (jQuery作者本尊)的个人博客里面有一篇写于6年前的文章，叫[《How JavaScript Timers Work》](http://ejohn.org/blog/how-javascript-timers-work/)， 这篇文章我个人觉得是讲解JavaScript解释器工作原理的教科书。javascript的线程机制的重要性对于一名职业jser来说不用多提，不了解这点可以说绝对不是一名合格的jser，并且这些基础知识并不随着各种先进技术的涌现而被遗弃，反而历久弥新。 

>如果你e文够好，并且有一定基础的话，建议不要继续往下读，直接去J.R的原文中去，[传送门再放一个](http://ejohn.org/blog/how-javascript-timers-work/)；而如果你跟我一样高中作文都是抄阅读理解的话，那么不妨看下去，以下都是我的个人理解，用尽可能通俗的语言来解读该文，不当之处且骂且指正。

> 原文中核心就是下面这幅图，一图胜千言，理解了这幅图基本也就理解了js的解释器执行原理。

> 首先简单的说下基础知识：**js是单线程的**（嗯，不仅地球人，连火星人都知道了），其实这句话更准确的说应该是指js的解释器（js引擎，如V8/SpiderMonkey等）是单线程工作的，它不能在处理一个click event 的callback的同时去处理一个ajax的callback，而必须按照先来后到的队列顺序执行。

![javascript times work](https://johnresig.com/files/Timers.png "javascript times work")

**解读：**
+ 解释器穿越到某个时刻（暂且标记为0时刻，也就是左边纵轴方向的起点位置）， 接到了一个任务要去执行一个javascript代码段【第一个标记为“JavaScript”的蓝色块】（比如引入的外链script file），这一大包代码看上去需要占用18ms的时间，此时解释器的等待队列【下称队列】为空， 意味着可以立即开始执行这个18ms的任务，嗯， Let's run.
+ 3ms时刻，蓝色的JavaScript区块代码在执行中，此时出现了一个延时10ms的`setTimeout`，但是它只是告诉解释器，要从现在开始算起的10ms后来执行，但是真正是不是10ms后就执行它并不一定，而是取决于10ms后解释器是否在等待状态（空闲），而如果解释器在10ms后还处于工作状态（队列并不空）那么它就还得等，需要注意的是，此时它并未加入到队列，队列依然为空。
+ 7ms时刻，蓝色的一坨JavaScript正在执行中，用户触发了一个鼠标的点击动作需要执行一个click的回调，跟上面的`setTimeout`不一样的是，它是立即加入到队列中的。 此时队列有一个任务，即mouse click callback。
+ 10ms时刻，还是那一坨18ms的蓝翔任务在进行中，，此时代码中触发了一个10ms的`setInterval`，跟`setTimeout`一样，它并不立即加入到队列中。此时队列中还是只有mouse click callback。
+ 13ms时刻，蓝翔还在执行中。前面标记的10ms延时的timeout触发了，而此时解释器非空闲，于是它加到了队列中。 此时队列中有mouse click callback 和timeout。 这个timeout虽然当时在3ms时指定要在10ms后执行，但是由于解释器非空闲只能继续排队等待。
+ 18ms时刻，蓝翔执行完了，解释器也要从队列中按照排队顺序取出任务来执行了，于是取出了click callback来执行，此时队列中只有timeout.
+ 20ms时刻，也即click callback 执行了2ms，前面定义的10ms的interval触发了，由于此时解释器正忙，它只能加到等待队列中，此时等待的有 timeout 和这个新加入的interval。
+ 29ms时刻， 这个mouse click callback执行完了（总共执行了11ms），释放了解释器，换下一个任务，也即timeout来执行，队列中有一个intetval在等待。
+ 30ms时刻，timer在执行中，轮询的interval又唤起了一个任务，这里有个特别的处理，等待队列中只允许有一个同一个序列的interval（来源自同一个interval id的任务），此时发现队列中已经有一个任务在等待，于是这个唤起的interval被丢弃了。此时等待队列中只有一个interval。
+ 36ms时刻，timer执行完了，队列中只有一个interval在等待，取出来执行，队列清空了。
+ 40ms时刻，interval在执行中，又有一个interval被唤起，而队列中还是空的，于是加入到队列中。
+ 41ms时刻，interval执行完了，取出队列中等待的那个interval继续执行，队列再次被清空。
+ 46ms时刻，interval执行完了，此时队列中为空，因此解释器第一次处于空闲状态。
+ 50ms时刻，interval被唤醒，由于解释器处于空闲状态，直接执行而不用加入到等待队列。
+ ……


>以上是一个典型的js引擎的工作原理，我们日常代码开发中，几乎完全离不开这些。
那么问题来了，下面两段代码有什么不同？

```javascript
var fn = function(){/*some code*/};

// 1:
setTimeout(function(){
  fn();
  setTimeout(arguments.callee, 200);
}, 200);

// 2:
setInterval(fn, 200);
```