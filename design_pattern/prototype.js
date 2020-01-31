import { isObject } from "util"

function deepClone (obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }
    // 定义结果对象
    let copy = {}
    if (Array.isArray(obj)) {
        copy = []
    }

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 如果是自有属性，就进行递归调用深拷贝的方法
            copy[key] = deepClone(obj[key])
        }
    }
    return copy
}
