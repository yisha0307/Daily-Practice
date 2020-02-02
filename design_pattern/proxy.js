// 普通信息
const basicInfo = ['age', 'career']
// 私密信息
const privateInfo = ['avatar', 'phone']
// 用户实例
const user = {
    ...info,
    isValidated: true,
    isVIP: false
}
// 代理器
const JuejinLovers = new Proxy(girl, {
    // getter层面的拦截
    get: function(girl, key) {
        if (!basicInfo.includes(key) && !user.isValidated) {
            alert('您还没有完成验证~')
            return
        }
        // 只有验证过的用户才能购买VIP
        if (user.isValidated && privateInfo.includes(key) && !user.isVIP) {
            alert('只有VIP才能查看该信息~')
            return
        }
    },
    // set层面的拦截
    set: function (girl, key, val) {
    // 最近一次送来的礼物会尝试赋值给lastPresent字段
        if (key === 'lastPresent') {
            if (val.value < girl.bottomValue) {
                alert('抱歉，您的礼物被拒收了~')
                return
            }
            girl.lastPresent = val
            girl.presents = [...presents, val]
        }
    }
})

// 图片预加载(虚拟代理)
class PreLoadImage {
    constructor (imgNode) {
        // 获取实例的对应的DOM节点
        this.imgNode = imgNode
    }
    setSrc (imgUrl) {
        this.imgNode.src = imgUrl
    }
}
class ProxyImage {
    static LOADING_URL = 'XXXXXX'
    constructor(targetImage) {
        this.targetImage = targetImage
    }
    // 用于设置真实的图片地址
    setSrc(targetUrl) {
        // img节点初始化时展示的是一个占位图
        this.targetImage.setSrc(ProxyImage.LOADING_URL)
        // 创建一个帮我们加载图片的Image实例
        const image = new Image()
        // 监听目标图片的加载情况，完成时将DOM上的img节点的src设成目标图片的url
        image.onload = () => {
            this.targetUrl.setSrc(targetUrl)
        }
        // 设置src属性，虚拟IMAGE实例开始加载图片
        image.src = targetUrl
    }
}

// 缓存代理
const allAll = function () {
    console.log('进行一次新计算')
    let result = 0
    const len = arguments.length
    for (let i = 0; i< len; i++) {
        result += arguments[i]
    }
    return result
}
// 为求和方法创建代理
const proxyAddAll = (function () {
    const resultCache = {}
    return function () {
        const args = Array.prototype.join.call(arguments, ',')
        return resultCache.hasOwnProperty(args) ? resultCache[args] : resultCache[args] = addAll(...arguments)
    }
})()