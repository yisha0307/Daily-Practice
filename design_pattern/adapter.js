// 适配器函数
async function AjaxAdapter(type, url, data, success, failed) {
    const type = type.toUpperCase()
    let result
    try {
        if (type === 'GET') {
            result = await HttpUtils.get(url) || {}
        } else if (type === 'POST') {
            result = await HttpUtils.post(url, data) || {}
        }
        result.statusCode === 1 && success ? success(result) : failed(result)
    } catch (error) {
        if (failed) {
            failed(error.statusCode)
        }
    }
}

// 用适配器适配旧的ajax方法
async function Ajax(type, url, data, success, failed) {
    await AjaxAdapter(type, url, data, success, failed)
}
