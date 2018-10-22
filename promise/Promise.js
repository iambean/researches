
/**
 * 实现一个Promise方法
 * @constructor
 * @param {function} fn - resolve和reject的包裹函数
 */
class MyPromise {
    constructor (fn) {
        //状态值: pending（待定） | resolved（已执行） | rejected（已拒绝）
        this._status = 'pending'

        //正常结果值
        this._value = null

        //异常错误值
        this._error = null

        // 结束状态（完成或者失败）都需要做一些清理工作
        let resolve = data => {
            // debugger
            this._value = data
            this._status = 'resolved'
        }

        let reject = err => {
            this._error = err
            this._status = 'rejected'
        }

        fn.call(null, resolve, reject)
    }

    /**
     * 注册正常回调钩子。
     * TODO:特别要注意的是，then返回的不是自身，而是一个全新的Promise对象。!!!，catch同理。
     * @param {function} successCallback 
     * @param {function} errorCallback 
     */
    then (successCallback, errorCallback) {
        switch(this._status){
            // promise在pending时遇到then,return一个同样是pending状态的promise，状态变化跟源状态保持一致。
            case 'pending':
                return new MyPromise((resolve, reject) => {
                    this.__defineSetter__('_status', newStatus => {
                        // debugger
                        if(newStatus === 'resolved'){
                            let val = successCallback(this._value)
                            resolve(val)
                        }else if(newStatus === 'rejected'){
                            if(typeof errorCallback === 'function'){
                                let err = successCallback(this._error)
                                reject(err)
                            }
                        }
                    })
                })
            // 已经resolved时直接执行success，并返回一个新的resolved的Promise, success的返回值作为这个新promise的值
            case 'resolved':
                let result = successCallback(this._value)
                return MyPromise.resolve(result)
            case 'rejected':
                if(typeof errorCallback === 'function'){
                    let err = errorCallback(this._error)
                    return MyPromise.reject(err)
                }
                break;
            default: break
        }
        return undefined
    }

    /**
     * @name 注册错误处理钩子
     * @param {function} errorCallback 
     */
    catch (errorCallback) {
        if(this._status === 'pending'){
            return new MyPromise((resolve, reject) => {
                this.__defineSetter__('_status', newStatus => {
                    if(newStatus === 'rejected'){
                        let err = successCallback(this._error)
                        reject(err)
                    }
                })
            })
        }else if(this._status === 'rejected'){
            let err = errorCallback(this._error)
            return MyPromise.reject(err)
        }
        return undefined
    }
}

//返回最先成功的那一个
MyPromise.race = (...ps) => {
    return new MyPromise((resolve, reject) => {
        ps.forEach( p => {
            p.then(d => {
                // 只要其中一个回来时，整体还处于pending，就立即resolve，其他不管。
                if(this._status === 'pending'){
                    resolve(d)
                }
            })
            .catch(e => {
                reject(e)
            })
        })
    })
}

//所有promise并行发出，类似于Array#every方法，只要有一个失败，就全部判定为失败；所有成功才算成功。
MyPromise.all = (...ps) => {
    return new MyPromise((resolve, reject) => {
        let allResolved = false
        let data = []
        for(let index = 0, len = ps.length; index < len; index++){
            let p = ps[index]
            p.then(d => {
                data[index] = d
                // 判断是否ps所有都已经走了then回调，都走了之后就调用resolve
                allResolved = ps.every(p => { p._status !== 'pending' })
                if(allResolved){
                    resolve(data)
                }
            })
            .catch( e => {
                reject(e)
            })
        }
    })
}

MyPromise.resolve = data => {
    return new MyPromise( resolve => {
        resolve(data)
    })
}

MyPromise.reject = error => {
    return new MyPromise( (resolve, reject) => {
        reject(error)
    })
}

// module.exports = MyPromise
export { MyPromise }
