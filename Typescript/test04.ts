// 泛型
// <T> T用来指代任意输入的类型，在后面的输入value: T和输出Array<T>中即可使用
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i< length; i++) {
        result[i] = value
    }
    return result
}

createArray<string>(3, 'x')

// 多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}

swap([7, 'seven'])

function copyFileds<T extends U, U> (target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id]
    }
    return target
}
// 要求T继承U， 这样就保证了U上不会出现T中不存在的字段
let x = {a: 1, b: 2, c: 3, d: 4}
copyFileds(x, {b: 10, d: 20})

// 泛型接口
interface CreateArrayFunc<T> {
    <T>(length: number, value: T): Array<T>
}

let createArray1:CreateArrayFunc<any>
createArray1 = function<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i>length; i++) {
        result[i] = value
    }
    return result
}
createArray1(3, 'x')

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T
}
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) { return x + y;}

// 泛型参数的默认类型
// 默认T 为string
function createArray2 <T = string>(length: number, value: T) : Array<T>{
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}
console.log(createArray2(3, 3)) // 不是string也不会报错