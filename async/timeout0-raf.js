
var counter = 0
var t0 = Date.now()
requestAnimationFrame(function foo(){
	var t = Date.now()
	console.log('delay:', t - t0)
	t0 = t;
    (counter++ < 1000) && requestAnimationFrame(foo)
})

var counter = 0
requestAnimationFrame(function foo(){
	if(counter++ < 100){
		requestAnimationFrame(foo)
	}
})


var counter = 0
var t0 = Date.now()
setTimeout(function foo() {
    var t = Date.now()
	console.log('delay:', t - t0)
	t0 = t;
    (counter++ < 1000 ) && setTimeout(foo, 0)
}, 0)

var counter = 0
setTimeout(function foo() {
    if(counter++ < 100){
		setTimeout(foo, 0)
	}
}, 0)