let express = require('express')
const app = express()
let whiteList = ['http://localhost:3000'] // 设置白名单

app.use(function (req, res, next) {
    let origin = req.headers.origin
    if (whiteList.includes(origin)) {
        // 设置哪个源可以访问
        res.setHeader('Access-Control-Allow-Origin', origin)
        // 允许携带哪个头访问我
        res.setHeader('Access-Control-Allow-Headers', 'name')
        res.setHeader('Access-Control-Allow-Methods', 'PUT')
        // 允许携带cookie
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Max-Age', 6)
        // 允许返回的头
        res.setHeader('Access-Control-Expose-Headers', 'name')
        if (req.method === 'OPTIONS') {
            res.send() // OPTIONS请求不做任何处理
        }
    }
    next()
})
app.put('/getData', function (req, res) {
    console.log(req.headers)
    res.setHeader('name', 'jw') // 返回一个响应头，后台需设置
    res.end("HAHAHAH")
})
app.get('/getData', function (req, res) {
    console.log(req.headers)
    res.end('LALALA')
})

app.use(express.static(__dirname))
app.listen(4000)