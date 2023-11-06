
const DELAY = 200

const fn = function(duration){
    let now = Date.now()
    // let timerName = 'fn-' + duration + '-ms'
    // console.time(timerName)
    while(Date.now() - now < duration){
        ;
    }
    // console.timeEnd(timerName)
}

const Entries = {

    timeout (duration) {
        let tag = 'Timeout-' + duration + '-ms'
        setTimeout(function foo(){
            console.time(tag)
            fn(duration)
            setTimeout(() => {
                console.timeEnd(tag)
                foo()
            }, DELAY)
        }, DELAY)
    },

    interval (duration) {
        // setInterval(fn.bind(null, duration), DELAY)

        let t0 = Date.now()
        setInterval(() => {
            let t = Date.now()
            console.log(`Interval-${duration}-ms: ${t-t0}ms`, (() => {
                let d = new Date()
                return d.toLocaleTimeString() + '-' + d.getMilliseconds()
            })())
            t0 = t
            fn(duration)
            
        }, DELAY)
    }
}

// run on command, e.g: `$ node timeout-interval.js timeout 100`
let params = process.argv.slice(2)
let entry = params[0]
let duration = params[1]
// console.log(entry, duration)

Entries[entry](duration)
