const jsonp = ({ url, params, callback }) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        window[callback] = data => {
            resolve(data)
            document.body.removeChild(script)
        }
        params = {...params, callback}
        let arr = Object.keys(params).map(key => `${key}=${params[key]}`)
        script.src = `${url}?${arr.join('&')}`
        document.body.appendChild(script)
    })
}

jsonp({
    url: 'http://localhost:3000/say',
    params: {wd: '520'},
    callback: 'show'
}).then(data => {
    // data就是jsonp返回的值
    console.log(data)
})