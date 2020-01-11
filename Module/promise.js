function Promise (fn) {
    let state = 'pending'
    let value = null
    const callbacks = []
    this.then = function (onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {
            handle({
                onFulfilled,
                onRejected,
                resolve,
                reject
            })
        })
    }
    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback)
            return
        }
        const cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
        const next = state === 'fulfilled' ? callback.resolve : callback.reject

        if (!cb) {
            next(value)
            return
        }
        const ret = cb(value)
        next(ret)
    }
    function resolve(newValue) {
        const fn = () => {
            // resolve会把state从pending改掉
            if (state!=='pending') return
            if (newValue && (typeof newValue === 'object' || typeof newValue==='function')) {
                const {then} = newValue
                if (typeof then === 'function') {
                    then.call(newValue, resolve, reject)
                    return
                }
            }
            state = 'fulfilled'
            value = newValue
            handleCb()
        }
        setTimeout(fn, 0)
    }
    function reject(error) {
        const fn = () => {
            if (state !== 'pending') return
            if (error && (typeof error === 'object' || typeof error === 'function')) {
                const {then} = error
                if (typeof then === 'function') {
                    then.call(error, resolve, reject)
                    return
                }
            }
            state = 'rejected'
            value = error
            handleCb()
        }
        setTimeout(fn, 0);
    }
    function handleCb () {
        while(callbacks.length) {
            const fulfilledFn = callbacks.shift()
            handle(fulfilledFn)
        }
    }
    fn(resolve, reject)
}
