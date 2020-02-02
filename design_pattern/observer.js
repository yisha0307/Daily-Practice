// 发布者
class Publisher {
    constructor () {
        this.observers = []
        console.log('Publisher created')
    }
    add (observer) {
        this.observers = [...this.observers, observer]
    }
    remove (observer) {
        this.observers.forEach((item,i) => {
            if (item === observer) {
                this.observers.splice(i, 1)
            }
        })
    }
    // 通知订阅者
    notify () {
        this.observers.forEach(observer => {
            observer.update(this)
        })
    }
}
// 观察者
class Observer {
    constructor () {
        console.log('Observer created')
    }
    update () {
        console.log('Observer.update invoked')
    }
}

class PrdPublisher extends Publisher {
    constructor () {
        super()
        // 初始化需求文档
        this.prdState = null
        this.observers = []
    }
    getState () {
        return this.prdState
    }
    setState (state) {
        this.prdState = state
        this.notify()
    }
}

class DeveloperObserver extends Observer {
    constructor() {
        super()
        // 需求文档一开始还不存在
        this.prdState = {}
    }
    update(publisher) {
        this.prdState = publisher.getState()
        this.work()
    }
    work() {
        const prd = this.prdState
        console.log('start working...')
        // ...
    }
}

// 应用
const liLei = new DeveloperObserver()
const A = new DeveloperObserver()
const B = new DeveloperObserver()
const hanMeiMei = new PrdPublisher()

const prd = {doc: '123', url: '456'} // 具体的需求内容
// 拉群
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.add(B)
// 发送需求文档，并且@所有人
hanMeiMei.setState(prd)
