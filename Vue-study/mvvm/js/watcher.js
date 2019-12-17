class Watcher {
    constructor (vm, exp, cb) {
        this.cb = cb
        this.vm = vm
        this.exp = exp
        // 触发属性的getter, 从而在dep中添加自己
        this.value = this.get()
    }
    update () {
        // 属性变化收到通知
        this.run()
    }
    run () {
        // 结合compile进行更新
        var value = this.get()
        var oldVal = this.value
        if (value !== oldVal) {
            this.value = value
            // 执行compile中绑定的回调，更新视图
            this.cb.call(this.vm, value, oldVal)
        }
    }
    get (key) {
        Dep.target = this // 将订阅者指向自己
        this.value = this.vm[exp] // 触发getter, 添加到自己的属性里
        Dep.target = null // 添加完毕，重置
    }
}