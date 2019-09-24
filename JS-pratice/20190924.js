function convertCase (str) {
    if (typeof str !== 'string') {
        window.alert('请填写字符串')
    } else {
        return str.split('').map(s => {
            if (s.charAt() <= 90) {
                return s.toLowerCase()
            } else {
                return s.toUpperCase()
            }
        }).join('')
    }
}

function convertCase1 (str) {
    if (typeof str !== 'string') {
        window.alert('请填写字符串')
    } else {
        return str.split('').map(s => {
            const num = s.charAt()
            if (num < 65 || num >122 || num > 90 && num < 97) {return s;}
            if (code <=90) {
                return String.fromCharCode(code+32)
            } else {
                return String.fromCharCode(code - 32)
            }
        }).join('')
    }
}

// 第6天 写一个去除制表符和换行符的方法 （制表符 /t 换行符/n)
function emitSpace (str) {
    return str.replace(/\t|\n/g, '')
}