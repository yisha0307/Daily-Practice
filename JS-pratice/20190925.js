// 第7天 统计某一字符或字符串在另一个字符串中出现的次数

const repearNum = (str, target) => {
    return str.split(target).length - 1 
}

const repeatNum = (str, target) => {
    let num = 0;
    let position = 0;
    const checkExisted = (str, target, p) => {
        const index = str.indexOf(target, p)
        if (index === -1) {
            return
        } else {
            num ++;
            position = index + 1
            checkExisted(str, target, position)
        }
    }
    checkExisted(str, target, position)
    return num
}