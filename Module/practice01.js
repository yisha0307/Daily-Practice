// 模拟Array.prototype.map
const selfMap = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    let mappedArr = Array()
    for (let i, len = arr.length; i<len; i++) {
        if (!arr.hasOwnProperty(i)) {continue}
        mappedArr[i] = fn.call(context, arr[i], i, this)
    }
    return mappedArr
}
Array.prototype.selfMap = selfMap

// 使用reduce实现map
const selfMap2 = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((re, item, index) => {
        return [...re, fn.call(context, item, index, this)]
    }, [])
}

// 循环实现数组 filter 方法
const selfFilter = function (fn, context) {
    const arr = Array.prototype.slice.call(this)
    let filteredArr = Array()
    for (let i = 0, len = arr.length; i < len; i++) {
        fn.call(context, arr[i], i, this) && filteredArr.push(arr[i])
    }
    return filteredArr
}

// reduce实现filter
const selfFilter2 = function (fn, context) {
    return this.reduce((re, item, index) => {
        return fn.call(context, item, index) ? [...re, item] : re
    }, [])
}

// 循环实现数组的 reduce 方法
// reduce的function 传入的参数：pre/cur/index
const myReduce = function (fn, initialValue) {
    const arr = Array.prototype.slice.call(this)
    let result = initialValue
    let startIndex = 0
    // 处理一下initialValue没有值的情况
    if (initialValue === undefined) {
        // 找到第一个非空的值
        for (let j =0, l = arr.length; j < l; j++) {
            if (!arr.hasOwnProperty(j)) continue
            startIndex = j
            result = arr[j]
            break
        }
    }
    for (let i = startIndex, len = arr.length; i<len; i++) {
        result = fn.call(null, result, arr[i], i, this)
    }
    return result
}
Array.prototype.myReduce = myReduce

// 递归实现现flat
const myFlat = function (arr) {
    return arr.reduce((result, item) => {
        if (Array.isArray(item)) {
            return [...result, ...myFlat.call(null, item)]
        } else {
            return [...result, item]
        }
    }, [])
}

// 函数curry化
// function.length: 形参个数
const curry = function (fn) {
    // 形参个数小于等于1： 没必要curry
    if (fn.length <= 1) return fn
    const generator = (...args) => {
        if (args.length >= fn.length) {
            // curry递归出口
            return fn(...args)
        } else {
            return (...args2) => {
                return generator(...args, ...args2)
            }
        }
    }
    return generator
}

// 斐波那契数列
const fibonacci = n => {
    if (n <1) {throw new Error('参数有误')}
    if (n === 1 || n === 2) {
        return 1
    }
    return fibonacci(n-1) + fibonacci(n-2)
}
const memory = function (fn) {
    // 用闭包做一个cache
    let obj = {}
    return function (n) {
        return obj[n] ? obj[n] : obj[n] = fn(n)
    }
}

// 递归平铺数组
function flattenArray (arr) {
    const flattened = [].concat(...arr)
    return flattened.some(item => Array.isArray(item)) ? flattenArray(flattened) : flattened
}

function myFlat(arr){
    return arr.reduce((re,i) => {
        if (Array.isArray(i)) {
            return [...re, ...myFlat.call(null, i)]
        } else {
            return [...re, i]
        }
    }, [])
}