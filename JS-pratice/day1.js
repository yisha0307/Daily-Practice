// 这是一道大题目，把考点拆成了4个小项；需要侯选人用递归算法实现（限制15行代码以内实现；限制时间10分钟内完成）：
// a) 生成一个长度为5的空数组arr。
// b) 生成一个（2－32）之间的随机整数rand。
// c) 把随机数rand插入到数组arr内，如果数组arr内已存在与rand相同的数字，则重新生成随机数rand并插入到arr内[需要使用递归实现，不能使用for/while等循环]
// d) 最终输出一个长度为5，且内容不重复的数组arr。

const arr = new Array(5)
const rand = randomNum()
let i = 0;

const randomArr = (arr, num) => {
    if (arr.indexOf(num) < 0) {
        arr[i] = num;
        i++
    } else {
        num = randomNum()
    }
    if (i >= arr.length) {
        console.log(arr)
        return
    } else {
        randomArr(arr, num)
    }
}
randomArr(arr, rand)

function randomNum() {
    return Math.floor(Math.random() * 30) + 2
}


