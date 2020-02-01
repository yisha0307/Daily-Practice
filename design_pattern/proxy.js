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