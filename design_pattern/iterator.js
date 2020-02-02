// 数组的遍历器属性(Symbol.iterator)
const arr = [1, 2, 3]
const iterator = arr[Symbol.iterator]()

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: undefined, done: true }

// es6的迭代器
function *iteratorGenerator () {
    yield '1'
    yield '2'
    yield '3'
}
const iterator2 = iteratorGenerator()
iterator2.next() // { value: 1, done: false }
iterator2.next() // { value: 2, done: false }
iterator2.next() // { value: 3, done: false }
iterator2.next() // { value: undefined, done: true }

// 用es5实现一个迭代器
function iteratorGenerator (list) {
    // 用idx来记录当前访问的索引
    let idx = 0
    let len = list.length
    return {
        // 自定义next方法
        next: function () {
            return {
                value: list[idx++] || undefined,
                done: idx > len
            }
        }
    }
}
const iterator3 = iteratorGenerator([1,2,3])
iterator3.next() // { value: 1, done: false }
iterator3.next() // { value: 2, done: false }
iterator3.next() // { value: 3, done: false }
iterator3.next() // { value: undefined, done: true }
