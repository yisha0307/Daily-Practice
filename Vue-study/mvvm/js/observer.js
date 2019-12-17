class Observer {
    constructor(data) {
        this.data = data
        this.walk(data)
    }
    walk (data) {
        Object.keys(data).forEach(d => {
            // 为每一个属性添加defineReactive, 即定义订阅者
            this.defineReactive(data, d, data[d])
        })
    }
    defineReactive(data, key, val) {
        var dep = new Dep()
        var childObj = observe(val)
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function () {
                
            }
        })
    }
}
function observe(data){
    if (!data || typeof data !== 'object') {
        return
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
}

function defineReactive(data, key, val) {
    // 为data的每一个属性都定义订阅者
    var dep = new Dep()
    // 监听子属性
    observe(val)
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false,  // 不能再define
        get: function () {
            Dep.target && dep.addSub(Dep.target)
            return val
        },
        set: function (newVal) {
            console.log('有变化', val, '--->', newVal)
            val = newVal
            // 数据有变化就通知订阅者，再调用调阅者的update
            dep.notify()
        }
    })
}

class Dep {
    constructor () {
        // Array<Watcher>
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify(){
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}