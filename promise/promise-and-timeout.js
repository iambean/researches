

console.log([] == false); // true. Why ?


setTimeout( ()=> {
    console.log(4)
},0)
new Promise( resolve=> {
    console.log(1)
    let i = 0
    while(i++ < 1e4){

    }
    resolve()
    console.log(2)
}).then(() => {
    console.log(5)
})
console.log(3)