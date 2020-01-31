// 单例模式：
// 不管我们尝试去创建多少次，都只返回第一次所创建的那唯一的一个实例
// 单例的应用: 比如vuex的store, 让我们可以保证每个应用将仅仅包含一个store实例
class SingleDog {
    show () {
        console.log('我是一个单例对象')
    }
    static getInstance () {
        // 判断是不是已经new过一个实例
        if (!SingleDog.instance) {
            // 如果没有就创建它
            SingleDog.instance = new SingleDog()
        }
        return SingleDog.instance
    }
}
const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()

s1 === s2 // true

// 用闭包实现
SingleDog.getInstance = (function () {
    let instance = null
    return function () {
        if (!instance) {
            instance = new SingleDog()
        }
        return instance
    }
})()

// 用单例写storage （class）
class Storage {
    static getInstance () {
        if (!Storage.instance) {
            Storage.instance = new Storage()
        }
        return Storage.instance
    }
    getItem (key) {
        return localStorage.getItem(key)
    }
    setItem (key, value) {
        return localStorage.setItem(key, value)
    }
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()

storage1 === storage2

// 用闭包写storage
// 先实现一个基础的storageBase类，把getItem和setItem放在它的原型链上
function StorageBase () {}
StorageBase.prototype.getItem = function (key) {
    return localStorage.getItem(key)
}
StorageBase.prototype.setItem = function (key, value) {
    return localStorage.setItem(key, value)
}
// 用闭包实现静态方法
const Storage2 = (function () {
    let instance = null
    return function () {
        if (!instance) {
            instance = new StorageBase()
        }
        return instance
    }
})()

// 实现一个modal
const Modal = (function () {
    let modal = null
    return function () {
        if (!modal) {
            modal = document.createElement('div')
            modal.innerHTML = '我是一个全局唯一的Modal'
            modal.id = 'modal'
            modal.style.display = 'none'
            document.body.appendChild(modal)
        }
        return modal
    }
})()