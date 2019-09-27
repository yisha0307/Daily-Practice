// 第12天 写一个获取当前url查询字符串中的参数的方法
const getString = (key) => {
    let params = {}
    const url = window.location.search
    if (!url) {return ''}
    params = url.substr(1).split('&').reduce((re, q) => {
        const [k, v] = q.split('=') || []
        re[k] = v
        return re
    }, {})
    return params[key] || ''
}