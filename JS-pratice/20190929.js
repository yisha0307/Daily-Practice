// 第15天 写一个数组去重的方法
const noRepeat = arr => {
    return [...new Set(arr)]
}

const noRepeat2 = arr => {
    return arr.reduce((re, i) => {
        if (re.indexOf(i) === -1) {
            return re = [...re, i]
        } else {
            return re
        }
    }, [])
}
// 多维数组
const flatArray = arr => {
    return [...new Set(arr.reduce((re, i) => {
        if(Array.isArray(i)) {
            return re.concat(...flatArray(arr))
        } else {
            return re.concat(i)
        }
    }, []))]
}

// 去重
const distinct = arr => {
    return arr.filter((a, index) => arr.indexOf(a) === index)
}