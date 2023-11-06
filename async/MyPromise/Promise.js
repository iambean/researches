
/**
 * 遵循Promise/A+实现一个自定义的Promise
 * @constructor
 * @param {function} fn - resolve和reject的包裹函数
 */
class MyPromise {
    constructor (fn) {
        /**
         * @title 状态值
         * @desc pending（待定） | fulfilled（已执行） | rejected（已拒绝）
         * @type {String}
         */
        this.__status = 'pending'

        // 结束状态（完成或者失败）都需要做一些清理工作
        let resolve = data => {
            this.__status = 'fulfilled'
            if(typeof this.__success === 'function'){
                this.__success.call(this, data)
                this.__success = null
            }else{
                throw new Error('正常返回，但是缺少then毁回调函数')
            }
        }

        let reject = err => {
            this.__status = 'rejected'
            if(typeof this.__failure === 'function'){
                this.__failure.call(this, err)
                this.__failure = null
            }else{
                throw new Error('出错了，但是缺少catch捕获函数')
            }
        }

        fn.call(null, resolve, reject)
    }

    /**
     * @name 成功回调 
     */
    __success () {

    }

    /**
     * @name 失败回调
     */
    __failure () {

    }

    /**
     * @name 注册正常回调钩子
     * @param {function} successCallback 
     * @param {function} errorCallback 
     */
    then (successCallback, errorCallback) {
        this.__success = successCallback
        if(typeof errorCallback === 'function'){
            this.__failure = errorCallback
        }
        return this
    }

    /**
     * @name 注册错误处理钩子
     * @param {function} errorCallback 
     */
    catch (errorCallback) {
        this.__failure = errorCallback
        return this
    }
}

MyPromise.race = (...ps) => {
    return new MyPromise((resolve, reject) => {
        let resolved = false
        ps.forEach( p => {
            p.then()
        })
    })
}

MyPromise.all = (...ps) => {
    // ps.forEach()
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