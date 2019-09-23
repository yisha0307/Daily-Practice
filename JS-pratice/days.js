// 写一个方法去掉字符串中的空格，要求传入不同的类型分别能去掉前、后、前后、中间的空格
const trimString = str => {
    let result = ''
    for(let i = 0; i<str.length; i++) {
        if (str[i] !== ' ') {
            result += str[i]
        }
    }
    return result
}
const trim = (str, flag) => {
    let result = ''
    switch (flag) {
        case 'left':
            result = str.replace(/^\s*/g, '')
            break;
        case 'right':
            result = str.replace(/\s*$/g, '')
            break;
        case 'ends':
            result = str.replace(/^\s*|\s*$/g, '')
            break;
        default: 
            result = str.replace(/\s+/g, '')
            break;
    } 
    return result
}
