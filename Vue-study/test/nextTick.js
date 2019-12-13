let callback = []
let pending = false

function nextTick(cb) {
    callbacks.push(cb)
    if (!pending) {
        pending = true
        setTimeout(flushCallbacks, 0);
    }
}

function flushCallbacks () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i<copies.length; i++) {
        copies[i]()
    }
}

// 改写watcher
let uid = 0

class Watcher {
    constructor () {
        this.id = ++uid
    }
    update () {
        console.log('watch' + this.id + ' update')
        queueWatcher(this)
    }
    run () {
        console.log('watch' + this.id + '视图更新~')
    }
}

let has = {}
let queue = []
let waiting = false
function queueWatcher(watcher) {
    const id = watcher.id
    if (has[id] == null) {
        has[id] = true
        queue.push(watcher)

        if (!waiting) {
              // waiting 是一个标志位
            // flushScheduleQueue在下一个tick执行flushSchedulerQueue方法来flush队列queue
            // 执行它里面所有watcher的run方法
            waiting = true
            nextTick(flushSchedulerQueue)
        }
    }
}

function flushSchedulerQueue () {
    let watcher, id;
    for (index = 0; index < queue.length; index++) {
        watcher = queue[index]
        id = watcher.id
        has[id] = null
        watcher.run()
    }
    waiting = false
}