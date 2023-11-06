//1.
setTimeout(() => console.log(1), 100);
//2.
process.nextTick(() => console.log(2));
//3.
setImmediate(() => console.log(3));
//4.
setTimeout(() => {
  for (let i=0; i<10000000; i++) {
    ;
  }
  console.log(4)
}, 99.99)