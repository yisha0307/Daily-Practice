// day8 写一个加密字符串的方法
function encode (str) {
    return btoa(encodeURIComponent(str))
}

function decode (str) {
    return decodeURIComponent(atob(str))
}

function strEncode(str) {
    return str.split('').map(s => {
        return String.fromCharCode(s.charCodeAt() + 1)
    }).join("")
}