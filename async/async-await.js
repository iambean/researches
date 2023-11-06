async function async1() {
    console.log('async1 start');// 2
    await async2();
    console.log('async1 end'); // 
}
async function async2() {
    console.log('async2'); //
}
console.log('script start'); // 1
setTimeout(function () {
    console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
    console.log('promise1'); // 3
    resolve();
}).then(function () {
    console.log('promise2'); //
});
console.log('script end'); // 4
















/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/