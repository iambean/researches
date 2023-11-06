

function fn(i){
    return Promise.resolve().then(()=>{
        console.log('outer resolved.')
        if(i){
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log(123)
                    resolve()
                }, 1000)
            })
        }
    })
}

fn(1)