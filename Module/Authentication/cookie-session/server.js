let express = require('express')
let RedisStore = require('connect-redis')(express.session)
let app = express()
let secret = 'wang9284239u409u12'
// 设置cookie
app.use(express.cookieParser(secret))
// 设置session
app.use(express.session({
    store: new RedisStore({
        host: '127.0.0.1',
        port: 6379,
        db: 'session_db'
    }),
    secret: secret
}))

app.get('/', function (req, res) {
    var session = req.session
    session.time = session.time || 0
    var n = session.time++
    res.send('hello, session id: ' + session.id + 'count: ' + n)
})

app.listen(9080)