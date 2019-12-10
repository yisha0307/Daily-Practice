// 订阅者dep
class Dep {
    constructor() {
        this.subs = []
    }
    addSub (sub) {
        this.subs.push(sub)
    }
    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

class Watcher {
    constructor () {
        Dep.target = this
    }
    update () {
        console.log('this view has been updated')
    }
}

Dep.target = null

function defineReactive (obj, key, val) {
    // 一个Dep类对象
    const dep = new Dep()   
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        // get的时候收集到dep类中去
        get: function reactiveGetter () {
            dep.addSub(Dep.target)
            return val
        },
        // set触发所有watcher对象进行更新
        set: function reactiveSetter (newVal) {
            if (newVal == val) return
            dep.notify()
        }
    })
}

function observer (value) {
    if (!value || typeof value !== 'object') return
    Object.keys(value).forEach(key => {
        defineReactive(value, key, value[key])
    })
}

class Vue {
    constructor(options){
        this._data = options._data
        observer(this._data)
        new Watcher()
        
    }
}