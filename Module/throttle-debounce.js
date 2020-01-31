// 节流：只认第一个
// 节流和防抖都是用闭包实现的

function throttle (fn, interval) {
    const last = 0
    return function () {
        let context = this
        let args = arguments
        let now = new Date()

        if (now - last >= interval) {
            // 如果时间间隔大于设定的时间间隔阈值，则执行回调
            last = now
            fn.apply(context, args)
        }
    }
}

const better_scroll = throttle(() => {console.log('triggle throttle')}, 1000)
document.addEventListener('scroll', better_scroll)

// 防抖：只认最后一个
function debounce (fn, interval) {
    let timer = null
    return function () {
        const context = this
        const args = arguments
        // 每次触发的时候清除之前的旧定时器
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, interval)
    }
}
const better_scroll2 = debounce(() => console.log('triggle debounce'), 1000)
document.addEventListener('scroll', better_scroll2)

// 用throttle来优化debounce
function throttleDebounce (fn, interval) {
    let last = 0, timer = null
    return function () {
        const context = this
        const args = arguments

        let now = +new Date()

        if (now - last < interval) {
            // 如果时间间隔小于我们设定的时间间隔，则为这次触发设定一个新的定时器
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, interval);
        } else {
            // 如果时间间隔超过了我们设定的时间间隔阈值，就不等了，如论如何给用户一个反馈
            last = now
            fn.apply(context, args)
        }
    }
}
const better_scroll3 = throttleDebounce(() => {console.log('triggle throttle-debounce')}, 1000)
document.addEventListener('scroll', better_scroll3)