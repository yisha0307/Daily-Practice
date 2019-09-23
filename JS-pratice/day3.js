const delLast = (str, pattern) => {
    const ind = str.lastIndexOf(pattern)
    let arr = str.split('')
    arr.splice(ind, pattern.length)
    return arr.join('')
    // str.substring(0, ind) + str.substring(ind + pattern.length)
}