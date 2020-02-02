class EventEmitter {
    constructor () {
        // handlers是一个map, 用于存储事件与回调之间的对应关系
        this.handlers = {}
    }
    on(eventName, cb) {
        if (!this.handlers[eventName]) {
            // 如果没有，那么先初始化一个监听函数队列
            this.handlers[eventName] = []
        }
        this.handlers[eventName].push(cb)
    }
    // 触发目标事件
    emit(eventName, ...args) {
        if (this.handlers[eventName]) {
            this.handlers[eventName].forEach(cb => cb(...args))
        }
    }
    // 移除某个事件回调队列里的指定回调函数
    off(eventName, cb) {
        if (!cb) {
            this.handlers[eventName] = null
        }
        const callbacks = this.handlers[eventName]
        const index = callbacks.indexOf(cb)
        if (index !== -1) {
            callbacks.splice(index, 1)
        }
    }
    // 为事件注册单次监听器
    once(eventName, cb) {
        const wrapper = (...args) => {
            // 触发后移除该事件
            cb.apply(...args)
            this.off(eventName, cb)
        }
        this.on(eventName, wrapper)
    }
}