// 判断对象的数据类型
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
// 使用:
// const isArray = isType('Array')
// console.log(isArray([]))
