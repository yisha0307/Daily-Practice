// 装饰器模式
const Modal = (function () {
    let modal = null
    return function () {
        if (!modal) {
            modal = document.createElement('div')
            modal.innerHTML = '请登录'
            modal.id = 'modal'
            modal.style.display = 'none'
            document.body.appendChild(modal)
        }
        return modal
    }
})()
// 定义打开按钮
class OpenButton {
    // 点击后展示弹框（旧逻辑）
    onClick () {
        const modal = new Modal()
        modal.style.display = 'block'
    }
}

// 定义按钮对应的装饰器
class Decorator {
    // 将按钮实例传入
    constructor(open_button) {
        this.open_button = open_button
    }
    onClick() {
        this.open_button.onClick()
        // 包装了一层新逻辑
        this.changeButtonStatus()
    }
    changeButtonStatus () {
        this.changeButtonText()
        this.disableButton()
    }
    // 单一指责原则
    // 置灰
    disableButton () {
        const btn = document.getElementById('open')
        btn.setAttribute('disabled', true)
    }
    // 改变按钮文字
    changeButtonText () {
        const btn = document.getElementById('open')
        btn.innerText = '快去登录'
    }
}

// 装饰器的使用
// 把实例传给decorator, 后续decorator就可以进行逻辑的拓展
const openButton = new OpenButton()
const decorator = new Decorator(openButton)

// ES7 decorator
function classDecorator(target) {
    target.hasDecorator = true
    return target
}

@classDecorator
class Button {
    // Button的相关逻辑
}
console.log('Button 是否被装饰了：', Button.hasDecorator)

// descriptor相当于Object.defineProperty
function funcDecorator(target, name, descriptor) {
    let originalMethod = descriptor.value
    descriptor.value = function () {
        console.log('我是func的装饰器逻辑')
        return originalMethod.apply(this, arguments)
    }
    return descriptor
}

class Button {
    // 也可装饰类里的方法
    @funcDecorator
    onClick() {
        console.log('我是func的原有逻辑')
    }
}

const button = new Button()
button.onClick()