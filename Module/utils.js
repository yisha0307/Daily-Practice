// 判断对象的数据类型
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
// 使用:
// const isArray = isType('Array')
// console.log(isArray([]))

// Throttle: 节流
// 在某段时间内，不管你触发了多少次回调，都只认第一次，并在计时结束时给予响应
function throttle (fn, interval) {
    let last = 0
    return function () {
        let context = this
        let args = arguments
        let now = +new Date()

        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last >= interval) {
            // 执行回调
            last = now
            fn.apply(context, args)
        }
    }
}


// debounce: 防抖
// 在某段时间内，不管你触发了多少次回调，我都只认最后一次。
function debounce (fn, delay) {
    let timer = null
    return function () {
        let context = this
        let args = arguments
        // 去除旧的定时器
        if (timer) {
            clearTimeout(timer)
        }
        // 设立新的定时器
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay);
    }
}

// throttle和debounce结合:
// delay 时间内，我可以为你重新生成定时器；但只要delay的时间到了，我必须要给用户一个响应
function throttleDebounce (fn, delay) {
    // last是上次触发回调的时间，timer是定时器
    let last = 0, timer = null;
    return function () {
        let context = this
        let args = arguments
        let now = +new Date()
        
        if (now - last < delay) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                last = now
                fn.apply(context, args)
            }, delay);
        } else {
            // 触发回调
            last = now
            fn.apply(context, args)
        }
    }
}

// 浅拷贝
function cloneShallow (source) {
    var target = {}
    // for...in遍历一个对象自有的、继承的、可枚举的、非symbol的属性
    for (let i in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            // Object.prototype.hasOwnProperty: 自有的而非继承到的属性
            target[key] = source[key]
        }
    }
    return target
}

// 深拷贝
function isObject (obj) {
    return Object.prototype.toString(obj) === `[object Object]`
}

function cloneDeep (source) {
    if (!isObject(source)) return source
    let target = Array.isArray(source) ? [] : {}
    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                // 用一个递归实现深拷贝
                target[key] = cloneDeep(source[key])
            } else {
                target[key] = source[key]
            }
        }
    }
    return target
}

